package com.zyyglxt.service.impl;

import com.zyyglxt.dao.IndustrialDevelopCooExcDOMapper;
import com.zyyglxt.dataobject.HealthSciKnowDO;
import com.zyyglxt.dataobject.IndustrialDevelopCooExcDO;
import com.zyyglxt.dataobject.IndustrialDevelopCooExcDOKey;
import com.zyyglxt.dataobject.validation.ValidationGroups;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.IIndustrialDevelopCooService;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * @Author lrt
 * @Date 2020/10/29 14:25
 * @Version 1.0
 **/
@Service
public class IndustrialDevelopCooServiceImpl implements IIndustrialDevelopCooService {
    @Resource
    IndustrialDevelopCooExcDOMapper cooExcDOMapper;

    @Resource
    ValidatorImpl validator;

    public void addCooRecord(IndustrialDevelopCooExcDO record) {
        ValidatorResult result = validator.validate(record,ValidationGroups.Insert.class);
        if (result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        if (record.getItemcode() == null || record.getItemcode().isEmpty()){
            record.setItemcode(UUID.randomUUID().toString());
        }
        record.setItemcreateat(new Date());
        record.setItemupdateat(new Date());
        cooExcDOMapper.insertSelective(record);
    }

    @Override
    public void delCooRecord(IndustrialDevelopCooExcDOKey key) {
        ValidatorResult result = validator.validate(key,ValidationGroups.UpdateOrDelete.class);
        if (result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        cooExcDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    public void updCooRecord(IndustrialDevelopCooExcDO record) {
        ValidatorResult result = validator.validate(record,ValidationGroups.UpdateOrDelete.class);
        if (result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setItemupdateat(new Date());
        cooExcDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public void increaseVisitNum(IndustrialDevelopCooExcDOKey key) {
        cooExcDOMapper.updateVisitNumByItemidAndItemcode(key);
    }

    @Override
    public List<IndustrialDevelopCooExcDO> getCooRecord(int page, int page_size) {
        int start = (page - 1) * page_size;
        int end = page * page_size;
        return cooExcDOMapper.selectByPage(start, end);
    }

    @Override
    public List<IndustrialDevelopCooExcDO> getCooRecord(List<String> status) {
        List<IndustrialDevelopCooExcDO> industrialDevelopCooExcDOList=new ArrayList<>();
        for(String CooExcStatus: status){
            industrialDevelopCooExcDOList.addAll(cooExcDOMapper.selectAll(CooExcStatus));
        }
        return industrialDevelopCooExcDOList;
    }

    @Override
    public int changeStatusToCooExc(IndustrialDevelopCooExcDOKey key, String status) {
        return cooExcDOMapper.changeStatusToCooExc(key,status);
    }

}
