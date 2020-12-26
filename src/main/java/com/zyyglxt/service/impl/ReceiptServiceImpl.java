package com.zyyglxt.service.impl;

import com.zyyglxt.dao.ReceiptDOMapper;
import com.zyyglxt.dataobject.ReceiptDO;
import com.zyyglxt.dataobject.ReceiptDOKey;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.IReceiptDOService;
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
 * @time 2020/12/26 14:26
 */
@Service
public class ReceiptServiceImpl implements IReceiptDOService {
    @Resource
    private ReceiptDOMapper receiptDOMapper;
    @Autowired
    private ValidatorImpl validator;
    @Autowired
    private UsernameUtil usernameUtil;
    @Transactional

    @Override
    public int insertSelective(ReceiptDO record) {
        if(StringUtils.isEmpty(record.getItemcode())){
            record.setItemcode(UUIDUtils.getUUID());
        }
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setItemcreateat(new Date());
        record.setCreater(usernameUtil.getOperateUser());
        return receiptDOMapper.insertSelective(record);
    }

    @Override
    public int deleteByPrimaryKey(ReceiptDOKey key) {
        receiptDOMapper.deleteByPrimaryKey(key);
        return 0;
    }

    @Override
    public int updateByPrimaryKeySelective(ReceiptDO record) {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setItemupdateat(new Date());
        record.setUpdater(usernameUtil.getOperateUser());
        return receiptDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public ReceiptDO selectByPrimaryKey(ReceiptDOKey key) {
        return receiptDOMapper.selectByPrimaryKey(key);
    }

    @Override
    public List<ReceiptDO> selectAllReceipt(List<String> receivingDataStatus) {
        List<ReceiptDO> receiptDOList=new ArrayList<>();
        for(String status:receivingDataStatus){
            receiptDOList.addAll(receiptDOMapper.selectAllReceipt(status));
        }
        return receiptDOList;
    }

    @Override
    public int changeStatusToReceipt(ReceiptDOKey key, String receivingDataStatus) {
        return receiptDOMapper.changeStatusToReceipt(key,receivingDataStatus);
    }
}
