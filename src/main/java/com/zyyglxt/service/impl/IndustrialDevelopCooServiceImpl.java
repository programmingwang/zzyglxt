package com.zyyglxt.service.impl;

import com.zyyglxt.dao.IndustrialDevelopCooExcDOMapper;
import com.zyyglxt.dataobject.IndustrialDevelopCooExcDO;
import com.zyyglxt.dataobject.IndustrialDevelopCooExcDOKey;
import com.zyyglxt.service.IIndustrialDevelopCooService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;

/**
 * @Author lrt
 * @Date 2020/10/29 14:25
 * @Version 1.0
 **/
@Service
public class IndustrialDevelopCooServiceImpl implements IIndustrialDevelopCooService {
    @Resource
    IndustrialDevelopCooExcDOMapper cooExcDOMapper;

    public void addCooRecord(IndustrialDevelopCooExcDO developCooExcDO) {
        developCooExcDO.setItemcreateat(new Date());
        developCooExcDO.setItemupdateat(new Date());
        cooExcDOMapper.insertSelective(developCooExcDO);
    }

    @Override
    public void delCooRecord(IndustrialDevelopCooExcDOKey key) {
        cooExcDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    public void updCooRecord(IndustrialDevelopCooExcDO developCooExcDO) {
        developCooExcDO.setItemupdateat(new Date());
        cooExcDOMapper.updateByPrimaryKeySelective(developCooExcDO);
    }

    @Override
    public void increaseVisitNum(IndustrialDevelopCooExcDOKey key) {
        cooExcDOMapper.updateVisitNumByItemidAndItemcode(key);
    }


}
