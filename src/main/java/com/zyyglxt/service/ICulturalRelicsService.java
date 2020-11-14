package com.zyyglxt.service;

import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;

import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/10/29 10:45
 * Version: 1.0
 * 文化古迹业务
 */
public interface ICulturalRelicsService {
    //查询一个文化古迹
    ChineseCulturalDO getCulturalRelics(ChineseCulturalDOKey key);

    //查询所有文化古迹
    List<ChineseCulturalDO> getCulturalRelicsList(List<String> chineseCulturalStatus);

    //增加一个文化古迹
    int addCulturalRelics(ChineseCulturalDO record);

    //删除一个文化古迹
    int removeCulturalRelics(ChineseCulturalDOKey key);

    //修改一个文化古迹
    int updateCulturalRelics(ChineseCulturalDO record);

    //修改一个文化古迹状态
    int changeCulturalRelics(ChineseCulturalDOKey key, String chineseCulturalStatus);
}
