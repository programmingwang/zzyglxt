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
        Date data=new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            data = df.parse(df.format(data));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        record.setItemcreateat(data);
        return healthCareChineseMedicineDOMapper.insert(record);
    }

    @Override
    public int deleteByPrimaryKey(HealthCareChineseMedicineDOKey key) {
          healthCareChineseMedicineDOMapper.deleteByPrimaryKey(key);
          return 0;
    }

    @Override
    public int updateByPrimaryKey(HealthCareChineseMedicineDO record) {
        Date data=new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            data = df.parse(df.format(data));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        record.setItemcreateat(data);
        return healthCareChineseMedicineDOMapper.updateByPrimaryKey(record);
    }

    @Override
    public HealthCareChineseMedicineDO selectByPrimaryKey(HealthCareChineseMedicineDOKey key) {
        return healthCareChineseMedicineDOMapper.selectByPrimaryKey(key);
    }
}
