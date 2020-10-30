package com.zyyglxt.service.impl;

import com.zyyglxt.dao.ChineseCulturalDOMapper;
import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;
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
    private ChineseCulturalDOMapper chineseCulturalDOMapper;

    @Override
    public ChineseCulturalDO getTraditionalCultural(ChineseCulturalDOKey key) {
        return chineseCulturalDOMapper.selectByPrimaryKey(key,"中医医史");
    }

    @Override
    public List<ChineseCulturalDO> getTraditionalCulturalList() {
        return chineseCulturalDOMapper.selectChineseCulturalList("中医医史");
    }

    @Override
    @Transactional
    public int addTraditionalCultural(ChineseCulturalDO record) {
        chineseCulturalDOMapper.insertSelective(record);
        record.setItemcreateat(new Date());
        record.setCreater("");
        record.setItemupdateat(new Date());
        record.setUpdater("");
        record.setChineseCulturalType("中医医史");
        return 0;
    }

    @Override
    @Transactional
    public int removeTraditionalCultural(ChineseCulturalDOKey key) {
        return chineseCulturalDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    @Transactional
    public int updateTraditionalCultural(ChineseCulturalDOKey key,ChineseCulturalDO record) {
        record.setUpdater("");
        record.setItemupdateat(new Date());
        return chineseCulturalDOMapper.updateByPrimaryKeySelective(key,record);
    }
}
