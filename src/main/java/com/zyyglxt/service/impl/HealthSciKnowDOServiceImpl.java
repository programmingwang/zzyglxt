package com.zyyglxt.service.impl;

import com.zyyglxt.dao.HealthSciKnowDOMapper;
import com.zyyglxt.dataobject.HealthCareFamPreDO;
import com.zyyglxt.dataobject.HealthSciKnowDO;
import com.zyyglxt.dataobject.HealthSciKnowDOKey;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.HealthSciKnowDOService;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/10/29 14:28
 */
@Service
public class HealthSciKnowDOServiceImpl implements HealthSciKnowDOService {
    @Resource
    private HealthSciKnowDOMapper healthSciKnowDOMapper;
    @Autowired
    private ValidatorImpl validator;
    @Transactional
    @Override
    public int insertSelective(HealthSciKnowDO record) throws BusinessException {
        /*Date data=new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            data = df.parse(df.format(data));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        record.setItemcreateat(data);*/
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setItemcode(UUID.randomUUID().toString());
        record.setItemcreateat(new Date());
        return healthSciKnowDOMapper.insertSelective(record);
    }
    @Transactional
    @Override
    public int deleteByPrimaryKey(HealthSciKnowDOKey key) {
        healthSciKnowDOMapper.deleteByPrimaryKey(key);
        return 0;
    }
    @Transactional
    @Override
    public int updateByPrimaryKeySelective(HealthSciKnowDO record) throws BusinessException {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setItemupdateat(new Date());
        return healthSciKnowDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public HealthSciKnowDO selectByPrimaryKey(HealthSciKnowDOKey key) {
        return healthSciKnowDOMapper.selectByPrimaryKey(key);
    }
    /*查询所有科普知识数据*/
    @Override
    public List<HealthSciKnowDO> selectAllHealthSciKnow(List<String> scienceKnowledgeStatus) {
        List<HealthSciKnowDO> healthSciKnowDOList=new ArrayList<>();
        for(String SciKnowStatus: scienceKnowledgeStatus){
            healthSciKnowDOList.addAll(healthSciKnowDOMapper.selectAllHealthSciKnow(SciKnowStatus));
        }
        return healthSciKnowDOList;
    }

    @Override
    public int updateVisitNumHealthSciKnow(HealthSciKnowDOKey key) {
        healthSciKnowDOMapper.updateVisitNumHealthSciKnow(key);
        return 0;
    }
      /*科普知识数据状态*/
    @Override
    public int changeStatusToSciKnow(HealthSciKnowDOKey key, String scienceKnowledgeStatus) {
        return healthSciKnowDOMapper.changeStatusToSciKnow(key,scienceKnowledgeStatus);
    }
}
