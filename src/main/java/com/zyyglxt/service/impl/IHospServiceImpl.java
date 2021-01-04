package com.zyyglxt.service.impl;

import com.zyyglxt.dao.HospDOMapper;
import com.zyyglxt.dao.OrganizationDOMapper;
import com.zyyglxt.dataobject.HospDO;
import com.zyyglxt.dataobject.OrganizationDO;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.HospService;
import com.zyyglxt.util.UsernameUtil;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

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

    @Resource
    OrganizationDOMapper organizationDOMapper;

    @Resource
    UsernameUtil usernameUtil;

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
        if (hospDO.getOrgCode().equals("0")){
            throw new BusinessException("非法请求",EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        if (hospDO.getHospitalAddressCity() != null){
            OrganizationDO updated = new OrganizationDO();
            updated.setOrgLocate(hospDO.getHospitalAddressCity());
            organizationDOMapper.updateByOrgCode(updated,hospDO.getOrgCode());
        }
        return hospDOMapper.insertSelective(hospDO);
    }

    @Override
    public int updateHosp(HospDO hospDO) {

        ValidatorResult result = validator.validate(hospDO);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        if (usernameUtil.getOrgCode().equals("0")){
            throw new BusinessException("非法请求",EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        if (hospDO.getHospitalAddressCity() != null){
            OrganizationDO updated = new OrganizationDO();
            updated.setOrgLocate(hospDO.getHospitalAddressCity());
            organizationDOMapper.updateByOrgCode(updated,usernameUtil.getOrgCode());
        }
        hospDO.setUpdater(usernameUtil.getOperateUser());
        return hospDOMapper.updateByPrimaryKeySelective(hospDO);
    }
}
