package com.zyyglxt.service;

import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;

import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/10/29 10:45
 * Version: 1.0
 * 文化场馆业务
 */
public interface ICulturalVenuesService {
    //查询一个文化场馆
    ChineseCulturalDO getCulturalVenues(ChineseCulturalDOKey key);

    //查询所有文化场馆
    List<ChineseCulturalDO> getCulturalVenuesList();

    //增加一个文化场馆
    int addCulturalVenues(ChineseCulturalDO record);

    //删除一个文化场馆
    int removeCulturalVenues(ChineseCulturalDOKey key);

    //修改一个文化场馆
    int updateCulturalVenues(ChineseCulturalDO record);

    //修改一个文化场馆状态
    int changeCulturalVenuesStatus(ChineseCulturalDOKey key, String chineseCulturalStatus);
}
