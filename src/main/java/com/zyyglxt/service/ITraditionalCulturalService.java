package com.zyyglxt.service;

import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;

import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/10/29 10:45
 * Version: 1.0
 * 中医医史业务
 */
public interface ITraditionalCulturalService {
    //查询一个中医医史
    ChineseCulturalDO getTraditionalCultural(ChineseCulturalDOKey key);

    //查询所有中医医史
    List<ChineseCulturalDO> getTraditionalCulturalList();

    //增加一个中医医史
    int addTraditionalCultural(ChineseCulturalDO record);

    //删除一个中医医史
    int removeTraditionalCultural(ChineseCulturalDOKey key);

    //修改一个中医医史
    int updateTraditionalCultural(ChineseCulturalDOKey key,ChineseCulturalDO record);

    //修改一个中医医史状态

}
