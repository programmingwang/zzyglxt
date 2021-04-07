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
    FileDO selectFileByDataCode(String dataCode);
    int deleteFileByDataCode(String dataCode);
    int deleteFileByItemCode(String itemcode);
    FileDO getByItemCode(String itemCode);
    void uploadFile(FileDO fileDO);
    List<FileDO> selectMultipleFileByDataCode(String dataCode);
}
