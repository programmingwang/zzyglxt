package com.zyyglxt.service.impl;

import com.zyyglxt.dao.HospSpecialtyRefDOMapper;
import com.zyyglxt.dao.SpecialtyDOMapper;
import com.zyyglxt.dataobject.HospSpecialtyRefDO;
import com.zyyglxt.dataobject.HospSpecialtyRefDOKey;
import com.zyyglxt.dataobject.SpecialtyDO;
import com.zyyglxt.dataobject.SpecialtyDOKey;
import com.zyyglxt.dto.MedicalServiceDto;
import com.zyyglxt.dto.SpecialtyDto;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.IChineseMedicineService;
import com.zyyglxt.service.ISpecialtyService;
import com.zyyglxt.util.UsernameUtil;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/10/29 17:32
 */
@Service
public class SpecialtyServiceImpl implements ISpecialtyService {

    @Resource
    private SpecialtyDOMapper specialtyDOMapper;
    @Resource
    private HospSpecialtyRefDOMapper hospSpecialtyRefDOMapper;
    @Autowired
    private ValidatorImpl validator;
    @Resource
    private IChineseMedicineService chineseMedicineService;
    @Autowired
    private UsernameUtil usernameUtil;

    private SpecialtyDO specialtyDO = new SpecialtyDO();

    private HospSpecialtyRefDO hospSpecialtyRefDO = new HospSpecialtyRefDO();

    /*增加科室，同时也将科室与医院记录插入*/
    @Override
    public void addSpecialty(SpecialtyDto specialtyDto) {
        ValidatorResult result = validator.validate(specialtyDto);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        BeanUtils.copyProperties(specialtyDto,specialtyDO);
        String user = usernameUtil.getOperateUser();
        specialtyDO.setCreater(user);
        specialtyDO.setItemcreateat(new Date());
        specialtyDO.setSpecialtyStatus("--");
        specialtyDO.setUpdater(user);

        hospSpecialtyRefDO.setItemcode(UUID.randomUUID().toString());
        hospSpecialtyRefDO.setHospitalCode(specialtyDto.getHospitalCode());
        hospSpecialtyRefDO.setSpecialtyCode(specialtyDto.getItemcode());
        hospSpecialtyRefDO.setCreater(user);
        hospSpecialtyRefDO.setItemcreateat(new Date());
        hospSpecialtyRefDO.setUpdater(user);

        specialtyDOMapper.insertSelective(specialtyDO);
        hospSpecialtyRefDOMapper.insertSelective(hospSpecialtyRefDO);
    }

    /*更新科室信息，同步更新医院科室关系表*/
    @Override
    public void updateSpecialty(SpecialtyDto specialtyDto) {
        ValidatorResult result = validator.validate(specialtyDto);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        BeanUtils.copyProperties(specialtyDto,specialtyDO);
        String user = usernameUtil.getOperateUser();
        specialtyDO.setUpdater(user);

        hospSpecialtyRefDO.setHospitalCode(specialtyDto.getHospitalCode());
        hospSpecialtyRefDO.setUpdater(user);

        specialtyDOMapper.updateByPrimaryKeySelective(specialtyDO);
        hospSpecialtyRefDOMapper.updateBySpecialtyCodeSelective(specialtyDO.getItemcode());
    }

    /*删除科室记录，包括科室表和关系表*/
    @Override
    public void deleteSpecialty(SpecialtyDOKey specialtyDOKey) {
        ValidatorResult result = validator.validate(specialtyDOKey);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        /*判断该科室是否能删除*/
        if (!(chineseMedicineService.selectBySpecialtyCode(specialtyDOKey.getItemcode())).isEmpty()){
            throw new BusinessException("该科室下还有医生，不能删除",EmBusinessError.INTEGRITY_CONSTRAINT_ERROE);
        }
        hospSpecialtyRefDOMapper.deleteBySpecialtyCode(specialtyDOKey.getItemcode());
        specialtyDOMapper.deleteByPrimaryKey(specialtyDOKey);
    }

    /*查询所有科室*/
    @Override
    public List<SpecialtyDO> selectAllSpecialty(List<String> specialtyStatus) {
        List<SpecialtyDO> DOList = new ArrayList<>();
        for (String status : specialtyStatus) {
            DOList.addAll(specialtyDOMapper.selectByStatus(status));
        }
        return DOList;
    }

    /*
    搜索关键字，包括专科名，专科介绍，专科所在省市县，手动输入地址，专科所属医院名
     */
    @Override
    public List<SpecialtyDO> searchSpecialty(String keyWord) {
        if(keyWord == null || keyWord == ""){
            throw new BusinessException("关键字不能为空", EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        return specialtyDOMapper.searchSpecialty(keyWord);
    }

    @Override
    public List<SpecialtyDO> selectByHospCode(String hospCode) {
        if(hospCode == null || hospCode == ""){
            throw new BusinessException("医院code不能为空", EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        return specialtyDOMapper.selectByHospCode(hospCode);
    }

    @Override
    public int updateStatus(MedicalServiceDto medicalServiceDto) {
        ValidatorResult result = validator.validate(medicalServiceDto);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        medicalServiceDto.setUpdater(usernameUtil.getOperateUser());
        return specialtyDOMapper.updateStatusByPrimaryKey(medicalServiceDto);
    }



}
