package com.zyyglxt.service.impl;

import com.zyyglxt.dao.RequestReportDOMapper;
import com.zyyglxt.dataobject.RequestReportDO;
import com.zyyglxt.dataobject.RequestReportDOKey;
import com.zyyglxt.dto.RequestReportDto;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.IRequestReportDOService;
import com.zyyglxt.util.UUIDUtils;
import com.zyyglxt.util.UsernameUtil;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/12/27 12:51
 */
@Service
public class RequestReportServiceImpl implements IRequestReportDOService {
    @Resource
    private RequestReportDOMapper requestReportDOMapper;
    @Autowired
    private ValidatorImpl validator;
    @Autowired
    private UsernameUtil usernameUtil;
    @Transactional

    @Override
    public int insertSelective(RequestReportDO record) {
        if(StringUtils.isEmpty(record.getItemcode())){
            record.setItemcode(UUIDUtils.getUUID());
        }
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setItemcreateat(new Date());
        record.setCreater(usernameUtil.getRoleName());
        return requestReportDOMapper.insertSelective(record);
    }

    @Override
    public int deleteByPrimaryKey(RequestReportDOKey key) {
        requestReportDOMapper.deleteByPrimaryKey(key);
        return 0;
    }

    @Override
    public int updateByPrimaryKeySelective(RequestReportDO record) {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setItemupdateat(new Date());
        record.setUpdater(usernameUtil.getOperateUser());
        return requestReportDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public List<RequestReportDto> selectAllReport(String reportDataStatus) {
        /*List<RequestReportDO> requestReportDOList=new ArrayList<>();
        for(String status:reportDataStatus){
            requestReportDOList.addAll(requestReportDOMapper.selectAllReport(status));
        }*/
        return requestReportDOMapper.selectAllReport(reportDataStatus);
    }

    @Override
    public int changeStatusToReport(RequestReportDOKey key, String reportDataStatus) {
        return requestReportDOMapper.changeStatusToReport(key,reportDataStatus);
    }
}
