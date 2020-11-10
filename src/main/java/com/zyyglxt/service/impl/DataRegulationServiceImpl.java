package com.zyyglxt.service.impl;

import com.zyyglxt.dao.DataDOMapper;
import com.zyyglxt.dataobject.DataDO;
import com.zyyglxt.dataobject.DataDOKey;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.IDataNewsService;
import com.zyyglxt.service.IDataRegulationService;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * @Author huangtao
 * @Date 2020/10/29 10:18
 * @Version 1.0
 */

@Service
public class DataRegulationServiceImpl implements IDataRegulationService {
    @Resource
    DataDOMapper dataDOMapper;

    @Autowired
    private ValidatorImpl validator;

    @Override
    public DataDO selectRegulation(DataDOKey key) {
        return dataDOMapper.selectByPrimaryKey(key,"政策法规");
    }

    @Override
    public List<DataDO> selectRegulationList() {
        return dataDOMapper.selectByAllData("政策法规");
    }

    @Override
    public int insertRegulation(DataDO record) {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setItemcreateat(new Date());
        record.setCreater("test");
        record.setItemupdateat(new Date());
        record.setUpdater("test");
        record.setDataType("政策法规");
        return dataDOMapper.insertSelective(record);
    }

    @Override
    public int deleteRegulation(DataDOKey key) {
        return dataDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    public int updateRegulation(DataDO record) {
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
