package com.zyyglxt.service.impl;

import com.zyyglxt.dao.CulturalResourcesDOMapper;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;
import com.zyyglxt.dataobject.CulturalResourcesDO;
import com.zyyglxt.dataobject.CulturalResourcesDOKey;
import com.zyyglxt.service.ITraditionalCulturalService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/10/29 10:47
 * Version: 1.0
 */
//中医医史
@Service
public class TraditionalCulturalServiceImpl implements ITraditionalCulturalService {
    @Resource
    private CulturalResourcesDOMapper culturalResourcesDOMapper;

    @Override
    public CulturalResourcesDO getTraditionalCultural(CulturalResourcesDOKey key) {
        return culturalResourcesDOMapper.selectByPrimaryKey(key,"中医医史");
    }

    @Override
    public List<CulturalResourcesDO> getTraditionalCulturalList() {
        return culturalResourcesDOMapper.selectCulturalResourcesList("中医医史");
    }

    @Override
    @Transactional
    public int addTraditionalCultural(CulturalResourcesDO record) {
        record.setItemcreateat(new Date());
        record.setCreater("测试");
        record.setItemupdateat(new Date());
        record.setUpdater("测试");
        record.setChineseCulturalType("中医医史");
        return culturalResourcesDOMapper.insertSelective(record);
    }

    @Override
    @Transactional
    public int removeTraditionalCultural(CulturalResourcesDOKey key) {
        return culturalResourcesDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    @Transactional
    public int updateTraditionalCultural(CulturalResourcesDO record) {
        ChineseCulturalDOKey key = new ChineseCulturalDOKey();
        key.setItemid(record.getItemid());
        key.setItemcode(record.getItemcode());
        record.setUpdater("");
        record.setItemupdateat(new Date());
        return culturalResourcesDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int changeTraditionalCulturalStatus(CulturalResourcesDOKey key, String chineseCulturalStatus) {
        return culturalResourcesDOMapper.changeStatusByPrimaryKeySelective(key,chineseCulturalStatus);
    }
}
