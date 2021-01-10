package com.zyyglxt.dao;

import com.zyyglxt.dataobject.GovernresAdvice;
import com.zyyglxt.dataobject.GovernresCountersign;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface GovernresAdviceMapper {
    int deleteByPrimaryKey(@Param("itemid") Integer itemid, @Param("itemcode") String itemcode);

    int insertSelective(GovernresAdvice record);

    GovernresAdvice selectByPrimaryKey(@Param("itemid") Integer itemid, @Param("itemcode") String itemcode);

    int updateByPrimaryKeySelective(GovernresAdvice record);

    List<GovernresAdvice> selectAll();
}