package com.zyyglxt.service.impl;

import com.zyyglxt.dao.HealthSciKnowDOMapper;
import com.zyyglxt.dataobject.HealthSciKnowDO;
import com.zyyglxt.dataobject.HealthSciKnowDOKey;
import com.zyyglxt.service.HealthSciKnowDOService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/10/29 14:28
 */
@Service
public class HealthSciKnowDOServiceImpl implements HealthSciKnowDOService {
    @Resource
    HealthSciKnowDOMapper healthSciKnowDOMapper;
    @Override
    public int insertSelective(HealthSciKnowDO record) {
        /*Date data=new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            data = df.parse(df.format(data));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        record.setItemcreateat(data);*/
        record.setItemcode(UUID.randomUUID().toString());
        record.setItemcreateat(new Date());
        return healthSciKnowDOMapper.insertSelective(record);
    }

    @Override
    public int deleteByPrimaryKey(HealthSciKnowDOKey key) {
        healthSciKnowDOMapper.deleteByPrimaryKey(key);
        return 0;
    }

    @Override
    public int updateByPrimaryKeySelective(HealthSciKnowDO record) {
        /*Date data=new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            data = df.parse(df.format(data));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        record.setItemcreateat(data);*/
        record.setItemupdateat(new Date());
        return healthSciKnowDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public HealthSciKnowDO selectByPrimaryKey(HealthSciKnowDOKey key) {
        return healthSciKnowDOMapper.selectByPrimaryKey(key);
    }
    /*查询所有科普知识数据*/
    @Override
    public List<HealthSciKnowDO> selectAllHealthSciKnow() {
        return healthSciKnowDOMapper.selectAllHealthSciKnow();
    }

    @Override
    public int updateVisitNumHealthSciKnow(HealthSciKnowDOKey key) {
        healthSciKnowDOMapper.updateVisitNumHealthSciKnow(key);
        return 0;
    }
}
