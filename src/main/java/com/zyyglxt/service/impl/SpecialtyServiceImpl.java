package com.zyyglxt.service.impl;

import com.zyyglxt.dao.HospSpecialtyRefDOMapper;
import com.zyyglxt.dao.SpecialtyDOMapper;
import com.zyyglxt.dataobject.HospSpecialtyRefDO;
import com.zyyglxt.dataobject.HospSpecialtyRefDOKey;
import com.zyyglxt.dataobject.SpecialtyDO;
import com.zyyglxt.dataobject.SpecialtyDOKey;
import com.zyyglxt.service.ISpecialtyService;

import javax.annotation.Resource;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/10/29 17:32
 */
public class SpecialtyServiceImpl implements ISpecialtyService {

    @Resource
    SpecialtyDOMapper specialtyDOMapper;
    @Resource
    HospSpecialtyRefDOMapper hospSpecialtyRefDOMapper;

    @Override
    public void addSpecialty(SpecialtyDO specialtyDO, HospSpecialtyRefDO hospSpecialtyRefDO) {
        specialtyDOMapper.insertSelective(specialtyDO);
        hospSpecialtyRefDOMapper.insertSelective(hospSpecialtyRefDO);
    }

    @Override
    public void updateSpecialty(SpecialtyDO specialtyDO, HospSpecialtyRefDO hospSpecialtyRefDO) {
        specialtyDOMapper.updateByPrimaryKeySelective(specialtyDO);
        hospSpecialtyRefDOMapper.updateByPrimaryKeySelective(hospSpecialtyRefDO);
    }

    @Override
    public void deleteSpecialty(SpecialtyDOKey specialtyDOKey, HospSpecialtyRefDOKey hospSpecialtyRefDOKey) {
        hospSpecialtyRefDOMapper.deleteByPrimaryKey(hospSpecialtyRefDOKey);
        specialtyDOMapper.deleteByPrimaryKey(specialtyDOKey);
    }


}
