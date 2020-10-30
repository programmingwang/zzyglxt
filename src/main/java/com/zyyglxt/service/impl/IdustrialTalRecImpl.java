package com.zyyglxt.service.impl;

import com.zyyglxt.dao.IndustrialDevelopTalRecDOMapper;
import com.zyyglxt.dataobject.IndustrialDevelopTalRecDO;
import com.zyyglxt.dataobject.IndustrialDevelopTalRecDOKey;
import com.zyyglxt.dataobject.IndustrialDevelopTalRecDOWithBLOBs;
import com.zyyglxt.service.IIndustrialTalRec;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;

/**
 * @Author lrt
 * @Date 2020/10/29 16:51
 * @Version 1.0
 **/
@Service
public class IdustrialTalRecImpl implements IIndustrialTalRec {
    @Resource
    IndustrialDevelopTalRecDOMapper developTalRecDOMapper;

    @Override
    public void addTalRec(IndustrialDevelopTalRecDOWithBLOBs developTalRecDO) {
        developTalRecDO.setCreater("未定义");
        developTalRecDO.setUpdater("未定义");
        developTalRecDO.setItemcreateat(new Date());
        developTalRecDO.setItemupdateat(new Date());
        developTalRecDOMapper.insertSelective(developTalRecDO);
    }

    @Override
    public void delTalRec(IndustrialDevelopTalRecDOKey key) {
        developTalRecDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    public void updTalRec(IndustrialDevelopTalRecDOWithBLOBs developTalRecDO) {
        developTalRecDO.setUpdater("未定义");
        developTalRecDO.setItemupdateat(new Date());
        developTalRecDOMapper.updateByPrimaryKeySelective(developTalRecDO);
    }
}
