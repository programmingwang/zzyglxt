package com.zyyglxt.service.impl;

import com.zyyglxt.dao.IndustrialDevelopTecSerOrgMapper;
import com.zyyglxt.dao.OrganizationDOMapper;
import com.zyyglxt.dataobject.FileDO;
import com.zyyglxt.dataobject.IndustrialDevelopTecSerOrg;
import com.zyyglxt.dataobject.OrganizationDO;
import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopTecSerOrgDto;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.IFileService;
import com.zyyglxt.service.IndustrialDevelopTecSerOrgService;
import com.zyyglxt.util.UsernameUtil;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
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
    OrganizationDOMapper organizationDOMapper;

    @Resource
    private IFileService fileService;

    @Resource
    UsernameUtil usernameUtil;

    @Autowired
    ValidatorImpl validator;

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
        ValidatorResult result = validator.validate(record);
        if (result.isHasErrors()) {
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        OrganizationDO organizationDO = organizationDOMapper.selectByOrgName(record.getName());
        if (organizationDO == null){
            return -1;
        } else {
            record.setOrgCode(organizationDO.getOrgCode());
            return industrialDevelopTecSerOrgMapper.insertSelective(record);
        }
    }

    @Override
    public IndustrialDevelopTecSerOrg selectByPrimaryKey(Integer itemid,String itemcode) {
        return industrialDevelopTecSerOrgMapper.selectByPrimaryKey(itemid,itemcode);
    }

    @Override
    public IndustrialDevelopTecSerOrgDto selectByOrgcode() {
        IndustrialDevelopTecSerOrgDto industrialDevelopTecSerOrgDto = new IndustrialDevelopTecSerOrgDto();
        IndustrialDevelopTecSerOrg industrialDevelopTecSerOrg = industrialDevelopTecSerOrgMapper.selectByOrgcode(usernameUtil.getOrgCode());
        BeanUtils.copyProperties(industrialDevelopTecSerOrg,industrialDevelopTecSerOrgDto);
        FileDO fileDO = fileService.selectFileByDataCode(industrialDevelopTecSerOrg.getItemcode());
        String filePath = !ObjectUtils.allNotNull(fileDO) ? "已经损坏了" : fileDO.getFilePath() ;
        industrialDevelopTecSerOrgDto.setFilePath(filePath);
        return industrialDevelopTecSerOrgDto;
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
    public List<IndustrialDevelopTecSerOrgDto> selectAll(String type) {
        List<IndustrialDevelopTecSerOrg> list = industrialDevelopTecSerOrgMapper.selectAll(type);
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

    @Override
    public IndustrialDevelopTecSerOrg selectByOrgNameAndCode(String orgName, String orgCode){
        IndustrialDevelopTecSerOrg developTecSerOrg = industrialDevelopTecSerOrgMapper.selectByOrgNameAndCode(orgName, orgCode);
        return developTecSerOrg;
    }
}
