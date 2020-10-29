package com.zyyglxt.service.impl;

import com.zyyglxt.dao.IndustrialDevelopSciAchiDOMapper;
import com.zyyglxt.dataobject.IndustrialDevelopSciAchiDO;
import com.zyyglxt.dataobject.IndustrialDevelopSciAchiDOKey;
import com.zyyglxt.service.IIndustrialDevelop;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @Author lrt
 * @Date 2020/10/29 9:11
 * @Version 1.0
 **/
@Service
public class IndustrialDevelopImpl implements IIndustrialDevelop {

    @Resource
    IndustrialDevelopSciAchiDOMapper sciAchiDOMapper;

    @Override
    public void addAchievement(IndustrialDevelopSciAchiDO achiDO) {
        sciAchiDOMapper.insertSelective(achiDO);
    }

    @Override
    public void delAchievement(IndustrialDevelopSciAchiDOKey key) {
        sciAchiDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    public void updAchievement(IndustrialDevelopSciAchiDO achiDO) {
        sciAchiDOMapper.updateByPrimaryKeySelective(achiDO);
    }

    @Override
    public void increaseVisitNum(IndustrialDevelopSciAchiDOKey key) {
        sciAchiDOMapper.updateVisitNumByItemidAndItemcode(key);
    }
}
