package com.zyyglxt.service.impl;

import com.zyyglxt.dao.HospDOMapper;
import com.zyyglxt.dao.HospSpecialtyRefDOMapper;
import com.zyyglxt.dao.OrganizationDOMapper;
import com.zyyglxt.dataobject.HospDO;
import com.zyyglxt.dataobject.HospDOKey;
import com.zyyglxt.dataobject.OrganizationDO;
import com.zyyglxt.dto.HospDto;
import com.zyyglxt.dto.StatusDto;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.IHospService;
import com.zyyglxt.util.UsernameUtil;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/10/29 10:22
 */
@Service
public class HospServiceImpl implements IHospService {
    @Resource
    private HospDOMapper hospDOMapper;
    @Autowired
    private ValidatorImpl validator;
    @Resource
    private HospSpecialtyRefDOMapper hospSpecialtyRefDOMapper;
    @Resource
    private UsernameUtil usernameUtil;
    @Resource
    OrganizationDOMapper organizationDOMapper;

    @Override
    public int addHosp(HospDO hospDO) {
        ValidatorResult result = validator.validate(hospDO);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        hospDO.setItemcreateat(new Date());
        hospDO.setCreater(usernameUtil.getOperateUser());
        hospDO.setUpdater(usernameUtil.getOperateUser());

        return hospDOMapper.insertSelective(hospDO);
    }

    @Override
    public int updateHosp(HospDO hospDO) {
        ValidatorResult result = validator.validate(hospDO);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        hospDO.setUpdater(usernameUtil.getOperateUser());
        return hospDOMapper.updateByPrimaryKeySelective(hospDO);
    }

    @Override
    public int deleteHosp(HospDOKey hospDOKey) {
        ValidatorResult result = validator.validate(hospDOKey);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        /*判断该医院是否能删除*/
        if (!(hospSpecialtyRefDOMapper.selectSpecialtyByHospCode(hospDOKey.getItemcode())).isEmpty()){
            throw new BusinessException("该医院下还有科室，不能删除",EmBusinessError.INTEGRITY_CONSTRAINT_ERROE);
        }
        return hospDOMapper.deleteByPrimaryKey(hospDOKey);
    }

    @Override
    public List<HospDto> selectAllHosp(List<String> specialtyStatus) {
        List<HospDto> DOList = new ArrayList<>();
        for (String status : specialtyStatus) {
            DOList.addAll(hospDOMapper.selectByStatus(status));
        }
        return DOList;
    }

    /*
    搜索关键字，包括搜名称，等级，市，县，地址
     */
    @Override
    public List<HospDto> searchHosp(String keyWord) {
        if(keyWord == "" || keyWord == null){
            throw new BusinessException("关键字不能为空", EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        return hospDOMapper.searchHosp(keyWord);
    }

    @Override
    public HospDto selectHospByItemCode(String itemCode) {
        if(itemCode == "" || itemCode == null){
            throw new BusinessException("itemcode不能为空", EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        return hospDOMapper.selectHospByItemCode(itemCode);
    }

    @Override
    public List<HospDto> selectByStatus(String status) {
        return hospDOMapper.selectByStatus(status);
    }

    @Override
    public int updateStatus(StatusDto statusDto) {
        ValidatorResult result = validator.validate(statusDto);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        statusDto.setUpdater(usernameUtil.getOperateUser());
        return hospDOMapper.updateStatusByPrimaryKey(statusDto);
    }

    @Override
    public List<HospDto> selectAllNoStatus() {
        return hospDOMapper.selectAllHosp();
    }

    @Override
    public HospDto selectByOrgCode(String orgCode) {
        return hospDOMapper.selectByOrgCode(orgCode);
    }

}

