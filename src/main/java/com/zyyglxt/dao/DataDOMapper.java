package com.zyyglxt.dao;

import com.zyyglxt.dataobject.DataDO;
import com.zyyglxt.dataobject.DataDOKey;
import com.zyyglxt.dto.DataDto;
import org.apache.ibatis.annotations.Param;

import java.sql.Date;
import java.util.List;

public interface DataDOMapper {

    int deleteByPrimaryKey(DataDOKey key);


    int insert(DataDO record);

    //新增数据
    int insertSelective(DataDO record);

    //查询单个数据
    DataDO selectByPrimaryKey(@Param("key") DataDOKey key, @Param("dataStatus") String dataStatus);

    //查询相应数据类型的所有数据
    List<DataDto> selectByAllData(@Param("dataType") String dataType, @Param("dataStatus") String dataStatus);

    //查询所有新闻轮播图
    List<DataDto> getAllNewsRot(@Param("dataType") String dataType, @Param("dataStatus") String dataStatus);

    //更新数据
    int updateByPrimaryKeySelective(DataDO record);

    //更改数据状态
    int changeStatusByPrimaryKey(@Param("key") DataDOKey key, @Param("dataDelayedRelease") String dataDelayedRelease, @Param("dataStatus") String dataStatus);


    int updateByPrimaryKeyWithBLOBs(DataDO record);


    int updateByPrimaryKey(DataDO record);

    List<DataDO> selectAll();

}