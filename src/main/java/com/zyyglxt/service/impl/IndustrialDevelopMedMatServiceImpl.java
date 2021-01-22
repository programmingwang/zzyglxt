package com.zyyglxt.service.impl;

import com.zyyglxt.dto.StatusDto;
import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopMedMatDto;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.util.UsernameUtil;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.annotation.Resource;
import com.zyyglxt.dao.IndustrialDevelopMedMatMapper;
import com.zyyglxt.dataobject.IndustrialDevelopMedMat;
import com.zyyglxt.service.IndustrialDevelopMedMatService;

import java.util.Date;
import java.util.List;

/**
   *@Author lrt
   *@Date 2020/11/6 20:00
   *@Version 1.0
**/
@Service
public class IndustrialDevelopMedMatServiceImpl implements IndustrialDevelopMedMatService{

    @Resource
    private IndustrialDevelopMedMatMapper industrialDevelopMedMatMapper;
    @Autowired
    private ValidatorImpl validator;
    @Autowired
    private UsernameUtil usernameUtil;

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
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setOrgCode(usernameUtil.getOrgCode());
        record.setCreater(usernameUtil.getOperateUser());
        record.setItemcreateat(new Date());
        record.setUpdater(usernameUtil.getOperateUser());

        return industrialDevelopMedMatMapper.insertSelective(record);
    }

    @Override
    public IndustrialDevelopMedMat selectByPrimaryKey(Integer itemid,String itemcode) {
        return industrialDevelopMedMatMapper.selectByPrimaryKey(itemid,itemcode);
    }

    @Override
    public int updateByPrimaryKeySelective(IndustrialDevelopMedMat record) {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setUpdater(usernameUtil.getOperateUser());
        return industrialDevelopMedMatMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int updateByPrimaryKey(IndustrialDevelopMedMat record) {
        return industrialDevelopMedMatMapper.updateByPrimaryKey(record);
    }

    /*通过机构code找药材*/
    @Override
    public List<IndustrialDevelopMedMatDto> selectMedMatByORGCode() {
        return industrialDevelopMedMatMapper.selectMedMatByORGCode(usernameUtil.getOrgCode());
    }

    @Override
    public int updateStatus(StatusDto statusDto) {
        ValidatorResult result = validator.validate(statusDto);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        statusDto.setUpdater(usernameUtil.getOperateUser());
        return industrialDevelopMedMatMapper.updateStatusByPrimaryKey(statusDto);
    }

}
