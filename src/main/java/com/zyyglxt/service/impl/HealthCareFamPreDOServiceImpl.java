package com.zyyglxt.service.impl;

import com.zyyglxt.dao.HealthCareFamPreDOMapper;
import com.zyyglxt.dataobject.HealthCareFamPreDO;
import com.zyyglxt.dataobject.HealthCareFamPreDOKey;
import com.zyyglxt.service.HealthCareFamPreDOService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/10/29 14:25
 */
@Service
public class HealthCareFamPreDOServiceImpl implements HealthCareFamPreDOService {
    @Resource
    HealthCareFamPreDOMapper healthCareFamPreDOMapper;
    /*
      历史名方、国医话健康添加、删除、修改、查询实现方法
  **/
    @Override
    public int insertSelective(HealthCareFamPreDO record) {
        Date data=new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            data = df.parse(df.format(data));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        record.setItemcreateat(data);
        return healthCareFamPreDOMapper.insertSelective(record);
    }

    @Override
    public int deleteByPrimaryKey(HealthCareFamPreDOKey key) {
        healthCareFamPreDOMapper.deleteByPrimaryKey(key);
        return 0;
    }

    @Override
    public int updateByPrimaryKeySelective(HealthCareFamPreDO record) {
        Date data=new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            data = df.parse(df.format(data));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        record.setItemcreateat(data);
        return healthCareFamPreDOMapper.updateByPrimaryKeySelective(record);
    }
    @Override
    public HealthCareFamPreDO selectByPrimaryKey(HealthCareFamPreDOKey key) {
        return healthCareFamPreDOMapper.selectByPrimaryKey(key);
    }
}