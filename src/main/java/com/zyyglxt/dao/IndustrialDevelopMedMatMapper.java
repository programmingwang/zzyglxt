package com.zyyglxt.dao;

import com.zyyglxt.dataobject.IndustrialDevelopMedMat;
import com.zyyglxt.dto.StatusDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @Author lrt
 * @Date 2020/11/8 22:46
 * @Version 1.0
 **/
@Mapper
public interface IndustrialDevelopMedMatMapper {
    int deleteByPrimaryKey(@Param("itemid") Integer itemid, @Param("itemcode") String itemcode);

    int insert(IndustrialDevelopMedMat record);

    int insertSelective(IndustrialDevelopMedMat record);

    IndustrialDevelopMedMat selectByPrimaryKey(@Param("itemid") Integer itemid, @Param("itemcode") String itemcode);

    int updateByPrimaryKeySelective(IndustrialDevelopMedMat record);

    int updateByPrimaryKey(IndustrialDevelopMedMat record);

    List<IndustrialDevelopMedMat> selectMedMatByORGCode(String ORGCode);

    int updateStatusByPrimaryKey(StatusDto statusDto);
}