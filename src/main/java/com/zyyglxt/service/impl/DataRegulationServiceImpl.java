package com.zyyglxt.service.impl;

import com.zyyglxt.dao.DataDOMapper;
import com.zyyglxt.dataobject.DataDO;
import com.zyyglxt.dataobject.DataDOKey;
import com.zyyglxt.dto.DataDto;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.IDataNewsService;
import com.zyyglxt.service.IDataRegulationService;
import com.zyyglxt.util.DateUtils;
import com.zyyglxt.util.UUIDUtils;
import com.zyyglxt.util.UsernameUtil;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.Date;
import java.util.ArrayList;
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

    @Autowired
    private UsernameUtil usernameUtil;

    @Override
    public DataDO selectRegulation(DataDOKey key) {
        return dataDOMapper.selectByPrimaryKey(key, "政策法规");
    }

    @Override
    public List<DataDto> selectRegulationList(String dataStatus) {
        return dataDOMapper.selectByAllData("政策法规", dataStatus);

    }

    @Override
    public int insertRegulation(DataDO record) {
        ValidatorResult result = validator.validate(record);
        if (result.isHasErrors()) {
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setItemcreateat(DateUtils.getDate());
        record.setCreater(usernameUtil.getOperateUser());
        record.setDataType("政策法规");
        record.setUpdater(usernameUtil.getOperateUser());
        if (record.getItemcode() == null) {
            record.setItemcode(UUIDUtils.getUUID());
        }
        return dataDOMapper.insertSelective(record);
    }

    @Override
    public int deleteRegulation(DataDOKey key) {
        return dataDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    public int updateRegulation(DataDO record) {
        ValidatorResult result = validator.validate(record);
        if (result.isHasErrors()) {
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setUpdater(usernameUtil.getOperateUser());
        record.setItemupdateat(DateUtils.getDate());
        return dataDOMapper.updateByPrimaryKeySelective(record);
    }


    @Override
    public int changeStatus(DataDOKey key, String dataDelayedRelease, String dataStatus) {
        return dataDOMapper.changeStatusByPrimaryKey(key, dataDelayedRelease, dataStatus);
    }

    @Override
    public List<String> selectForMainPage() {
        return dataDOMapper.selectAllForMainPage("政策法规");
    }


}
