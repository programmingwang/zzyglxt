package com.zyyglxt.service;

import com.zyyglxt.dataobject.GovernresAdvice;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface IGovernresAdviceService {

    int deleteByPrimaryKey(@Param("itemid") Integer itemid, @Param("itemcode") String itemcode);

    int insertSelective(GovernresAdvice record);

    GovernresAdvice selectByPrimaryKey(@Param("itemid") Integer itemid, @Param("itemcode") String itemcode);

    int updateByPrimaryKeySelective(GovernresAdvice record);

    List<GovernresAdvice> selectAll();
}
