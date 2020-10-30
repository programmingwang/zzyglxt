package com.zyyglxt.service;

import com.zyyglxt.dataobject.IndustrialDevelopCooExcDO;
import com.zyyglxt.dataobject.IndustrialDevelopCooExcDOKey;

/**
 * @Author lrt
 * @Date 2020/10/29 14:24
 * @Version 1.0
 **/
public interface IIndustrialDevelopCooService {

    void addCooRecord(IndustrialDevelopCooExcDO developCooExcDO);

    void delCooRecord(IndustrialDevelopCooExcDOKey key);

    void updCooRecord(IndustrialDevelopCooExcDO developCooExcDO);

    void increaseVisitNum(IndustrialDevelopCooExcDOKey key);
}
