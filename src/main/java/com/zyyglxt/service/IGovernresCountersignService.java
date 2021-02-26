package com.zyyglxt.service;

import com.zyyglxt.dataobject.GovernresCountersign;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;

import java.util.List;

public interface IGovernresCountersignService {
    int deleteByPrimaryKey(@Param("itemcode") String itemcode);

    int insertSelective(GovernresCountersign record);

    GovernresCountersign selectByPrimaryKey(@Param("itemcode") String itemcode);

    int updateByPrimaryKeySelective(GovernresCountersign record);

    List<GovernresCountersign> selectAll(String status);
}
