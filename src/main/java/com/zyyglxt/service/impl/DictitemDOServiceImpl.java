package com.zyyglxt.service.impl;

import com.zyyglxt.dao.DictitemDOMapper;
import com.zyyglxt.dataobject.DictDO;
import com.zyyglxt.dataobject.DictDOKey;
import com.zyyglxt.dataobject.DictitemDO;
import com.zyyglxt.dataobject.DictitemDOKey;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.permissionsUtil.DateUtils;
import com.zyyglxt.permissionsUtil.UUIDUtils;
import com.zyyglxt.service.IDictitemDOService;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class DictitemDOServiceImpl implements IDictitemDOService {
    @Resource
    private DictitemDOMapper dictitemDOMapper;

    @Autowired
    private DictitemDOServiceImpl dictitemDOService;

    @Autowired
    private ValidatorImpl validator;
    /*删除数据字典项*/
    @Override
    public int deleteByPrimaryKey(DictitemDOKey key) {
        return dictitemDOMapper.deleteByPrimaryKey(key);
    }
    /*新增数据字典项*/
    @Override
    public int insert(DictitemDO record) {
        return dictitemDOMapper.insert(record);
    }
    /*新增数据字典项跳NULL*/
    @Override
    public int insertSelective(DictitemDO record) {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setItemcreateat(DateUtils.getDate());
        record.setItemcode(UUIDUtils.getUUID());
        return dictitemDOMapper.insertSelective(record);
    }
    /*查找数据字典项*/
    @Override
    public DictitemDO selectByPrimaryKey(DictitemDOKey key) {
        return dictitemDOMapper.selectByPrimaryKey(key);
    }
    /*修改数据字典项跳NULL*/
    @Override
    public int updateByPrimaryKeySelective(DictitemDO record) {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        return dictitemDOMapper.updateByPrimaryKeySelective(record);
    }
    /*修改数据字典项*/
    @Override
    public int updateByPrimaryKey(DictitemDO record) {
        return dictitemDOMapper.updateByPrimaryKey(record);
    }
}
