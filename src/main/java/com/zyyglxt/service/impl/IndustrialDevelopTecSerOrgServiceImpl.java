package com.zyyglxt.service.impl;

import org.springframework.stereotype.Service;
import javax.annotation.Resource;
import com.zyyglxt.dao.IndustrialDevelopTecSerOrgMapper;
import com.zyyglxt.dataobject.IndustrialDevelopTecSerOrg;
import com.zyyglxt.service.IndustrialDevelopTecSerOrgService;

import java.util.List;

/**
   *@Author lrt
   *@Date 2020/11/6 20:00
   *@Version 1.0
**/
@Service
public class IndustrialDevelopTecSerOrgServiceImpl implements IndustrialDevelopTecSerOrgService{

    @Resource
    private IndustrialDevelopTecSerOrgMapper industrialDevelopTecSerOrgMapper;

    @Override
    public int deleteByPrimaryKey(Integer itemid,String itemcode) {
        return industrialDevelopTecSerOrgMapper.deleteByPrimaryKey(itemid,itemcode);
    }

    @Override
    public int insert(IndustrialDevelopTecSerOrg record) {
        return industrialDevelopTecSerOrgMapper.insert(record);
    }

    @Override
    public int insertSelective(IndustrialDevelopTecSerOrg record) {
        return industrialDevelopTecSerOrgMapper.insertSelective(record);
    }

    @Override
    public IndustrialDevelopTecSerOrg selectByPrimaryKey(Integer itemid,String itemcode) {
        return industrialDevelopTecSerOrgMapper.selectByPrimaryKey(itemid,itemcode);
    }

    @Override
    public int updateByPrimaryKeySelective(IndustrialDevelopTecSerOrg record) {
        return industrialDevelopTecSerOrgMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int updateByPrimaryKey(IndustrialDevelopTecSerOrg record) {
        return industrialDevelopTecSerOrgMapper.updateByPrimaryKey(record);
    }

    @Override
    public List<IndustrialDevelopTecSerOrg> selectAll() {
        return industrialDevelopTecSerOrgMapper.selectAll();
    }

}
