package com.zyyglxt.dao;

import com.zyyglxt.dataobject.SpecialtyDO;
import com.zyyglxt.dataobject.SpecialtyDOKey;
import com.zyyglxt.dto.SpecialtyDto;
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

    List<SpecialtyDto> searchSpecialty(String keyWord);

    SpecialtyDO selectSpecialtyByItemCode(String itemCode);

    List<SpecialtyDto> selectByHospCode(String hospCode);

    List<SpecialtyDto> selectByStatus(String status);

    int updateStatusByPrimaryKey(StatusDto statusDto);
}