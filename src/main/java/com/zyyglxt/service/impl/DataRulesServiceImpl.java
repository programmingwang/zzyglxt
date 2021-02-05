package com.zyyglxt.service.impl;

import com.zyyglxt.dao.DataDOMapper;
import com.zyyglxt.dataobject.DataDO;
import com.zyyglxt.dataobject.DataDOKey;
import com.zyyglxt.dto.DataDto;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.IDataRulesService;
import com.zyyglxt.util.UsernameUtil;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * @author qjc
 * @version 1.0
 * @date 2021/2/4 14:03
 */
@Service
public class DataRulesServiceImpl implements IDataRulesService {

    @Resource
    private DataDOMapper dataDOMapper;
    @Autowired
    private ValidatorImpl validator;
    @Resource
    private UsernameUtil usernameUtil;

    @Override
    public int insert(DataDO record) {
        ValidatorResult result = validator.validate(record);
        if (result.isHasErrors()) {
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setItemcreateat(new Date());
        record.setCreater(usernameUtil.getOperateUser());
        record.setUpdater(usernameUtil.getOperateUser());
        return dataDOMapper.insertSelective(record);
    }

    @Override
    public int delete(DataDOKey dataDOKey) {
        ValidatorResult result = validator.validate(dataDOKey);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        return dataDOMapper.deleteByPrimaryKey(dataDOKey);
    }

    @Override
    public int update(DataDO record) {
        ValidatorResult result = validator.validate(record);
        if (result.isHasErrors()) {
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setUpdater(usernameUtil.getOperateUser());
        return dataDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public List<DataDto> selectRules(String dataStatus) {
        return dataDOMapper.selectByAllData("规章制度", dataStatus);
    }

    @Override
    public List<String> selectForMainPage() {
        return dataDOMapper.selectAllForMainPage("规章制度");
    }
}
