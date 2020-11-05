package com.zyyglxt.service.impl;

import com.zyyglxt.dao.ChineseCulturalDOMapper;
import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.util.DateUtils;
import com.zyyglxt.util.UUIDUtils;
import com.zyyglxt.service.ICulturalVenuesService;
import com.zyyglxt.util.DOKeyAndValidateUtil;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/10/29 19:14
 * Version: 1.0
 */
//文化场馆
@Service
public class CulturalVenuesServiceImpl implements ICulturalVenuesService {
    @Resource
    private ChineseCulturalDOMapper chineseCulturalDOMapper;

    @Autowired
    private ValidatorImpl validator;

    @Override
    public ChineseCulturalDO getCulturalVenues(ChineseCulturalDOKey key) {
        return chineseCulturalDOMapper.selectByPrimaryKey(key,"文化场馆");
    }

    @Override
    public List<ChineseCulturalDO> getCulturalVenuesList() {
        return chineseCulturalDOMapper.selectChineseCulturalList("文化场馆");
    }

    @Override
    @Transactional
    public int addCulturalVenues(ChineseCulturalDO record) {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setCreater("");
        record.setItemcreateat(DateUtils.getDate());
        record.setUpdater("");
        record.setChineseCulturalType("文化场馆");
        record.setChineseCulturalStatus("待上架");
        //如果前台没有插入图片或者附件，就自己生成uuid
        if(record.getItemcode() == null){
            record.setItemcode(UUIDUtils.getUUID());
        }
        return chineseCulturalDOMapper.insertSelective(record);
    }

    @Override
    @Transactional
    public int removeCulturalVenues(ChineseCulturalDOKey key) {
        return chineseCulturalDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    @Transactional
    public int updateCulturalVenues(ChineseCulturalDO record)  {
        return DOKeyAndValidateUtil.updateUtil(record, validator, chineseCulturalDOMapper);
    }

    @Override
    public int changeCulturalVenuesStatus(ChineseCulturalDOKey key, String chineseCulturalStatus) {
        return chineseCulturalDOMapper.changeStatusByPrimaryKeySelective(key,chineseCulturalStatus);
    }
}
