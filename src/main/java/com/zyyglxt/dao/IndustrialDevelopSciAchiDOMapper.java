package com.zyyglxt.dao;

import com.zyyglxt.dataobject.IndustrialDevelopSciAchiDO;
import com.zyyglxt.dataobject.IndustrialDevelopSciAchiDOKey;
import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopSciAchiDODto;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface IndustrialDevelopSciAchiDOMapper {
    int deleteByPrimaryKey(IndustrialDevelopSciAchiDOKey key);

    int insert(IndustrialDevelopSciAchiDO record);

    int insertSelective(IndustrialDevelopSciAchiDO record);

    IndustrialDevelopSciAchiDO selectByPrimaryKey(IndustrialDevelopSciAchiDOKey key);

    int updateByPrimaryKeySelective(IndustrialDevelopSciAchiDO record);

    int updateByPrimaryKey(IndustrialDevelopSciAchiDO record);

    int updateVisitNumByItemidAndItemcode(IndustrialDevelopSciAchiDOKey record);

    List<IndustrialDevelopSciAchiDO> selectByPage(@Param("start") int start,@Param("end") int end);

    List<IndustrialDevelopSciAchiDODto> selectAll(@Param("orgCode") String orgCode);
}



