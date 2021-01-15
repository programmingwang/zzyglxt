package com.zyyglxt.dao;

import com.zyyglxt.dataobject.CulturalResourcesDO;
import com.zyyglxt.dataobject.CulturalResourcesDOKey;
import com.zyyglxt.dto.CulturalResourcesDto;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CulturalResourcesDOMapper {

    int deleteByPrimaryKey(CulturalResourcesDOKey key);

    int insert(CulturalResourcesDO record);

    int insertSelective(CulturalResourcesDO record);

    CulturalResourcesDO selectByPrimaryKey(@Param("key")CulturalResourcesDOKey key, @Param("chineseCulturalType") String chineseCulturalType);

    List<CulturalResourcesDto> selectCulturalResourcesList(@Param("type") String chineseCulturalType, @Param("status") String chineseCulturalStatus);

    int updateByPrimaryKeySelective(CulturalResourcesDO record);

    int changeStatusByPrimaryKeySelective(@Param("key") CulturalResourcesDOKey key, @Param("status") String chineseCulturalStatus);

    int updateByPrimaryKeyWithBLOBs(CulturalResourcesDO record);

    int updateByPrimaryKey(CulturalResourcesDO record);
}