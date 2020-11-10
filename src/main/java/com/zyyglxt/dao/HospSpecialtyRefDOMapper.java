package com.zyyglxt.dao;

import com.zyyglxt.dataobject.HospSpecialtyRefDO;
import com.zyyglxt.dataobject.HospSpecialtyRefDOKey;

public interface HospSpecialtyRefDOMapper {

    int deleteByPrimaryKey(HospSpecialtyRefDOKey key);

    int insert(HospSpecialtyRefDO record);

    int insertSelective(HospSpecialtyRefDO record);

    HospSpecialtyRefDO selectByPrimaryKey(HospSpecialtyRefDOKey key);

    int updateByPrimaryKeySelective(HospSpecialtyRefDO record);

    int updateByPrimaryKey(HospSpecialtyRefDO record);

    HospSpecialtyRefDO selectHospBySpecialtyCode(String specialtyCode);
}