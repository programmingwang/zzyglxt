package com.zyyglxt.service;

import com.zyyglxt.dataobject.IndustrialDevelopSciAchiDO;
import com.zyyglxt.dataobject.IndustrialDevelopSciAchiDOKey;
import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopSciAchiDODto;

import java.util.List;

/**
 * @Author lrt
 * @Date 2020/10/29 9:11
 * @Version 1.0
 **/
public interface IIndustrialDevelopSciAchiService {

    void addAchievement(IndustrialDevelopSciAchiDO achiDO);

    void delAchievement(IndustrialDevelopSciAchiDOKey key);

    void updAchievement(IndustrialDevelopSciAchiDO achiDO);

    void increaseVisitNum(IndustrialDevelopSciAchiDOKey key);

    List<IndustrialDevelopSciAchiDODto> getAchievement(String orgCode);

}
