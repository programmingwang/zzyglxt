package com.zyyglxt.service.impl;

import com.zyyglxt.dao.IndustrialDevelopOffDOMapper;
import com.zyyglxt.dataobject.IndustrialDevelopOffDO;
import com.zyyglxt.dataobject.IndustrialDevelopOffDOKey;
import com.zyyglxt.service.IIndustrialDevelopOff;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;

/**
 * @Author lrt
 * @Date 2020/10/29 17:35
 * @Version 1.0
 **/
@Service
public class IndustrialDevelopOffImpl implements IIndustrialDevelopOff {
    @Resource
    IndustrialDevelopOffDOMapper developOffDOMapper;

    @Override
    public void addOff(IndustrialDevelopOffDO record) {
        record.setCreater("未定义");
        record.setUpdater("未定义");
        record.setItemcreateat(new Date());
        record.setItemupdateat(new Date());
        developOffDOMapper.insertSelective(record);
    }

    @Override
    public void updOff(IndustrialDevelopOffDO record) {
        record.setUpdater("未定义");
        record.setItemupdateat(new Date());
        developOffDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public void delOff(IndustrialDevelopOffDOKey key) {
        developOffDOMapper.deleteByPrimaryKey(key);
    }
}
