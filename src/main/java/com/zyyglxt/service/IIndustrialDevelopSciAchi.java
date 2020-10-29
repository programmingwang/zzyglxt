package com.zyyglxt.service;

import com.zyyglxt.dataobject.IndustrialDevelopSciAchiDO;
import com.zyyglxt.dataobject.IndustrialDevelopSciAchiDOKey;

/**
 * @Author lrt
 * @Date 2020/10/29 9:11
 * @Version 1.0
 **/
public interface IIndustrialDevelopSciAchi {

    void addAchievement(IndustrialDevelopSciAchiDO achiDO);

    void delAchievement(IndustrialDevelopSciAchiDOKey key);

    void updAchievement(IndustrialDevelopSciAchiDO achiDO);

    void increaseVisitNum(IndustrialDevelopSciAchiDOKey key);

}
