package com.zyyglxt.service.impl;

import com.zyyglxt.dao.IndustrialDevelopCooExcDOMapper;
import com.zyyglxt.dataobject.IndustrialDevelopCooExcDO;
import com.zyyglxt.dataobject.IndustrialDevelopCooExcDOKey;
import com.zyyglxt.service.IIndustrialDevelopCooService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

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

    @Override
    public List<IndustrialDevelopCooExcDO> getCooRecord(int page, int page_size) {
        int start = (page - 1) * page_size;
        int end = page * page_size;
        return cooExcDOMapper.selectByPage(start, end);
    }

}
