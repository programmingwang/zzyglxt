package com.zyyglxt.service;

import com.zyyglxt.dataobject.ChineseMedicineDO;
import com.zyyglxt.dataobject.ChineseMedicineDOKey;

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
    List<ChineseMedicineDO> selectAllChineseMedicine();
    List<ChineseMedicineDO> searchChineseMedicine(String keyWord);
    List<ChineseMedicineDO> top5ChineseMedicine();
}
