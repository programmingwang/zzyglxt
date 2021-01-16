package com.zyyglxt.dao;

import com.zyyglxt.dataobject.ChineseMedicineDO;
import com.zyyglxt.dataobject.ChineseMedicineDOKey;
import com.zyyglxt.dataobject.ChineseMedicineDOWithBLOBs;
import com.zyyglxt.dto.ChineseMedicineDto;
import com.zyyglxt.dto.StatusDto;

import java.util.List;

public interface ChineseMedicineDOMapper {
    int deleteByPrimaryKey(ChineseMedicineDOKey key);

    int insert(ChineseMedicineDO record);

    int insertSelective(ChineseMedicineDO record);

    ChineseMedicineDO selectByPrimaryKey(ChineseMedicineDOKey key);

    int updateByPrimaryKeySelective(ChineseMedicineDO record);

    int updateByPrimaryKeyWithBLOBs(ChineseMedicineDOWithBLOBs record);

    int updateByPrimaryKey(ChineseMedicineDO record);

    List<ChineseMedicineDO> selectAllChineseMedicine();

    List<ChineseMedicineDto> searchChineseMedicine(String keyWord);

    List<ChineseMedicineDto> selectBySpecialtyCode(String specialtyCode);

    List<ChineseMedicineDto> selectByStatus(String status);

    int updateStatusByPrimaryKey(StatusDto statusDto);
}