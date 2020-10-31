package com.zyyglxt.service.impl;

import com.zyyglxt.dao.ChineseCulturalDOMapper;
import com.zyyglxt.dao.CulturalResourcesDOMapper;
import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;
import com.zyyglxt.dataobject.CulturalResourcesDO;
import com.zyyglxt.dataobject.CulturalResourcesDOKey;
import com.zyyglxt.service.ITraditionalSchoolService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/10/29 19:03
 * Version: 1.0
 */
//中医流派
@Service
public class TraditionalSchoolServiceImpl implements ITraditionalSchoolService {
    @Resource
    private CulturalResourcesDOMapper culturalResourcesDOMapper;

    @Override
    public CulturalResourcesDO getTraditionalSchool(CulturalResourcesDOKey key) {
        return culturalResourcesDOMapper.selectByPrimaryKey(key,"中医流派");
    }

    @Override
    public List<CulturalResourcesDO> getTraditionalSchoolList() {
        return culturalResourcesDOMapper.selectCulturalResourcesList("中医流派");
    }

    @Override
    @Transactional
    public int addTraditionalSchool(CulturalResourcesDO record) {
        record.setItemcreateat(new Date());
        record.setCreater("");
        record.setItemupdateat(new Date());
        record.setUpdater("");
        record.setChineseCulturalType("中医流派");
        return culturalResourcesDOMapper.insertSelective(record);
    }

    @Override
    @Transactional
    public int removeTraditionalSchool(CulturalResourcesDOKey key) {
        return culturalResourcesDOMapper.deleteByPrimaryKey(key);

    }

    @Override
    @Transactional
    public int updateTraditionalSchool(CulturalResourcesDO record) {
        record.setUpdater("");
        record.setItemupdateat(new Date());
        return culturalResourcesDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int changeTraditionalSchoolStatus(CulturalResourcesDOKey key, String chineseCulturalStatus) {
        return culturalResourcesDOMapper.changeStatusByPrimaryKeySelective(key,chineseCulturalStatus);
    }
}
