package com.zyyglxt.service;

import com.zyyglxt.dataobject.IndustrialDevelopTopicDO;
import com.zyyglxt.dataobject.IndustrialDevelopTopicDOKey;

import java.util.List;

/**
 * @Author lrt
 * @Date 2020/10/29 15:47
 * @Version 1.0
 **/
public interface IIndustrialDevelopTopicService {

    void addTopic(IndustrialDevelopTopicDO developTopicDO);

    void delTopic(IndustrialDevelopTopicDOKey key);

    void updTopic(IndustrialDevelopTopicDO developTopicDO);

    List<IndustrialDevelopTopicDO> getTopics();
}
