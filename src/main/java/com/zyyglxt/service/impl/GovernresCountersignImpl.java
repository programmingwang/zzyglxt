package com.zyyglxt.service.impl;

import com.zyyglxt.dao.GovernresCountersignMapper;
import com.zyyglxt.dataobject.GovernresCountersign;
import com.zyyglxt.service.IGovernresCountersignService;
import com.zyyglxt.validator.ValidatorImpl;
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



    @Override
    public int deleteByPrimaryKey(String itemcode) {
        return governresCountersignMapper.deleteByPrimaryKey(itemcode);
    }


    @Override
    public int insertSelective(GovernresCountersign record) {
        record.setItemcode(UUID.randomUUID().toString());
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
    public List<GovernresCountersign> selectAll() {
        return governresCountersignMapper.selectAll();
    }

}
