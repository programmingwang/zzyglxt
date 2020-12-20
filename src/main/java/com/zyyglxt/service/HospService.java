package com.zyyglxt.service;

import com.zyyglxt.dataobject.HospDO;

/**
 * @Author nongcn
 * @Date 2020/11/22 18:40
 * @Version 1.0
 */
public interface HospService {
    int addHosp(HospDO hospDO);

    int updateHosp(HospDO hospDO);
}
