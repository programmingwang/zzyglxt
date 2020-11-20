package com.zyyglxt.service;

import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;
import com.zyyglxt.dataobject.FileDO;
import com.zyyglxt.error.BusinessException;

import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/10/29 19:41
 * Version: 1.0
 * 健康旅游信息业务
 */
public interface ITravelService {
    //查询一个健康旅游信息
    ChineseCulturalDO getTravel(ChineseCulturalDOKey key);

    //查询所有健康旅游信息
    List<ChineseCulturalDO> getTravelList(List<String> chineseCulturalStatus);

    //增加一个健康旅游信息
    int addTravel(ChineseCulturalDO record);

    //删除一个健康旅游信息
    int removeTravel(ChineseCulturalDOKey key);

    //修改一个健康旅游信息
    int updateTravel(ChineseCulturalDO record);

    //修改一个健康旅游信息状态
    int changeTravelStatus(ChineseCulturalDOKey key, String chineseCulturalStatus);
}
