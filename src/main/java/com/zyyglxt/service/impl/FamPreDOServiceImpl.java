package com.zyyglxt.service.impl;

import com.zyyglxt.dao.FamPreDOMapper;
import com.zyyglxt.dataobject.FamPreDO;
import com.zyyglxt.dataobject.FamPreDOKey;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.FamPreDOService;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/10/31 12:11
 */
@Service
public class FamPreDOServiceImpl implements FamPreDOService {
    @Resource
    private FamPreDOMapper famPreDOMapper;
    @Autowired
    private ValidatorImpl validator;
    @Transactional
    @Override
    /*历史名方添加数据*/
    public int insertSelective(FamPreDO record) throws BusinessException {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setItemcode(UUID.randomUUID().toString());
        record.setItemcreateat(new Date());
        return famPreDOMapper.insertSelective(record);
    }
    @Transactional
    @Override
    public int deleteByPrimaryKey(FamPreDOKey key) {
        return  famPreDOMapper.deleteByPrimaryKey(key);
    }
    @Transactional
    @Override
    public int updateByPrimaryKeySelective(FamPreDO record) throws BusinessException {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setItemupdateat(new Date());
        return famPreDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public FamPreDO selectByPrimaryKey(FamPreDOKey key) {
        return famPreDOMapper.selectByPrimaryKey(key);
    }

    @Override
    public List<FamPreDO> selectAllFamPre() {
        return famPreDOMapper.selectAllFamPre();
    }
     /*点击浏览次数*/
    @Override
    public int increaseVisitNumFamPre(FamPreDOKey key) {
        famPreDOMapper.updateVisitNumFamPre(key);
        return 0;
    }
}
