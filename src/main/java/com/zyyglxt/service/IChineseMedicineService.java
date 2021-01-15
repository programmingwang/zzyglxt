package com.zyyglxt.service;

import com.zyyglxt.dataobject.ChineseMedicineDO;
import com.zyyglxt.dataobject.ChineseMedicineDOKey;
import com.zyyglxt.dto.ChineseMedicineDto;
import com.zyyglxt.dto.StatusDto;

import java.util.List;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/10/30 11:44
 */
public interface IChineseMedicineService {
    int addChineseMedicine(ChineseMedicineDO chineseMedicineDO);
    int updateChineseMedicine(ChineseMedicineDO chineseMedicineDO);
    int deleteChineseMedicine(ChineseMedicineDOKey chineseMedicineDOKey);
    List<ChineseMedicineDto> selectAllChineseMedicine(List<String> chineseMedicineStatus);
    List<ChineseMedicineDto> searchChineseMedicine(String keyWord);
    List<ChineseMedicineDto> selectBySpecialtyCode(String specialtyCode);
    int updateStatus(StatusDto statusDto);
}
