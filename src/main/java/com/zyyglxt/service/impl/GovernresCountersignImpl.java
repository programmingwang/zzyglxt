package com.zyyglxt.service.impl;

import com.zyyglxt.dao.GovernresAdviceMapper;
import com.zyyglxt.dao.GovernresCountersignMapper;
import com.zyyglxt.dataobject.GovernresAdvice;
import com.zyyglxt.dataobject.GovernresCountersign;
import com.zyyglxt.service.IGovernresCountersignService;
import com.zyyglxt.validator.ValidatorImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
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
        GovernresAdvice governresAdvice=new GovernresAdvice();
        String itemCode=UUID.randomUUID().toString();
        record.setItemcode(itemCode);
        governresAdvice.setItemcode(UUID.randomUUID().toString());
        governresAdvice.setDataCode(itemCode);
        governresAdviceMapper.insertSelective(governresAdvice);
        return governresCountersignMapper.insertSelective(record);
    }


    @Override
    public GovernresCountersign selectByPrimaryKey(String itemcode) {
        return governresCountersignMapper.selectByPrimaryKey(itemcode);
    }

    @Override
    public int updateByPrimaryKeySelective(GovernresCountersign record) {
        return governresCountersignMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public List<GovernresCountersign> selectAll(String status) {
        return governresCountersignMapper.selectAll(status);
    }

}
