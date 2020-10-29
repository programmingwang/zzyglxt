package com.zyyglxt.service.impl;

import com.zyyglxt.dao.IndustrialDevelopExpertDOMapper;
import com.zyyglxt.dataobject.IndustrialDevelopExpertDO;
import com.zyyglxt.dataobject.IndustrialDevelopExpertDOKey;
import com.zyyglxt.service.IIndustrialExpert;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;

/**
 * @Author lrt
 * @Date 2020/10/29 15:17
 * @Version 1.0
 **/
@Service
public class IndustrialExpertImpl implements IIndustrialExpert {

    @Resource
    IndustrialDevelopExpertDOMapper developExpertDOMapper;


    @Override
    public void addExpert(IndustrialDevelopExpertDO developExpertDO) {
        developExpertDO.setCreater("未定义");
        developExpertDO.setUpdater("未定义");
        developExpertDO.setItemcreateat(new Date());
        developExpertDO.setItemupdateat(new Date());
        developExpertDOMapper.insertSelective(developExpertDO);
    }

    @Override
    public void delExpert(IndustrialDevelopExpertDOKey key) {
        developExpertDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    public void updExpert(IndustrialDevelopExpertDO developExpertDO) {
        developExpertDO.setUpdater("未定义");
        developExpertDO.setItemupdateat(new Date());
        developExpertDOMapper.updateByPrimaryKeySelective(developExpertDO);
    }
}
