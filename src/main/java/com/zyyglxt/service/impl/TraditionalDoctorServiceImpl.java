package com.zyyglxt.service.impl;

import com.zyyglxt.dao.ChineseCulturalDOMapper;
import com.zyyglxt.dao.CulturalResourcesDOMapper;
import com.zyyglxt.dataobject.CulturalResourcesDO;
import com.zyyglxt.dataobject.CulturalResourcesDOKey;
import com.zyyglxt.service.ITraditionalDoctorService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/10/29 19:00
 * Version: 1.0
 */
//历代名家
@Service
public class TraditionalDoctorServiceImpl implements ITraditionalDoctorService {
    @Resource
    private CulturalResourcesDOMapper culturalResourcesDOMapper;

    @Override
    public CulturalResourcesDO getTraditionalDoctor(CulturalResourcesDOKey key) {
        return culturalResourcesDOMapper.selectByPrimaryKey(key,"历代名家");
    }

    @Override
    public List<CulturalResourcesDO> getTraditionalDoctorList() {
        return culturalResourcesDOMapper.selectCulturalResourcesList("历代名家");
    }

    @Override
    @Transactional
    public int addTraditionalDoctor(CulturalResourcesDO record) {
        record.setItemcreateat(new Date());
        record.setCreater("");
        record.setItemupdateat(new Date());
        record.setUpdater("");
        record.setChineseCulturalType("历代名家");
        return culturalResourcesDOMapper.insertSelective(record);
    }

    @Override
    @Transactional
    public int removeTraditionalDoctor(CulturalResourcesDOKey key) {
        return culturalResourcesDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    @Transactional
    public int updateTraditionalDoctor(CulturalResourcesDO record) {
        record.setUpdater("");
        record.setItemupdateat(new Date());
        return culturalResourcesDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int changeTraditionalDoctorStatus(CulturalResourcesDOKey key, String chineseCulturalStatus) {
        return culturalResourcesDOMapper.changeStatusByPrimaryKeySelective(key,chineseCulturalStatus);
    }
}
