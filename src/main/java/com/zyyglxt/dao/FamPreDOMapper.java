package com.zyyglxt.dao;

import com.zyyglxt.dataobject.ChineseCulturalDOKey;
import com.zyyglxt.dataobject.FamPreDO;
import com.zyyglxt.dataobject.FamPreDOKey;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Mapper
@Repository
public interface FamPreDOMapper {

    int deleteByPrimaryKey(@Param("key") FamPreDOKey key);

    int insert(FamPreDO record);

    int insertSelective(FamPreDO record);

    FamPreDO selectByPrimaryKey(FamPreDOKey key);

    int updateByPrimaryKeySelective(FamPreDO record);

    int updateByPrimaryKeyWithBLOBs(FamPreDO record);

    int updateByPrimaryKey(FamPreDO record);

    List<FamPreDO> selectAllFamPre(@Param("status") String status);//查询所有历史名方

    int changeStatusToFamPre(@Param("key") FamPreDOKey key , @Param("status") String status);//历史名方数据状态

    int updateVisitNumFamPre(FamPreDOKey key);

    List<FamPreDO> searchFamPre(String keyWord);
}