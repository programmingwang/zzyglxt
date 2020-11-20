package com.zyyglxt.dao;

import com.zyyglxt.dataobject.SpecialtyDO;
import com.zyyglxt.dataobject.SpecialtyDOKey;
import com.zyyglxt.dto.StatusDto;

import java.util.List;

public interface SpecialtyDOMapper {

    int deleteByPrimaryKey(SpecialtyDOKey key);

    int insert(SpecialtyDO record);

    int insertSelective(SpecialtyDO record);

    SpecialtyDO selectByPrimaryKey(SpecialtyDOKey key);

    int updateByPrimaryKeySelective(SpecialtyDO record);

    int updateByPrimaryKeyWithBLOBs(SpecialtyDO record);

    int updateByPrimaryKey(SpecialtyDO record);

    List<SpecialtyDO> selectAllSpecialty();

    List<SpecialtyDO> searchSpecialty(String keyWord);

    SpecialtyDO selectSpecialtyByItemCode(String itemCode);

    List<SpecialtyDO> selectByHospCode(String hospCode);

    List<SpecialtyDO> selectByStatus(String status);

    int updateStatusByPrimaryKey(StatusDto statusDto);
}