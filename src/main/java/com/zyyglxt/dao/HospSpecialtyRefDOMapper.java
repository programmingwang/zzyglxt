package com.zyyglxt.dao;

import com.zyyglxt.dataobject.HospSpecialtyRefDO;
import com.zyyglxt.dataobject.HospSpecialtyRefDOKey;

import java.util.List;

public interface HospSpecialtyRefDOMapper {

    int deleteByPrimaryKey(HospSpecialtyRefDOKey key);

    int insert(HospSpecialtyRefDO record);

    int insertSelective(HospSpecialtyRefDO record);

    HospSpecialtyRefDO selectByPrimaryKey(HospSpecialtyRefDOKey key);

    int updateByPrimaryKeySelective(HospSpecialtyRefDO record);

    int updateByPrimaryKey(HospSpecialtyRefDO record);

    HospSpecialtyRefDO selectHospBySpecialtyCode(String specialtyCode);

    int deleteBySpecialtyCode(String specialtyCode);

    List<HospSpecialtyRefDO> selectSpecialtyByHospCode(String hospCode);

    int updateBySpecialtyCodeSelective(String specialtyCode);
}