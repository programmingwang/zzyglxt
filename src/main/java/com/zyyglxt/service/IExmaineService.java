package com.zyyglxt.service;

import com.zyyglxt.dataobject.IndustrialDevelopExpertRefDO;
import com.zyyglxt.dto.ExmaineDto;

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

    List<IndustrialDevelopExpertRefDO> selectByTopicCode(String topicCode);

    int deleteByTopicCode(String topicCode);
}
