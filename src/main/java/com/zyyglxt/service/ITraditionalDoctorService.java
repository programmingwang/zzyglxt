package com.zyyglxt.service;

import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;
import com.zyyglxt.dataobject.CulturalResourcesDO;
import com.zyyglxt.dataobject.CulturalResourcesDOKey;
import com.zyyglxt.dto.CulturalResourcesDto;
import com.zyyglxt.error.BusinessException;

import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/10/29 10:45
 * Version: 1.0
 * 历代名家业务
 */
public interface ITraditionalDoctorService {
    //查询一个历代名家
    CulturalResourcesDO getTraditionalDoctor(CulturalResourcesDOKey key);

    //查询所有历代名家
    List<CulturalResourcesDto> getTraditionalDoctorList(String chineseCulturalStatus);

    //增加一个历代名家
    int addTraditionalDoctor(CulturalResourcesDO record);

    //删除一个历代名家
    int removeTraditionalDoctor(CulturalResourcesDOKey key);

    //修改一个历代名家
    int updateTraditionalDoctor(CulturalResourcesDO record);

    //修改一个历代名家状态
    int changeTraditionalDoctorStatus(CulturalResourcesDOKey key, String chineseCulturalStatus);

}
