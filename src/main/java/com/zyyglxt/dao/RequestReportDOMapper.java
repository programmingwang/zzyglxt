package com.zyyglxt.dao;

import com.zyyglxt.dataobject.RequestReportDO;
import com.zyyglxt.dataobject.RequestReportDOKey;

public interface RequestReportDOMapper {
    int deleteByPrimaryKey(RequestReportDOKey key);

    int insert(RequestReportDO record);

    int insertSelective(RequestReportDO record);

    RequestReportDO selectByPrimaryKey(RequestReportDOKey key);

    int updateByPrimaryKeySelective(RequestReportDO record);

    int updateByPrimaryKeyWithBLOBs(RequestReportDO record);

    int updateByPrimaryKey(RequestReportDO record);
}