package com.zyyglxt.service;

import com.zyyglxt.dataobject.IndustrialDevelopCooExcDO;
import com.zyyglxt.dataobject.IndustrialDevelopCooExcDOKey;

import java.util.List;

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

    List<IndustrialDevelopCooExcDO> getCooRecord(int page, int page_size);


}
