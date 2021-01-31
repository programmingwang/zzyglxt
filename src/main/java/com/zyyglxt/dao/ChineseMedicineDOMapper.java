package com.zyyglxt.dao;

import com.zyyglxt.dataobject.ChineseMedicineDO;
import com.zyyglxt.dataobject.ChineseMedicineDOKey;
import com.zyyglxt.dataobject.ChineseMedicineDOWithBLOBs;
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

    List<ChineseMedicineDO> searchChineseMedicine(String keyWord);

    List<ChineseMedicineDO> top5ChineseMedicine();

    List<ChineseMedicineDO> selectBySpecialtyCode(String specialtyCode);

    List<ChineseMedicineDO> selectByStatus(String status);

    int updateStatusByPrimaryKey(StatusDto statusDto);
}