package com.zyyglxt.service.impl;

import com.zyyglxt.dao.HealthCareChineseMedicineDOMapper;
import com.zyyglxt.dataobject.HealthCareChineseMedicineDO;
import com.zyyglxt.dataobject.HealthCareChineseMedicineDOKey;
import com.zyyglxt.service.HealthCareChineseMedicineDOService;
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
 * @time 2020/10/28 22:10
 */
@Service
public class HealthCareChineseMedicineDOServiceImpl implements HealthCareChineseMedicineDOService {
    @Resource
    HealthCareChineseMedicineDOMapper healthCareChineseMedicineDOMapper;
/*
  中医药科普知识添加、删除、修改、查询实现方法
**/
    @Override
    public int insert(HealthCareChineseMedicineDO record) {
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
        return healthCareChineseMedicineDOMapper.insert(record);
    }

    @Override
    public int  deleteByPrimaryKey(HealthCareChineseMedicineDOKey key) {
          healthCareChineseMedicineDOMapper.deleteByPrimaryKey(key);
          return 0;
    }

    @Override
    public int updateByPrimaryKeySelective(HealthCareChineseMedicineDO record) {
        /*Date data=new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            data = df.parse(df.format(data));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        record.setItemcreateat(data);*/
        record.setItemupdateat(new Date());
        return healthCareChineseMedicineDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public HealthCareChineseMedicineDO selectByPrimaryKey(HealthCareChineseMedicineDOKey key) {
        return healthCareChineseMedicineDOMapper.selectByPrimaryKey(key);
    }
     /*查询所有中医药常识数据*/
    @Override
    public List<HealthCareChineseMedicineDO> selectAllHealthCareChineseMedicine() {
        return healthCareChineseMedicineDOMapper.selectAllHealthCareChineseMedicine();
    }
}
