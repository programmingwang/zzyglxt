package com.zyyglxt.service.impl;

import com.zyyglxt.dao.DataDOMapper;
import com.zyyglxt.dataobject.DataDO;
import com.zyyglxt.dataobject.DataDOKey;
import com.zyyglxt.service.IDataDOService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

import java.util.Date;
import java.util.List;

/**
 * @Author huangtao
 * @Date 2020/10/29 10:18
 * @Version 1.0
 */
@Service
public class DataDOServiceImpl  implements IDataDOService{
    @Resource
    DataDOMapper dataDOMapper;

    @Override
    public DataDO selectByPrimaryKey(DataDOKey key) {
        return dataDOMapper.selectByPrimaryKey(key);
    }

    @Override
    public void insertSelective(DataDO record) {
        record.setItemcreateat(new Date());
        record.setItemupdateat(new Date());
        dataDOMapper.insertSelective(record);
    }

    @Override
    public void deleteByPrimaryKey(DataDOKey key) {
        dataDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    public void updateByPrimaryKeySelective(DataDO record) {
        record.setItemupdateat(new Date());
        dataDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public List<DataDO> selectAll() {
        return dataDOMapper.selectAll();
    }

    /**
     * 关键字搜索，包括标题、所属位置、作者、来源、政策法规类型、状态、数据类型
     * @param keyWord
     * @return
     */
    @Override
    public List<DataDO> searchDataDO(String keyWord) {
        return dataDOMapper.searchDataDO(keyWord);
    }

}
