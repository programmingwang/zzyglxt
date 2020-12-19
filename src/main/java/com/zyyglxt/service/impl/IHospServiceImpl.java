package com.zyyglxt.service.impl;

import com.zyyglxt.dao.HospDOMapper;
import com.zyyglxt.dataobject.HospDO;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.HospService;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;

/**
 * @Author nongcn
 * @Date 2020/11/22 18:41
 * @Version 1.0
 */
@Service
public class IHospServiceImpl implements HospService {

    @Autowired
    ValidatorImpl validator;
    @Resource
    HospDOMapper hospDOMapper;

    @Override
    public int addHosp(HospDO hospDO) {
        ValidatorResult result = validator.validate(hospDO);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        hospDO.setItemcreateat(new Date());
        hospDO.setItemupdateat(new Date());
        hospDO.setCreater(hospDO.getUsername());
        hospDO.setUpdater(hospDO.getUsername());

        return hospDOMapper.insertSelective(hospDO);
    }
}
