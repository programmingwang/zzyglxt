package com.zyyglxt.service.impl;

import org.springframework.stereotype.Service;
import javax.annotation.Resource;
import com.zyyglxt.dataobject.IndustrialDevelopBasestyle;
import com.zyyglxt.dao.IndustrialDevelopBasestyleMapper;
import com.zyyglxt.service.IndustrialDevelopBasestyleService;
/**
   *@Author lrt
   *@Date 2020/11/6 20:00
   *@Version 1.0
**/
@Service
public class IndustrialDevelopBasestyleServiceImpl implements IndustrialDevelopBasestyleService{

    @Resource
    private IndustrialDevelopBasestyleMapper industrialDevelopBasestyleMapper;

    @Override
    public int deleteByPrimaryKey(Integer itemid,String itemcode) {
        return industrialDevelopBasestyleMapper.deleteByPrimaryKey(itemid,itemcode);
    }

    @Override
    public int insert(IndustrialDevelopBasestyle record) {
        return industrialDevelopBasestyleMapper.insert(record);
    }

    @Override
    public int insertSelective(IndustrialDevelopBasestyle record) {
        return industrialDevelopBasestyleMapper.insertSelective(record);
    }

    @Override
    public IndustrialDevelopBasestyle selectByPrimaryKey(Integer itemid,String itemcode) {
        return industrialDevelopBasestyleMapper.selectByPrimaryKey(itemid,itemcode);
    }

    @Override
    public int updateByPrimaryKeySelective(IndustrialDevelopBasestyle record) {
        return industrialDevelopBasestyleMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int updateByPrimaryKey(IndustrialDevelopBasestyle record) {
        return industrialDevelopBasestyleMapper.updateByPrimaryKey(record);
    }

}
