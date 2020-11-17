package com.zyyglxt.service.impl;

import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopSchoolDto;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.IFileService;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.annotation.Resource;
import com.zyyglxt.dao.IndustrialDevelopSchoolMapper;
import com.zyyglxt.dataobject.IndustrialDevelopSchool;
import com.zyyglxt.service.IndustrialDevelopSchoolService;

import java.util.ArrayList;
import java.util.List;

/**
   *@Author lrt
   *@Date 2020/11/6 20:00
   *@Version 1.0
**/
@Service
public class IndustrialDevelopSchoolServiceImpl implements IndustrialDevelopSchoolService{

    @Resource
    private IndustrialDevelopSchoolMapper industrialDevelopSchoolMapper;

    @Resource
    private IFileService fileService;

    @Autowired
    ValidatorImpl validator;

    @Override
    public int deleteByPrimaryKey(Integer itemid,String itemcode) {
        return industrialDevelopSchoolMapper.deleteByPrimaryKey(itemid,itemcode);
    }

    @Override
    public int insert(IndustrialDevelopSchool record) {
        return industrialDevelopSchoolMapper.insert(record);
    }

    @Override
    public int insertSelective(IndustrialDevelopSchool record) {
        ValidatorResult result = validator.validate(record);
        if (result.isHasErrors()) {
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        return industrialDevelopSchoolMapper.insertSelective(record);
    }

    @Override
    public IndustrialDevelopSchool selectByPrimaryKey(Integer itemid,String itemcode) {
        return industrialDevelopSchoolMapper.selectByPrimaryKey(itemid,itemcode);
    }

    @Override
    public int updateByPrimaryKeySelective(IndustrialDevelopSchool record) {
        return industrialDevelopSchoolMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int updateByPrimaryKey(IndustrialDevelopSchool record) {
        return industrialDevelopSchoolMapper.updateByPrimaryKey(record);
    }

    @Override
    public List<IndustrialDevelopSchoolDto> selectAll() {
        List<IndustrialDevelopSchoolDto> resList = new ArrayList<>();
        List<IndustrialDevelopSchool> list = industrialDevelopSchoolMapper.selectAll();
        for (IndustrialDevelopSchool item: list){
            IndustrialDevelopSchoolDto obj = new IndustrialDevelopSchoolDto();
            BeanUtils.copyProperties(item, obj);
            resList.add(obj);
        }
        for (IndustrialDevelopSchoolDto item : resList){
            item.setFilePath(fileService.selectFileByDataCode(item.getItemcode()).getFilePath());
        }
        return resList;
    }
}
