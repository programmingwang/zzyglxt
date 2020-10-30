package com.zyyglxt.service.impl;

import com.zyyglxt.dao.IndustrialDevelopTopicDOMapper;
import com.zyyglxt.dataobject.IndustrialDevelopTopicDO;
import com.zyyglxt.dataobject.IndustrialDevelopTopicDOKey;
import com.zyyglxt.service.IIndustrialDevelopTopic;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;

/**
 * @Author lrt
 * @Date 2020/10/29 15:53
 * @Version 1.0
 **/
@Service
public class IndustrialDevelopTopicImpl implements IIndustrialDevelopTopic {

    @Resource
    IndustrialDevelopTopicDOMapper developTopicDOMapper;

    @Override
    public void addTopic(IndustrialDevelopTopicDO developTopicDO) {
        developTopicDO.setCreater("未定义");
        developTopicDO.setUpdater("未定义");
        developTopicDO.setItemcreateat(new Date());
        developTopicDO.setItemupdateat(new Date());
        developTopicDOMapper.insertSelective(developTopicDO);
    }

    @Override
    public void delTopic(IndustrialDevelopTopicDOKey key) {
        developTopicDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    public void updTopic(IndustrialDevelopTopicDO developTopicDO) {
        developTopicDO.setUpdater("未定义");
        developTopicDO.setItemupdateat(new Date());
        developTopicDOMapper.updateByPrimaryKeySelective(developTopicDO);
    }
}
