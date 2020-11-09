package com.zyyglxt.dao;

import com.zyyglxt.dataobject.FileDO;
import com.zyyglxt.dataobject.FileDOKey;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface FileDOMapper {

    int deleteByPrimaryKey(FileDOKey key);

    int insert(FileDO record);

    int insertSelective(FileDO record);

    FileDO selectByPrimaryKey(FileDOKey key);

    int updateByPrimaryKeySelective(FileDO record);

    int updateByPrimaryKey(FileDO record);

    List<FileDO> selectAllFile();

    List<FileDO> searchFile(String keyWord);

    List<FileDO> top5File();

    FileDO selectFileByDataCode(String dataCode);

    FileDO selectFileByDataCodeAndType(@Param("dataCode") String dataCode, @Param("fileType") String fileType);

    FileDO selectFileByDataCodeAndName(@Param("dataCode") String dataCode, @Param("fileName") String fileName);

    int deleteByDataCode(String dataCode);

    int deleteByDataCodeAndType(@Param("dataCode") String dataCode, @Param("fileType") String fileType);
}