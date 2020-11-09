package com.zyyglxt.service.impl;

import com.zyyglxt.dao.HospDOMapper;
import com.zyyglxt.dataobject.HospDO;
import com.zyyglxt.dataobject.HospDOKey;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.IHospService;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/10/29 10:22
 */
@Service
public class HospServiceImpl implements IHospService {
    @Resource
    HospDOMapper hospDOMapper;
    @Autowired
    private ValidatorImpl validator;

    @Override
    public int addHosp(HospDO hospDO) {
        ValidatorResult result = validator.validate(hospDO);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        hospDO.setItemcreateat(new Date());
        return hospDOMapper.insertSelective(hospDO);
    }

    @Override
    public int updateHosp(HospDO hospDO) {
        ValidatorResult result = validator.validate(hospDO);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        return hospDOMapper.updateByPrimaryKeySelective(hospDO);
    }

    @Override
    public int deleteHosp(HospDOKey hospDOKey) {
        ValidatorResult result = validator.validate(hospDOKey);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        return hospDOMapper.deleteByPrimaryKey(hospDOKey);
    }

    @Override
    public List<HospDO> selectAllHosp() {
        return hospDOMapper.selectAllHosp();
    }

    /*
    搜索关键字，包括搜名称，等级，市，县，地址
     */
    @Override
    public List<HospDO> searchHosp(String keyWord) {
        if(keyWord.isEmpty()){
            throw new BusinessException("关键字不能为空", EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        return hospDOMapper.searchHosp(keyWord);
    }

    @Override
    public List<HospDO> top5Hosp() {
        return hospDOMapper.top5Hosp();
    }

}
