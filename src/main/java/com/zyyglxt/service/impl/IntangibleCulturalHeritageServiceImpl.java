package com.zyyglxt.service.impl;

import com.zyyglxt.dao.ChineseCulturalDOMapper;
import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;
import com.zyyglxt.service.IIntangibleCulturalHeritageService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/10/29 19:14
 * Version: 1.0
 */
//非物质文化遗产
@Service
public class IntangibleCulturalHeritageServiceImpl implements IIntangibleCulturalHeritageService {
    @Resource
    private ChineseCulturalDOMapper chineseCulturalDOMapper;

    @Override
    public ChineseCulturalDO getIntangibleCulturalHeritage(ChineseCulturalDOKey key) {
        return chineseCulturalDOMapper.selectByPrimaryKey(key,"非物质文化遗产");
    }

    @Override
    public List<ChineseCulturalDO> getIntangibleCulturalHeritageList() {
        return chineseCulturalDOMapper.selectChineseCulturalList("非物质文化遗产");
    }

    @Override
    @Transactional
    public int addIntangibleCulturalHeritage(ChineseCulturalDO record) {
        record.setItemcreateat(new Date());
        record.setCreater("");
        record.setItemupdateat(new Date());
        record.setUpdater("");
        record.setChineseCulturalType("非物质文化遗产");
        return chineseCulturalDOMapper.insertSelective(record);
    }

    @Override
    @Transactional
    public int removeIntangibleCulturalHeritage(ChineseCulturalDOKey key) {
        return chineseCulturalDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    @Transactional
    public int updateIntangibleCulturalHeritage(ChineseCulturalDO record) {
        ChineseCulturalDOKey key = new ChineseCulturalDOKey();
        key.setItemid(record.getItemid());
        key.setItemcode(record.getItemcode());
        record.setUpdater("");
        record.setItemupdateat(new Date());
        return chineseCulturalDOMapper.updateByPrimaryKeySelective(key,record);
    }

    @Override
    public int changeIntangibleCulturalHeritageStatus(ChineseCulturalDOKey key, String chineseCulturalStatus) {
        return chineseCulturalDOMapper.changeStatusByPrimaryKeySelective(key,chineseCulturalStatus);
    }
}
