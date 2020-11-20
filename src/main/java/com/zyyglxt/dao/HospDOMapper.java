package com.zyyglxt.dao;

import com.zyyglxt.dataobject.HospDO;
import com.zyyglxt.dataobject.HospDOKey;
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

    List<HospDO> selectAllHosp();

    List<HospDO> searchHosp(String keyWord);

    List<HospDO> top5Hosp();

    HospDO selectHospByItemCode(String itemCode);

    List<HospDO> selectByStatus(String status);

    int updateStatusByPrimaryKey(StatusDto statusDto);

}