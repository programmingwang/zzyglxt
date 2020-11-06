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
    int deleteFile(FileDOKey fileDOKey);
    List<FileDO> selectAllFile();
    List<FileDO> searchFile(String keyWord);
    List<FileDO> top5File();
    List<FileDO> selectFileByDataCode(String dataCode);
    FileDO selectFileByDataCodeAndType(String dataCode, String fileType);
    FileDO selectFileByDataCodeAndName(String dataCode, String fileName);
    int deleteFileByDataCode(String dataCode);
    int deleteFileByDataCodeAndType(String dataCode, String fileType);
}
