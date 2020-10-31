package com.zyyglxt.service.impl;

import com.zyyglxt.dao.FamPreDOMapper;
import com.zyyglxt.dataobject.FamPreDO;
import com.zyyglxt.dataobject.FamPreDOKey;
import com.zyyglxt.service.FamPreDOService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/10/31 12:11
 */
@Service
public class FamPreDOServiceImpl implements FamPreDOService {
    @Resource
    FamPreDOMapper famPreDOMapper;
    @Override
    public int insertSelective(FamPreDO record) {
        Date data=new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            data = df.parse(df.format(data));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        record.setItemcreateat(data);
        return famPreDOMapper.insertSelective(record);
    }

    @Override
    public int deleteByPrimaryKey(FamPreDOKey key) {
        famPreDOMapper.deleteByPrimaryKey(key);
        return 0;
    }

    @Override
    public int updateByPrimaryKeySelective(FamPreDO record) {
        Date data=new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            data = df.parse(df.format(data));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        record.setItemcreateat(data);
        return famPreDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public FamPreDO selectByPrimaryKey(FamPreDOKey key) {
        return famPreDOMapper.selectByPrimaryKey(key);
    }
}
