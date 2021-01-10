package com.zyyglxt.dao;

import com.zyyglxt.dataobject.GovernresCountersign;
import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopExpertDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface GovernresCountersignMapper {
    int deleteByPrimaryKey(@Param("itemcode") String itemcode);

    int insertSelective(GovernresCountersign record);

    GovernresCountersign selectByPrimaryKey(@Param("itemcode") String itemcode);

    int updateByPrimaryKeySelective(GovernresCountersign record);

    List<GovernresCountersign> selectAll();
}