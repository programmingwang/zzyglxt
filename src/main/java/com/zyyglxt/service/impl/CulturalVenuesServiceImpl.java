package com.zyyglxt.service.impl;

import com.zyyglxt.dao.ChineseCulturalDOMapper;
import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;
import com.zyyglxt.service.ICulturalVenuesService;
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
//文化场馆
@Service
public class CulturalVenuesServiceImpl implements ICulturalVenuesService {
    @Resource
    private ChineseCulturalDOMapper chineseCulturalDOMapper;

    @Override
    public ChineseCulturalDO getCulturalVenues(ChineseCulturalDOKey key) {
        return chineseCulturalDOMapper.selectByPrimaryKey(key,"文化场馆");
    }

    @Override
    public List<ChineseCulturalDO> getCulturalVenuesList() {
        return chineseCulturalDOMapper.selectChineseCulturalList("文化场馆");
    }

    @Override
    @Transactional
    public int addCulturalVenues(ChineseCulturalDO record) {
        chineseCulturalDOMapper.insertSelective(record);
        record.setItemcreateat(new Date());
        record.setCreater("");
        record.setItemupdateat(new Date());
        record.setUpdater("");
        record.setChineseCulturalType("文化场馆");
        return 0;
    }

    @Override
    @Transactional
    public int removeCulturalVenues(ChineseCulturalDOKey key) {
        return chineseCulturalDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    @Transactional
    public int updateCulturalVenues(ChineseCulturalDOKey key, ChineseCulturalDO record) {
        record.setUpdater("");
        record.setItemupdateat(new Date());
        return chineseCulturalDOMapper.updateByPrimaryKeySelective(key,record);
    }
}
