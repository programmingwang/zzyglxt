package com.zyyglxt.service.impl;

import com.zyyglxt.dao.IndustrialDevelopTopicDOMapper;
import com.zyyglxt.dao.UserRoleRefDOMapper;
import com.zyyglxt.dataobject.IndustrialDevelopExpertRefDO;
import com.zyyglxt.dataobject.IndustrialDevelopTopicDO;
import com.zyyglxt.dataobject.IndustrialDevelopTopicDOKey;
import com.zyyglxt.dataobject.UserRoleRefDO;
import com.zyyglxt.dataobject.validation.ValidationGroups;
import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopTopicDODto;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.IExmaineService;
import com.zyyglxt.service.IIndustrialDevelopTopicService;
import com.zyyglxt.util.DateUtils;
import com.zyyglxt.util.UUIDUtils;
import com.zyyglxt.util.UsernameUtil;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * @Author lrt
 * @Date 2020/10/29 15:53
 * @Version 1.0
 **/
@Service
public class IndustrialDevelopTopicServiceImpl implements IIndustrialDevelopTopicService {

    @Resource
    IndustrialDevelopTopicDOMapper developTopicDOMapper;

    @Resource
    UserRoleRefDOMapper userRoleRefDOMapper;

    @Resource
    ValidatorImpl validator;

    @Autowired
    UsernameUtil usernameUtil;

    @Override
    public void addTopic(IndustrialDevelopTopicDO record) {
        record.setProjectNo("——");
        record.setApplicationDate(DateUtils.getYMD());
        record.setCreater(usernameUtil.getOperateUser());
        record.setUpdater(usernameUtil.getOperateUser());
        record.setItemcreateat(DateUtils.getDate());
        ValidatorResult result = validator.validate(record, ValidationGroups.Insert.class);
        if (result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        if (record.getItemcode() == null || record.getItemcode().isEmpty()){
            record.setItemcode(UUIDUtils.getUUID());
        }
        developTopicDOMapper.insertSelective(record);
    }

    @Override
    public void delTopic(IndustrialDevelopTopicDOKey key) {
        ValidatorResult result = validator.validate(key,ValidationGroups.UpdateOrDelete.class);
        if (result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        developTopicDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    public void updTopic(IndustrialDevelopTopicDO record) {
        ValidatorResult result = validator.validate(record,ValidationGroups.UpdateOrDelete.class);
        if (result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setUpdater(usernameUtil.getOperateUser());
        developTopicDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public List<IndustrialDevelopTopicDODto> getTopics(List<String> examineStatus) {
        List<IndustrialDevelopTopicDODto> topicDOList = new ArrayList<>();
        for (String status : examineStatus) {
            topicDOList.addAll(developTopicDOMapper.selectAll(status));
        }
        return topicDOList;
    }

    @Override
    public List<IndustrialDevelopTopicDO> getStatus(String code) {
        return developTopicDOMapper.selectByPrimaryKey(code);
    }

    @Override
    public IndustrialDevelopTopicDO getTopic(String topicCode) {
        return developTopicDOMapper.selectByItemCode(topicCode);
    }

    @Override
    public int changeStatus(IndustrialDevelopTopicDOKey key, String status) {
        return developTopicDOMapper.changeStatus(key, status);
    }

    @Override
    public int changeExamineStatus(IndustrialDevelopTopicDOKey key, String examineStatus) {
        return developTopicDOMapper.changeExamineStatus(key, examineStatus);
    }

    @Override
    public List<IndustrialDevelopTopicDODto> selectByUserCode(String userCode) {
        return developTopicDOMapper.selectByUserCode(userCode);
    }

    @Override
    public List<IndustrialDevelopTopicDODto> selectByCompany(String company) {
        return developTopicDOMapper.selectByCompany(company);
    }

    @Override
    public IndustrialDevelopTopicDO maxProjectNO() {
        return developTopicDOMapper.maxProjectNO();
    }

    @Override
    public List<UserRoleRefDO> getPlatRole() {
        return userRoleRefDOMapper.getPlatRole();
    }

    @Override
    public List<IndustrialDevelopTopicDO> getAll(List<String> examineStatus) {
        List<IndustrialDevelopTopicDO> topicDOList = new ArrayList<>();
        for (String status : examineStatus) {
            topicDOList.addAll(developTopicDOMapper.getAll(status));
        }
        return topicDOList;
    }

}
