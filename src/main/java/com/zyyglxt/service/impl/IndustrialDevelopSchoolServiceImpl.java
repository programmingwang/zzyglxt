package com.zyyglxt.service.impl;

import org.springframework.stereotype.Service;
import javax.annotation.Resource;
import com.zyyglxt.dao.IndustrialDevelopSchoolMapper;
import com.zyyglxt.dataobject.IndustrialDevelopSchool;
import com.zyyglxt.service.IndustrialDevelopSchoolService;
/**
   *@Author lrt
   *@Date 2020/11/6 20:00
   *@Version 1.0
**/
@Service
public class IndustrialDevelopSchoolServiceImpl implements IndustrialDevelopSchoolService{

    @Resource
    private IndustrialDevelopSchoolMapper industrialDevelopSchoolMapper;

    @Override
    public int deleteByPrimaryKey(Integer itemid,String itemcode) {
        return industrialDevelopSchoolMapper.deleteByPrimaryKey(itemid,itemcode);
    }

    @Override
    public int insert(IndustrialDevelopSchool record) {
        return industrialDevelopSchoolMapper.insert(record);
    }

    @Override
    public int insertSelective(IndustrialDevelopSchool record) {
        return industrialDevelopSchoolMapper.insertSelective(record);
    }

    @Override
    public IndustrialDevelopSchool selectByPrimaryKey(Integer itemid,String itemcode) {
        return industrialDevelopSchoolMapper.selectByPrimaryKey(itemid,itemcode);
    }

    @Override
    public int updateByPrimaryKeySelective(IndustrialDevelopSchool record) {
        return industrialDevelopSchoolMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int updateByPrimaryKey(IndustrialDevelopSchool record) {
        return industrialDevelopSchoolMapper.updateByPrimaryKey(record);
    }

}
