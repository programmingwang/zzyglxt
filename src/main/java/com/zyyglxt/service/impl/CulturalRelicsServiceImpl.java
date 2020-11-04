package com.zyyglxt.service.impl;

import com.zyyglxt.dao.ChineseCulturalDOMapper;
import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.ICulturalRelicsService;
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
 * Date: 2020/10/29 19:14
 * Version: 1.0
 */
//文化古迹
@Service
public class CulturalRelicsServiceImpl implements ICulturalRelicsService {
    @Resource
    private ChineseCulturalDOMapper chineseCulturalDOMapper;

    @Autowired
    private ValidatorImpl validator;

    @Override
    public ChineseCulturalDO getCulturalRelics(ChineseCulturalDOKey key) {
        return chineseCulturalDOMapper.selectByPrimaryKey(key,"文化古迹");
    }

    @Override
    public List<ChineseCulturalDO> getCulturalRelicsList() {
        return chineseCulturalDOMapper.selectChineseCulturalList("文化古迹");

    }

    @Override
    @Transactional
    public int addCulturalRelics(ChineseCulturalDO record) throws BusinessException {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setCreater("");
        record.setUpdater("");
        record.setChineseCulturalType("文化古迹");
        return chineseCulturalDOMapper.insertSelective(record);
    }

    @Override
    @Transactional
    public int removeCulturalRelics(ChineseCulturalDOKey key) {
        return chineseCulturalDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    @Transactional
    public int updateCulturalRelics(ChineseCulturalDO record) throws BusinessException {
        return DOKeyAndValidateUtil.updateUtil(record, validator, chineseCulturalDOMapper);
    }

    @Override
    public int changeCulturalRelics(ChineseCulturalDOKey key, String chineseCulturalStatus) {
        return chineseCulturalDOMapper.changeStatusByPrimaryKeySelective(key,chineseCulturalStatus);
    }

}
