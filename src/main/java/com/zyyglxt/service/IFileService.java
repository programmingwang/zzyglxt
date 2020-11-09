package com.zyyglxt.service;

import com.zyyglxt.dataobject.FileDO;
import com.zyyglxt.dataobject.FileDOKey;
import java.util.List;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/11/1 17:51
 */
public interface IFileService {
    int addFile(FileDO fileDO);
    int updateFile(FileDO fileDO);
    int deleteFileByKey(FileDOKey fileDOKey);
    List<FileDO> selectAllFile();
    List<FileDO> searchFile(String keyWord);
    List<FileDO> top5File();
    FileDO selectFileByDataCode(String dataCode);
    int deleteFileByDataCode(String dataCode);
    void uploadFile(FileDO fileDO);
}
