package com.zyyglxt.service;

import com.zyyglxt.dataobject.IndustrialDevelopTopicDO;
import com.zyyglxt.dataobject.IndustrialDevelopTopicDOKey;
import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopTopicDODto;

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

    List<IndustrialDevelopTopicDODto> getTopics(List<String> examineStatus);

    List<IndustrialDevelopTopicDO> getStatus(String code);

    IndustrialDevelopTopicDO getTopic(String topicCode);

    //修改项目状态
    int changeStatus(IndustrialDevelopTopicDOKey key, String status);

    //修改审核状态
    int changeExamineStatus(IndustrialDevelopTopicDOKey key, String examineStatus);

    List<IndustrialDevelopTopicDODto> selectByUserCode(String userCode);

    List<IndustrialDevelopTopicDODto> selectByCompany(String company);

    IndustrialDevelopTopicDO maxProjectNO();

    List<IndustrialDevelopTopicDO> getAll(List<String> examineStatus);

}
