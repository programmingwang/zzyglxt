package com.zyyglxt.service;

import com.zyyglxt.dataobject.IndustrialDevelopExpertRefDO;
import com.zyyglxt.dto.ExmaineDto;
import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopTopicDODto;

import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/11/21 13:17
 * Version: 1.0
 */
public interface IExmaineService {
    int deleteByPrimaryKey(Integer itemid, String itemcode);

    int insert(IndustrialDevelopExpertRefDO record);

    int insertSelective(IndustrialDevelopExpertRefDO record);

    IndustrialDevelopExpertRefDO selectByPrimaryKey(Integer itemid, String itemcode);

    int updateByPrimaryKeySelective(IndustrialDevelopExpertRefDO record);

    int updateByPrimaryKey(IndustrialDevelopExpertRefDO record);

    List<ExmaineDto> selectAll();

    List<ExmaineDto> selectByExpertCode(String expertCode);

    List<IndustrialDevelopExpertRefDO> selectByTopicCode(String topicCode);

    int deleteByTopicCode(String topicCode);

    //查询课题和分配专家状态--分配专家
    List<IndustrialDevelopTopicDODto> topicAndExpertStatus();

    int delExpertTopic(IndustrialDevelopExpertRefDO expertRefDO);
}
