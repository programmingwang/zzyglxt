package com.zyyglxt.service.impl;


import com.zyyglxt.dao.GovernresAdviceMapper;
import com.zyyglxt.dataobject.GovernresAdvice;
import com.zyyglxt.service.IGovernresAdviceService;
import com.zyyglxt.validator.ValidatorImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.UUID;

@Service
public class GovernresAdviceImpl implements IGovernresAdviceService {

    @Resource
    GovernresAdviceMapper governresAdviceMapper;

    @Resource
    ValidatorImpl validator;

    @Override
    public int deleteByPrimaryKey(Integer itemid, String itemcode) {
        return governresAdviceMapper.deleteByPrimaryKey(itemid,itemcode);
    }

    @Override
    public int insertSelective(GovernresAdvice record) {
        record.setItemcode(UUID.randomUUID().toString());
        return governresAdviceMapper.insertSelective(record);
    }

    @Override
    public GovernresAdvice selectByPrimaryKey(Integer itemid, String itemcode) {
        return governresAdviceMapper.selectByPrimaryKey(itemid,itemcode);
    }

    @Override
    public int updateByPrimaryKeySelective(GovernresAdvice record) {
        return governresAdviceMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public List<GovernresAdvice> selectAll() {
        return governresAdviceMapper.selectAll();
    }
}
