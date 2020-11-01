package com.zyyglxt.service.impl;

import com.zyyglxt.dao.FileDOMapper;
import com.zyyglxt.dataobject.FileDO;
import com.zyyglxt.dataobject.FileDOKey;
import com.zyyglxt.service.IFileService;

import javax.annotation.Resource;
import java.util.List;
import java.util.UUID;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/11/1 17:52
 */
public class FileServiceImpl implements IFileService {

    @Resource
    FileDOMapper fileDOMapper;

    @Override
    public int addFile(FileDO fileDO) {
        fileDO.setItemcode(UUID.randomUUID().toString());
        return fileDOMapper.insertSelective(fileDO);
    }

    @Override
    public int updateFile(FileDO fileDO) {
        return fileDOMapper.updateByPrimaryKeySelective(fileDO);
    }

    @Override
    public int deleteFile(FileDOKey fileDOKey) {
        return fileDOMapper.deleteByPrimaryKey(fileDOKey);
    }

    @Override
    public List<FileDO> selectAllFile() {
        return fileDOMapper.selectAllFile();
    }

    @Override
    public List<FileDO> searchFile(String keyWord) {
        return fileDOMapper.searchFile(keyWord);
    }

    @Override
    public List<FileDO> top5File() {
        return fileDOMapper.top5File();
    }

}
