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

    FileDO selectFileByDataCode(String dataCode);

    int deleteByDataCode(String dataCode);

    List<FileDO> selectMultipleFileByDataCode(String dataCode);
}