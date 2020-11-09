package com.zyyglxt.service.impl;

import org.springframework.stereotype.Service;
import javax.annotation.Resource;
import com.zyyglxt.dao.IndustrialDevelopSaleDrugMapper;
import com.zyyglxt.dataobject.IndustrialDevelopSaleDrug;
import com.zyyglxt.service.IndustrialDevelopSaleDrugService;
/**
   *@Author lrt
   *@Date 2020/11/6 20:00
   *@Version 1.0
**/
@Service
public class IndustrialDevelopSaleDrugServiceImpl implements IndustrialDevelopSaleDrugService{

    @Resource
    private IndustrialDevelopSaleDrugMapper industrialDevelopSaleDrugMapper;

    @Override
    public int deleteByPrimaryKey(Integer itemid,String itemcode) {
        return industrialDevelopSaleDrugMapper.deleteByPrimaryKey(itemid,itemcode);
    }

    @Override
    public int insert(IndustrialDevelopSaleDrug record) {
        return industrialDevelopSaleDrugMapper.insert(record);
    }

    @Override
    public int insertSelective(IndustrialDevelopSaleDrug record) {
        return industrialDevelopSaleDrugMapper.insertSelective(record);
    }

    @Override
    public IndustrialDevelopSaleDrug selectByPrimaryKey(Integer itemid,String itemcode) {
        return industrialDevelopSaleDrugMapper.selectByPrimaryKey(itemid,itemcode);
    }

    @Override
    public int updateByPrimaryKeySelective(IndustrialDevelopSaleDrug record) {
        return industrialDevelopSaleDrugMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int updateByPrimaryKey(IndustrialDevelopSaleDrug record) {
        return industrialDevelopSaleDrugMapper.updateByPrimaryKey(record);
    }

}
