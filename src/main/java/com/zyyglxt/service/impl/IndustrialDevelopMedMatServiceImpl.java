package com.zyyglxt.service.impl;

import org.springframework.stereotype.Service;
import javax.annotation.Resource;
import com.zyyglxt.dao.IndustrialDevelopMedMatMapper;
import com.zyyglxt.dataobject.IndustrialDevelopMedMat;
import com.zyyglxt.service.IndustrialDevelopMedMatService;
/**
   *@Author lrt
   *@Date 2020/11/6 20:00
   *@Version 1.0
**/
@Service
public class IndustrialDevelopMedMatServiceImpl implements IndustrialDevelopMedMatService{

    @Resource
    private IndustrialDevelopMedMatMapper industrialDevelopMedMatMapper;

    @Override
    public int deleteByPrimaryKey(Integer itemid,String itemcode) {
        return industrialDevelopMedMatMapper.deleteByPrimaryKey(itemid,itemcode);
    }

    @Override
    public int insert(IndustrialDevelopMedMat record) {
        return industrialDevelopMedMatMapper.insert(record);
    }

    @Override
    public int insertSelective(IndustrialDevelopMedMat record) {
        return industrialDevelopMedMatMapper.insertSelective(record);
    }

    @Override
    public IndustrialDevelopMedMat selectByPrimaryKey(Integer itemid,String itemcode) {
        return industrialDevelopMedMatMapper.selectByPrimaryKey(itemid,itemcode);
    }

    @Override
    public int updateByPrimaryKeySelective(IndustrialDevelopMedMat record) {
        return industrialDevelopMedMatMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int updateByPrimaryKey(IndustrialDevelopMedMat record) {
        return industrialDevelopMedMatMapper.updateByPrimaryKey(record);
    }

}
