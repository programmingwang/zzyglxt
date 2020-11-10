package com.zyyglxt.service.impl;

import org.springframework.stereotype.Service;
import javax.annotation.Resource;
import com.zyyglxt.dao.IndustrialDevelopChiMedMapper;
import com.zyyglxt.dataobject.IndustrialDevelopChiMed;
import com.zyyglxt.service.IndustrialDevelopChiMedService;
/**
   *@Author lrt
   *@Date 2020/11/6 20:00
   *@Version 1.0
**/
@Service
public class IndustrialDevelopChiMedServiceImpl implements IndustrialDevelopChiMedService{

    @Resource
    private IndustrialDevelopChiMedMapper industrialDevelopChiMedMapper;

    @Override
    public int deleteByPrimaryKey(Integer itemid,String itemcode) {
        return industrialDevelopChiMedMapper.deleteByPrimaryKey(itemid,itemcode);
    }

    @Override
    public int insert(IndustrialDevelopChiMed record) {
        return industrialDevelopChiMedMapper.insert(record);
    }

    @Override
    public int insertSelective(IndustrialDevelopChiMed record) {
        return industrialDevelopChiMedMapper.insertSelective(record);
    }

    @Override
    public IndustrialDevelopChiMed selectByPrimaryKey(Integer itemid,String itemcode) {
        return industrialDevelopChiMedMapper.selectByPrimaryKey(itemid,itemcode);
    }

    @Override
    public int updateByPrimaryKeySelective(IndustrialDevelopChiMed record) {
        return industrialDevelopChiMedMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int updateByPrimaryKey(IndustrialDevelopChiMed record) {
        return industrialDevelopChiMedMapper.updateByPrimaryKey(record);
    }

}
