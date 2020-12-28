package com.zyyglxt.dao;

import com.zyyglxt.dataobject.RequestReportDO;
import com.zyyglxt.dataobject.RequestReportDOKey;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface RequestReportDOMapper {
    int deleteByPrimaryKey(RequestReportDOKey key);

    int insert(RequestReportDO record);

    int insertSelective(RequestReportDO record);

    RequestReportDO selectByPrimaryKey(RequestReportDOKey key);

    int updateByPrimaryKeySelective(RequestReportDO record);

    int updateByPrimaryKeyWithBLOBs(RequestReportDO record);

    int updateByPrimaryKey(RequestReportDO record);


    List<RequestReportDO> selectAllReport(@Param("reportDataStatus") String reportDataStatus);//查询所有请示报告数据

    int changeStatusToReport(@Param("key") RequestReportDOKey key , @Param("reportDataStatus") String reportDataStatus);//请示报告数据状态

}