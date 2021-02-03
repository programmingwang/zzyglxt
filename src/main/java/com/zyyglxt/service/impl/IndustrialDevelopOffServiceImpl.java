package com.zyyglxt.service.impl;

import com.zyyglxt.dao.IndustrialDevelopOffDOMapper;
import com.zyyglxt.dataobject.IndustrialDevelopOffDO;
import com.zyyglxt.dataobject.IndustrialDevelopOffDOKey;
import com.zyyglxt.dataobject.validation.ValidationGroups;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.IIndustrialDevelopOffService;
import com.zyyglxt.util.DateUtils;
import com.zyyglxt.util.UsernameUtil;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import lombok.Data;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * @Author lrt
 * @Date 2020/10/29 17:35
 * @Version 1.0
 **/
@Service
public class IndustrialDevelopOffServiceImpl implements IIndustrialDevelopOffService {
    @Resource
    IndustrialDevelopOffDOMapper developOffDOMapper;
    @Resource
    UsernameUtil usernameUtil;
    @Resource
    ValidatorImpl validator;

    @Override
    public void addOff(IndustrialDevelopOffDO record) {

        Date date1 = record.getStartTime();
        Date date2 = DateUtils.getDate();
        Date date3 = record.getEndTime();

        record.setCreater(usernameUtil.getOperateUser());
        record.setUpdater(usernameUtil.getOperateUser());
        record.setItemcreateat(new Date());
        record.setItemupdateat(new Date());

        ValidatorResult result = validator.validate(record, ValidationGroups.Insert.class);
        if (result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        if (record.getItemcode() == null || record.getItemcode().isEmpty()){
            record.setItemcode(UUID.randomUUID().toString());
        }

        Calendar date = Calendar.getInstance();
        date.setTime(date2);

        Calendar begin = Calendar.getInstance();
        begin.setTime(date1);

        Calendar end = Calendar.getInstance();
        end.setTime(date3);

        if (date.after(begin) && date.before(end)) {
            record.setIsimp("1");
        } else if(begin.before(date)){
           record.setIsimp("2");
        }else if(end.after(date)){
            record.setIsimp("0");
        }
        developOffDOMapper.insertSelective(record);
    }

    @Override
    public void updOff(IndustrialDevelopOffDO record) {
        ValidatorResult result = validator.validate(record,ValidationGroups.UpdateOrDelete.class);
        if (result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setUpdater(usernameUtil.getOperateUser());
        record.setItemupdateat(new Date());
        developOffDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public void delOff(IndustrialDevelopOffDOKey key) {
        ValidatorResult result = validator.validate(key,ValidationGroups.UpdateOrDelete.class);
        if (result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        developOffDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    public List<IndustrialDevelopOffDO> getOff() {
        return developOffDOMapper.selectAll();
    }
}
