package com.zyyglxt.service.impl;

import com.zyyglxt.dao.HealthCareFamPreDOMapper;
import com.zyyglxt.dataobject.FamPreDO;
import com.zyyglxt.dataobject.HealthCareFamPreDO;
import com.zyyglxt.dataobject.HealthCareFamPreDOKey;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.HealthCareFamPreDOService;
import com.zyyglxt.util.UsernameUtil;
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
 * @time 2020/10/29 14:25
 */
@Service
public class HealthCareFamPreDOServiceImpl implements HealthCareFamPreDOService {
    @Resource
     private HealthCareFamPreDOMapper healthCareFamPreDOMapper;
    @Autowired
    private ValidatorImpl validator;
    @Autowired
    private UsernameUtil usernameUtil;
    @Transactional
    /*
      历史名方、国医话健康添加、删除、修改、查询实现方法
  **/
    @Override
    public int insertSelective(HealthCareFamPreDO record) throws BusinessException {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setItemcode(UUID.randomUUID().toString());
        record.setStatus("0");
        record.setItemcreateat(new Date());
        record.setCreater(usernameUtil.getOperateUser());
        record.setUpdater(usernameUtil.getOperateUser());
        return healthCareFamPreDOMapper.insertSelective(record);
    }
    @Transactional
    @Override
    public int deleteByPrimaryKey(HealthCareFamPreDOKey key) {
        healthCareFamPreDOMapper.deleteByPrimaryKey(key);
        return 0;
    }
    @Transactional
    @Override
    public int updateByPrimaryKeySelective(HealthCareFamPreDO record) throws BusinessException {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setItemupdateat(new Date());
        record.setUpdater(usernameUtil.getOperateUser());
        return healthCareFamPreDOMapper.updateByPrimaryKeySelective(record);
    }
    @Override
    public HealthCareFamPreDO selectByPrimaryKey(HealthCareFamPreDOKey key) {
        return healthCareFamPreDOMapper.selectByPrimaryKey(key);
    }
    /*查询国医话健康所有数据*/
    @Override
    public List<HealthCareFamPreDO> selectAllHealthCareFamPre(List<String> status) {
        List<HealthCareFamPreDO> healthCareFamPreDOList=new ArrayList<>();
        for(String careFamStatus: status){
            healthCareFamPreDOList.addAll(healthCareFamPreDOMapper.selectAllHealthCareFamPre(careFamStatus));
        }
        return healthCareFamPreDOList;
    }
   /*国医话健康数据状态*/
    @Override
    public int changeStatusToCareFam(HealthCareFamPreDOKey key, String status) {
        return healthCareFamPreDOMapper.changeStatusToCareFam(key,status);
    }

    @Override
    public int updateVisitNumHealthCareFamPre(HealthCareFamPreDOKey key) {
         healthCareFamPreDOMapper.updateVisitNumHealthCareFamPre(key);
        return 0;
    }
}
