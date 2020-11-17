package com.zyyglxt.service.impl;

import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.util.UsernameUtil;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.annotation.Resource;
import com.zyyglxt.dao.IndustrialDevelopSaleDrugMapper;
import com.zyyglxt.dataobject.IndustrialDevelopSaleDrug;
import com.zyyglxt.service.IndustrialDevelopSaleDrugService;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
   *@Author lrt
   *@Date 2020/11/6 20:00
   *@Version 1.0
**/
@Service
public class IndustrialDevelopSaleDrugServiceImpl implements IndustrialDevelopSaleDrugService{

    @Resource
    private IndustrialDevelopSaleDrugMapper industrialDevelopSaleDrugMapper;
    @Resource
    UsernameUtil usernameUtil;
    @Autowired
    private ValidatorImpl validator;
   /*删除*/
    @Transactional
    @Override

    public int deleteByPrimaryKey(Integer itemid,String itemcode) {
        return industrialDevelopSaleDrugMapper.deleteByPrimaryKey(itemid,itemcode);
    }
/*添加无判断*/
    @Transactional
    @Override
    public int insert(IndustrialDevelopSaleDrug record) throws BusinessException {
        return industrialDevelopSaleDrugMapper.insert(record);
    }
/*添加有判断*/
    @Transactional
    @Override
    public int insertSelective(IndustrialDevelopSaleDrug record) {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setItemcode(UUID.randomUUID().toString());
        record.setItemcreateat(new Date());
        record.setStatus("0");
        record.setCreater(usernameUtil.getOperateUser());
        record.setUpdater(usernameUtil.getOperateUser());
        record.setOrgCode(usernameUtil.getOrgCode());
        return industrialDevelopSaleDrugMapper.insertSelective(record);
    }
/*通过id和code查询记录*/
    @Transactional
    @Override
    public IndustrialDevelopSaleDrug selectByPrimaryKey(Integer itemid,String itemcode) {
        return industrialDevelopSaleDrugMapper.selectByPrimaryKey(itemid,itemcode);
    }
/*数据更新*/
    @Transactional
    @Override
    public int updateByPrimaryKeySelective(IndustrialDevelopSaleDrug record) throws BusinessException {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setItemupdateat(new Date());
        record.setUpdater(usernameUtil.getOperateUser());
        return industrialDevelopSaleDrugMapper.updateByPrimaryKeySelective(record);
    }
    @Transactional
    @Override
    public int updateByPrimaryKey(IndustrialDevelopSaleDrug record) {
        return industrialDevelopSaleDrugMapper.updateByPrimaryKey(record);
    }

    @Override
    public List< IndustrialDevelopSaleDrug> selectAllSaleDrug( List<String> status) {
//        return industrialDevelopSaleDrugMapper.selectAllSaleDrug(status);
       List<IndustrialDevelopSaleDrug> industrialDevelopSaleDrugList = new ArrayList<>();
        for (String Status : status) {
            industrialDevelopSaleDrugList.addAll(industrialDevelopSaleDrugMapper.selectAllSaleDrug (Status));
        }
        return industrialDevelopSaleDrugList;
    }

    @Override
    public int changeStatusToSaleDrug(IndustrialDevelopSaleDrug key, String status) {
        return industrialDevelopSaleDrugMapper.changeStatusToSaleDrug(key,status);
    }
}
