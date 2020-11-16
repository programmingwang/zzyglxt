package com.zyyglxt.service.impl;

import com.zyyglxt.dao.FileDOMapper;
import com.zyyglxt.dao.HealthCareChineseMedicineDOMapper;
import com.zyyglxt.dataobject.FileDO;
import com.zyyglxt.dataobject.HealthCareChineseMedicineDO;
import com.zyyglxt.dataobject.HealthCareChineseMedicineDOKey;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.HealthCareChineseMedicineDOService;
import com.zyyglxt.service.IFileService;
import com.zyyglxt.util.UsernameUtil;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/10/28 22:10
 */
@Service
public class HealthCareChineseMedicineDOServiceImpl implements HealthCareChineseMedicineDOService {
    @Resource
    private HealthCareChineseMedicineDOMapper healthCareChineseMedicineDOMapper;
    @Resource
    private IFileService iFileService;
    @Autowired
    private ValidatorImpl validator;
    @Autowired
    private UsernameUtil usernameUtil;
    @Transactional
    /*
  中医药常识添加、删除、修改、查询实现方法
**/
    @Override
    public int insert(HealthCareChineseMedicineDO record) throws BusinessException {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        //iFileService.addFile(fileDO.setDataCode());
        //fileDO.setDataCode(UUID.randomUUID().toString());
        if(record.getItemcode()==null){
            record.setItemcode(UUID.randomUUID().toString());
        }
        record.setItemcreateat(new Date());
        record.setCreater(usernameUtil.getOperateUser());
        record.setUpdater(usernameUtil.getOperateUser());
        return healthCareChineseMedicineDOMapper.insert(record);
    }
    @Transactional
    @Override
    public int  deleteByPrimaryKey(HealthCareChineseMedicineDOKey key) {
          healthCareChineseMedicineDOMapper.deleteByPrimaryKey(key);
          return 0;
    }
    @Transactional
    @Override
    public int updateByPrimaryKeySelective(HealthCareChineseMedicineDO record) throws BusinessException {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setItemupdateat(new Date());
        record.setUpdater(usernameUtil.getOperateUser());
        return healthCareChineseMedicineDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public HealthCareChineseMedicineDO selectByPrimaryKey(HealthCareChineseMedicineDOKey key) {
        return healthCareChineseMedicineDOMapper.selectByPrimaryKey(key);
    }
     /*查询所有中医药常识数据*/
    @Override
    public List<HealthCareChineseMedicineDO> selectAllHealthCareChineseMedicine(List<String> chineseMedicineStatus) {
        List<HealthCareChineseMedicineDO> healthCareChineseMedicineDOList=new ArrayList<>();
        for(String status:chineseMedicineStatus){
            healthCareChineseMedicineDOList.addAll(healthCareChineseMedicineDOMapper.selectAllHealthCareChineseMedicine(status));
        }
        return healthCareChineseMedicineDOList;
    }
   /*中医药数据状态*/
    @Override
    public int changeStatusToMedicine(HealthCareChineseMedicineDOKey key, String chineseMedicineStatus) {
        return healthCareChineseMedicineDOMapper.changeStatusToMedicine(key,chineseMedicineStatus);
    }
}
