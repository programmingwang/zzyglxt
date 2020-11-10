package com.zyyglxt.dao;

import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ChineseCulturalDOMapper {

    int deleteByPrimaryKey(@Param("key") ChineseCulturalDOKey key);


    int insert(ChineseCulturalDO record);

    int insertSelective(ChineseCulturalDO record);

    ChineseCulturalDO selectByPrimaryKey(@Param("key") ChineseCulturalDOKey key , @Param("chineseCulturalType") String chineseCulturalType);

    List<ChineseCulturalDO> selectChineseCulturalList(String chineseCulturalType);

    int updateByPrimaryKeySelective(@Param("key")ChineseCulturalDOKey key ,@Param("chineseCulturalDO") ChineseCulturalDO record);

    //做逻辑删除，科员和综合处处长删除的时候，实际是将这个资源的状态改为已下架,
    // 处长的审核也可以使用这个方法。
    int changeStatusByPrimaryKeySelective(@Param("key")ChineseCulturalDOKey key ,@Param("status") String chineseCulturalStatus);

    int updateByPrimaryKeyWithBLOBs(ChineseCulturalDO record);

    int updateByPrimaryKey(ChineseCulturalDO record);
}