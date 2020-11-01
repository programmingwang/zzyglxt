package com.zyyglxt.service.impl;

import com.zyyglxt.dao.ChineseCulturalDOMapper;
import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;
import com.zyyglxt.service.ITravelService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/10/29 19:41
 * Version: 1.0
 */
@Service
public class TravelServiceImpl implements ITravelService {
    @Resource
    private ChineseCulturalDOMapper chineseCulturalDOMapper;

    @Override
    public ChineseCulturalDO getTravel(ChineseCulturalDOKey key) {
        return chineseCulturalDOMapper.selectByPrimaryKey(key,"健康旅游信息");
    }

    @Override
    public List<ChineseCulturalDO> getTravelList() {
        return chineseCulturalDOMapper.selectChineseCulturalList("健康旅游信息");
    }

    @Override
    @Transactional
    public int addTravelSchool(ChineseCulturalDO record) {
        chineseCulturalDOMapper.insertSelective(record);
        record.setItemcreateat(new Date());
        record.setCreater("");
        record.setItemupdateat(new Date());
        record.setUpdater("");
        record.setChineseCulturalType("健康旅游信息");
        return 0;
    }

    @Override
    @Transactional
    public int removeTravel(ChineseCulturalDOKey key) {
        return chineseCulturalDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    @Transactional
    public int updateTravel(ChineseCulturalDO record) {
        ChineseCulturalDOKey key = new ChineseCulturalDOKey();
        key.setItemid(record.getItemid());
        key.setItemcode(record.getItemcode());
        record.setUpdater("");
        record.setItemupdateat(new Date());
        return chineseCulturalDOMapper.updateByPrimaryKeySelective(key,record);
    }

    @Override
    public int changeTravelStatus(ChineseCulturalDOKey key, String chineseCulturalStatus) {
        return chineseCulturalDOMapper.changeStatusByPrimaryKeySelective(key,chineseCulturalStatus);
    }
}
