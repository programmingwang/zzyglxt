package com.zyyglxt.service.impl;

import com.zyyglxt.dao.HospSpecialtyRefDOMapper;
import com.zyyglxt.dao.SpecialtyDOMapper;
import com.zyyglxt.dataobject.HospSpecialtyRefDO;
import com.zyyglxt.dataobject.HospSpecialtyRefDOKey;
import com.zyyglxt.dataobject.SpecialtyDO;
import com.zyyglxt.dataobject.SpecialtyDOKey;
import com.zyyglxt.dto.SpecialtyDto;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.ISpecialtyService;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
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
        specialtyDO.setItemcreateat(new Date());

        hospSpecialtyRefDO.setItemcode(UUID.randomUUID().toString());
        hospSpecialtyRefDO.setHospitalCode(specialtyDto.getHospitalCode());
        hospSpecialtyRefDO.setSpecialtyCode(specialtyDto.getItemcode());
        hospSpecialtyRefDO.setCreater(specialtyDto.getCreater());
        hospSpecialtyRefDO.setItemcreateat(new Date());
        hospSpecialtyRefDO.setUpdater(specialtyDto.getUpdater());

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
        specialtyDO = specialtyDto;

        hospSpecialtyRefDO.setHospitalCode(specialtyDto.getHospitalCode());
        hospSpecialtyRefDO.setSpecialtyCode(specialtyDto.getHospitalCode());
        hospSpecialtyRefDO.setCreater(specialtyDto.getCreater());
        hospSpecialtyRefDO.setItemcreateat(specialtyDto.getItemcreateat());
        hospSpecialtyRefDO.setUpdater(specialtyDto.getUpdater());
        hospSpecialtyRefDO.setItemupdateat(specialtyDto.getItemupdateat());

        specialtyDOMapper.updateByPrimaryKeySelective(specialtyDO);
        hospSpecialtyRefDOMapper.updateByPrimaryKeySelective(hospSpecialtyRefDO);
    }

    /*删除科室记录，包括科室表和关系表*/
    @Override
    public void deleteSpecialty(SpecialtyDOKey specialtyDOKey) {
        ValidatorResult result = validator.validate(specialtyDOKey);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        hospSpecialtyRefDOMapper.deleteBySpecialtyCode(specialtyDOKey.getItemcode());
        specialtyDOMapper.deleteByPrimaryKey(specialtyDOKey);
    }

    /*查询所有科室*/
    @Override
    public List<SpecialtyDO> selectAllSpecialty() {
        return specialtyDOMapper.selectAllSpecialty();
    }

    /*
    搜索关键字，包括专科名，专科介绍，专科所在省市县，手动输入地址，专科所属医院名
     */
    @Override
    public List<SpecialtyDO> searchSpecialty(String keyWord) {
        if(keyWord.isEmpty()){
            throw new BusinessException("关键字不能为空", EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        return specialtyDOMapper.searchSpecialty(keyWord);
    }

    /*查询前五条记录*/
    @Override
    public List<SpecialtyDO> top5Specialty() {
        return specialtyDOMapper.top5Specialty();
    }

    @Override
    public List<SpecialtyDO> selectByHospCode(String hospCode) {
        if(hospCode.isEmpty()){
            throw new BusinessException("医院code不能为空", EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        return specialtyDOMapper.selectByHospCode(hospCode);
    }


}
