package com.zyyglxt.service.impl;

import com.zyyglxt.dao.IndustrialDevelopTecSerOrgMapper;
import com.zyyglxt.dataobject.IndustrialDevelopTecSerOrg;
import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopTecSerOrgDto;
import com.zyyglxt.service.IFileService;
import com.zyyglxt.service.IndustrialDevelopTecSerOrgService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
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
    
    @Resource
    private IFileService fileService;

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
    public List<IndustrialDevelopTecSerOrgDto> selectAll() {
        List<IndustrialDevelopTecSerOrg> list = industrialDevelopTecSerOrgMapper.selectAll();
        List<IndustrialDevelopTecSerOrgDto> resList = new ArrayList<>();
        for (IndustrialDevelopTecSerOrg item: list){
            IndustrialDevelopTecSerOrgDto newObj = new IndustrialDevelopTecSerOrgDto();
            BeanUtils.copyProperties(item,newObj);
            resList.add(newObj);
        }
        BeanUtils.copyProperties(list,resList);
        for (IndustrialDevelopTecSerOrgDto item: resList){
            item.setFilePath(fileService.selectFileByDataCode(item.getItemcode()).getFilePath());
        }
        return resList;
    }

}
