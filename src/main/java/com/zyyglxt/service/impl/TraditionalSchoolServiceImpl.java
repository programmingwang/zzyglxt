package com.zyyglxt.service.impl;

import com.zyyglxt.dao.ChineseCulturalDOMapper;
import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;
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
    private ChineseCulturalDOMapper chineseCulturalDOMapper;

    @Override
    public ChineseCulturalDO getTraditionalSchool(ChineseCulturalDOKey key) {
        return chineseCulturalDOMapper.selectByPrimaryKey(key,"中医流派");
    }

    @Override
    public List<ChineseCulturalDO> getTraditionalSchoolList() {
        return chineseCulturalDOMapper.selectChineseCulturalList("中医流派");

    }

    @Override
    @Transactional
    public int addTraditionalSchool(ChineseCulturalDO record) {
        chineseCulturalDOMapper.insertSelective(record);
        record.setItemcreateat(new Date());
        record.setCreater("");
        record.setItemupdateat(new Date());
        record.setUpdater("");
        record.setChineseCulturalType("中医流派");
        return 0;
    }

    @Override
    @Transactional
    public int removeTraditionalSchool(ChineseCulturalDOKey key) {
        return chineseCulturalDOMapper.deleteByPrimaryKey(key);

    }

    @Override
    @Transactional
    public int updateTraditionalSchool(ChineseCulturalDOKey key, ChineseCulturalDO record) {
        record.setUpdater("");
        record.setItemupdateat(new Date());
        return chineseCulturalDOMapper.updateByPrimaryKeySelective(key,record);
    }
}
