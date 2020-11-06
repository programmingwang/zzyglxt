package com.zyyglxt.service.impl;

import com.zyyglxt.dao.DataDOMapper;
import com.zyyglxt.dataobject.DataDO;
import com.zyyglxt.dataobject.DataDOKey;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.IDataDOService;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

import java.util.Date;
import java.util.List;

/**
 * @Author huangtao
 * @Date 2020/10/29 10:18
 * @Version 1.0
 */
//@EnableScheduling
@Service
public class DataDOServiceImpl  implements IDataDOService{
    @Resource
    DataDOMapper dataDOMapper;

    @Autowired
    private ValidatorImpl validator;

    @Override
    public DataDO selectNewsInf(DataDOKey key) {
        return dataDOMapper.selectByPrimaryKey(key);
    }

    @Override
    public List<DataDO> selectAllNewsInf(String dataType) {
        return dataDOMapper.selectByAllInf(dataType);
    }

    @Override
    public int insertNewsInf(DataDO record) {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setItemcreateat(new Date());
        record.setCreater("test");
        record.setItemupdateat(new Date());
        record.setUpdater("test");
        return dataDOMapper.insertSelective(record);
    }

    @Override
    public int deleteNewsInf(DataDOKey key) {
        return dataDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    public int updateNewsInf(DataDO record) {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setUpdater("asd");
        record.setItemupdateat(new Date());
        return dataDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int changeStatus(DataDOKey key, String dataStatus) {
        return dataDOMapper.changeStatusByPrimaryKey(key, dataStatus);
    }

    /**
     * 关键字搜索
     * @param keyWord
     * @return
     */
    @Override
    public List<DataDO> searchDataDO(String keyWord) {
        return dataDOMapper.searchDataDO(keyWord);
    }

}
