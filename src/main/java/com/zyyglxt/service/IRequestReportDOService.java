package com.zyyglxt.service;

import com.zyyglxt.dataobject.RequestReportDO;
import com.zyyglxt.dataobject.RequestReportDOKey;
import com.zyyglxt.dto.RequestReportDto;

import java.util.List;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/12/27 12:46
 */
public interface IRequestReportDOService {
    int insertSelective(RequestReportDO record);

    int deleteByPrimaryKey(RequestReportDOKey key);

    int updateByPrimaryKeySelective(RequestReportDO record);

    List<RequestReportDto> selectAllReport(String reportDataStatus);//查询所有请示报告数据

    int changeStatusToReport( RequestReportDOKey key ,  String reportDataStatus);//请示报告数据状态
}
