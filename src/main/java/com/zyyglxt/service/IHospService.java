package com.zyyglxt.service;

import com.zyyglxt.dataobject.HospDO;
import com.zyyglxt.dataobject.HospDOKey;

import java.util.List;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/10/29 10:21
 */
public interface IHospService {
    int addHosp(HospDO hospDO);
    int updateHosp(HospDO hospDO);
    int deleteHosp(HospDOKey hospDOKey);
    List<HospDO> selectAllHosp();
    List<HospDO> searchHosp(String keyWord);
    List<HospDO> top5Hosp();
}
