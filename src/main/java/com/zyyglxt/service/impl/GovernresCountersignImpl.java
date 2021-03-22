package com.zyyglxt.service.impl;

import com.zyyglxt.dao.GovernresAdviceMapper;
import com.zyyglxt.dao.GovernresCountersignMapper;
import com.zyyglxt.dataobject.GovernresAdvice;
import com.zyyglxt.dataobject.GovernresCountersign;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.IGovernresCountersignService;
import com.zyyglxt.util.DateUtils;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.UUID;

@Service
public class GovernresCountersignImpl implements IGovernresCountersignService {

    @Resource
    GovernresCountersignMapper governresCountersignMapper;

    @Resource
    ValidatorImpl validator;

    @Resource
    GovernresAdviceMapper governresAdviceMapper;

    @Override
    public int deleteByPrimaryKey(String itemcode) {
        return governresCountersignMapper.deleteByPrimaryKey(itemcode);
    }


    @Override
    public int insertSelective(GovernresCountersign record) {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        GovernresAdvice governresAdvice=new GovernresAdvice();
        String itemCode=UUID.randomUUID().toString();
        record.setItemcode(itemCode);
        governresAdvice.setItemcode(UUID.randomUUID().toString());
        governresAdvice.setDataCode(itemCode);
        String creater="科员";
        governresAdvice.setInitial(creater);
        governresAdvice.setInitialDate(DateUtils.getDate());
        governresAdviceMapper.insertSelective(governresAdvice);
        return governresCountersignMapper.insertSelective(record);
    }


    @Override
    public GovernresCountersign selectByPrimaryKey(String itemcode) {
        return governresCountersignMapper.selectByPrimaryKey(itemcode);
    }

    @Override
    public int updateByPrimaryKeySelective(GovernresCountersign record) {
        ValidatorResult result = validator.validate(record);
        if(!StringUtils.isBlank(record.getParment())){
            if(result.isHasErrors()){
                throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
            }
        }
        return governresCountersignMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public List<GovernresCountersign> selectAll(String status) {
        return governresCountersignMapper.selectAll(status);
    }

}
