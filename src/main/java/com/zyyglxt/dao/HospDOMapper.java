package com.zyyglxt.dao;

import com.zyyglxt.dataobject.HospDO;
import com.zyyglxt.dataobject.HospDOKey;
import com.zyyglxt.dto.HospDto;
import com.zyyglxt.dto.StatusDto;

import java.util.List;

public interface HospDOMapper {

    int deleteByPrimaryKey(HospDOKey key);

    int insert(HospDO record);

    int insertSelective(HospDO record);

    HospDO selectByPrimaryKey(HospDOKey key);

    int updateByPrimaryKeySelective(HospDO record);

    int updateByPrimaryKeyWithBLOBs(HospDO record);

    int updateByPrimaryKey(HospDO record);

    List<HospDto> selectAllHosp();

    List<HospDto> searchHosp(String keyWord);

    HospDto selectHospByItemCode(String itemCode);

    List<HospDto> selectByStatus(String status);

    int updateStatusByPrimaryKey(StatusDto statusDto);

    HospDto selectByOrgCode(String orgCode);

}