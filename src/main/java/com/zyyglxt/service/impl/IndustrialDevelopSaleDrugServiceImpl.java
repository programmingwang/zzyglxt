package com.zyyglxt.service.impl;

import com.zyyglxt.dataobject.HealthCareChineseMedicineDO;
import org.springframework.stereotype.Service;
import javax.annotation.Resource;
import com.zyyglxt.dao.IndustrialDevelopSaleDrugMapper;
import com.zyyglxt.dataobject.IndustrialDevelopSaleDrug;
import com.zyyglxt.service.IndustrialDevelopSaleDrugService;

import java.util.ArrayList;
import java.util.List;

/**
   *@Author lrt
   *@Date 2020/11/6 20:00
   *@Version 1.0
**/
@Service
public class IndustrialDevelopSaleDrugServiceImpl implements IndustrialDevelopSaleDrugService{

    @Resource
    private IndustrialDevelopSaleDrugMapper industrialDevelopSaleDrugMapper;
   /*删除*/
    @Override
    public int deleteByPrimaryKey(Integer itemid,String itemcode) {
        return industrialDevelopSaleDrugMapper.deleteByPrimaryKey(itemid,itemcode);
    }
/*添加无判断*/
    @Override
    public int insert(IndustrialDevelopSaleDrug record) {
        return industrialDevelopSaleDrugMapper.insert(record);
    }
/*添加有判断*/
    @Override
    public int insertSelective(IndustrialDevelopSaleDrug record) {
        return industrialDevelopSaleDrugMapper.insertSelective(record);
    }
/*通过id和code查询记录*/
    @Override
    public IndustrialDevelopSaleDrug selectByPrimaryKey(Integer itemid,String itemcode) {
        return industrialDevelopSaleDrugMapper.selectByPrimaryKey(itemid,itemcode);
    }
/*数据更新*/
    @Override
    public int updateByPrimaryKeySelective(IndustrialDevelopSaleDrug record) {
        return industrialDevelopSaleDrugMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int updateByPrimaryKey(IndustrialDevelopSaleDrug record) {
        return industrialDevelopSaleDrugMapper.updateByPrimaryKey(record);
    }

    @Override
    public List< IndustrialDevelopSaleDrug> selectAllSaleDrug(String orgCode) {
        return industrialDevelopSaleDrugMapper.selectAllSaleDrug(orgCode);
    }

}
