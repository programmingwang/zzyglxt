package com.zyyglxt.service.impl;

import com.zyyglxt.dao.ChineseCulturalDOMapper;
import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;
import com.zyyglxt.dto.UserSessionDto;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.util.DateUtils;
import com.zyyglxt.util.UUIDUtils;
import com.zyyglxt.service.ITravelService;
import com.zyyglxt.util.DOKeyAndValidateUtil;
import com.zyyglxt.util.UsernameUtil;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/10/29 19:41
 * Version: 1.0
 */
@Service
public class TravelServiceImpl implements ITravelService {
    @Resource
    private ChineseCulturalDOMapper chineseCulturalDOMapper;

    @Autowired
    private ValidatorImpl validator;

    @Autowired
    private UsernameUtil usernameUtil;

    @Override
    public ChineseCulturalDO getTravel(ChineseCulturalDOKey key) {
        return chineseCulturalDOMapper.selectByPrimaryKey(key,"健康旅游");
    }

    @Override
    public List<ChineseCulturalDO> getTravelList(List<String> chineseCulturalStatus) {
        List<ChineseCulturalDO> chineseCulturalDOList = new ArrayList<>();
        for (String culturalStatus : chineseCulturalStatus) {
            chineseCulturalDOList.addAll(chineseCulturalDOMapper.selectChineseCulturalList("健康旅游", culturalStatus));
        }
        return chineseCulturalDOList;
    }

    @Override
    @Transactional
    public int addTravel(ChineseCulturalDO record) {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setCreater(usernameUtil.getOperateUser());
        record.setItemcreateat(DateUtils.getDate());
        record.setUpdater(usernameUtil.getOperateUser());
        record.setChineseCulturalType("健康旅游");
        //如果前台没有插入图片或者附件，就自己生成uuid
        if(record.getItemcode() == null){
            record.setItemcode(UUIDUtils.getUUID());
        }
        return chineseCulturalDOMapper.insertSelective(record);
    }

    @Override
    @Transactional
    public int removeTravel(ChineseCulturalDOKey key) {
        return chineseCulturalDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    @Transactional
    public int updateTravel(ChineseCulturalDO record) {
        return DOKeyAndValidateUtil.updateUtil(record, validator, chineseCulturalDOMapper,usernameUtil);
    }

    @Override
    public int changeTravelStatus(ChineseCulturalDOKey key, String chineseCulturalStatus) {
        return chineseCulturalDOMapper.changeStatusByPrimaryKeySelective(key,chineseCulturalStatus);
    }

}
