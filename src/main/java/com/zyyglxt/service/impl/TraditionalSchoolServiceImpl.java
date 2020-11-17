package com.zyyglxt.service.impl;

import com.zyyglxt.dao.CulturalResourcesDOMapper;
import com.zyyglxt.dataobject.CulturalResourcesDO;
import com.zyyglxt.dataobject.CulturalResourcesDOKey;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.util.DateUtils;
import com.zyyglxt.util.UUIDUtils;
import com.zyyglxt.service.ITraditionalSchoolService;
import com.zyyglxt.util.UsernameUtil;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/10/29 19:03
 * Version: 1.0
 */
//中医流派
@Service
public class TraditionalSchoolServiceImpl implements ITraditionalSchoolService {
    @Resource
    private CulturalResourcesDOMapper culturalResourcesDOMapper;

    @Autowired
    private ValidatorImpl validator;

    @Autowired
    private UsernameUtil usernameUtil;

    @Override
    public CulturalResourcesDO getTraditionalSchool(CulturalResourcesDOKey key) {
        return culturalResourcesDOMapper.selectByPrimaryKey(key,"中医流派");
    }

    @Override
    public List<CulturalResourcesDO> getTraditionalSchoolList(List<String> chineseCulturalStatus) {
        List<CulturalResourcesDO> culturalResourcesDOList = new ArrayList<>();
        for (String culturalStatus : chineseCulturalStatus) {
            culturalResourcesDOList.addAll(culturalResourcesDOMapper.selectCulturalResourcesList("中医流派",culturalStatus));
        }
        return culturalResourcesDOList;
    }

    @Override
    @Transactional
    public int addTraditionalSchool(CulturalResourcesDO record)  {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setCreater(usernameUtil.getOperateUser());
        record.setItemcreateat(DateUtils.getDate());
        record.setUpdater(usernameUtil.getOperateUser());
        record.setChineseCulturalType("中医流派");
        record.setChineseCulturalStatus("0");
        //如果前台没有插入图片或者附件，就自己生成uuid
        if(record.getItemcode() == null){
            record.setItemcode(UUIDUtils.getUUID());
        }
        return culturalResourcesDOMapper.insertSelective(record);
    }

    @Override
    @Transactional
    public int removeTraditionalSchool(CulturalResourcesDOKey key) {
        return culturalResourcesDOMapper.deleteByPrimaryKey(key);

    }

    @Override
    @Transactional
    public int updateTraditionalSchool(CulturalResourcesDO record) {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setUpdater(usernameUtil.getOperateUser());
        record.setItemupdateat(new Date());
        return culturalResourcesDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int changeTraditionalSchoolStatus(CulturalResourcesDOKey key, String chineseCulturalStatus) {
        return culturalResourcesDOMapper.changeStatusByPrimaryKeySelective(key,chineseCulturalStatus);
    }
}
