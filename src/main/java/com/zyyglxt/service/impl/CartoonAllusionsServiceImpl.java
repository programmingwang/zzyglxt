package com.zyyglxt.service.impl;

import com.zyyglxt.dao.ChineseCulturalDOMapper;
import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.ICartoonAllusionsService;
import com.zyyglxt.util.DOKeyAndValidateUtil;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/10/29 19:34
 * Version: 1.0
 */
@Service
public class CartoonAllusionsServiceImpl implements ICartoonAllusionsService {
    @Resource
    private ChineseCulturalDOMapper chineseCulturalDOMapper;

    @Autowired
    private ValidatorImpl validator;

    @Override
    public ChineseCulturalDO getCartoonAllusions(ChineseCulturalDOKey key) {
        return chineseCulturalDOMapper.selectByPrimaryKey(key,"漫画典故");
    }

    @Override
    public List<ChineseCulturalDO> getCartoonAllusionsList() {
        return chineseCulturalDOMapper.selectChineseCulturalList("漫画典故");
    }

    @Override
    @Transactional
    public int addCartoonAllusions(ChineseCulturalDO record) throws BusinessException {
    ValidatorResult result = validator.validate(record);
    if(result.isHasErrors()){
        throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
    }
        record.setCreater("");
        record.setUpdater("");
        record.setChineseCulturalType("漫画典故");
        return chineseCulturalDOMapper.insertSelective(record);
    }

    @Override
    @Transactional
    public int removeCartoonAllusions(ChineseCulturalDOKey key) {
        return chineseCulturalDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    @Transactional
    public int updateCartoonAllusions(ChineseCulturalDO record) throws BusinessException {
        return DOKeyAndValidateUtil.updateUtil(record, validator, chineseCulturalDOMapper);
    }

    @Override
    public int changeCartoonAllusionsStatus(ChineseCulturalDOKey key, String chineseCulturalStatus) {
        return chineseCulturalDOMapper.changeStatusByPrimaryKeySelective(key,chineseCulturalStatus);
    }
}
