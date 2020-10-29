package com.zyyglxt.service;

import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;

import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/10/29 10:45
 * Version: 1.0
 * 历代名医业务
 */
public interface ITraditionalDoctorService {
    //查询一个历代名医
    ChineseCulturalDO getTraditionalDoctor(ChineseCulturalDOKey key);

    //查询所有历代名医
    List<ChineseCulturalDO> getTraditionalDoctorList();

    //增加一个历代名医
    int addTraditionalDoctor(ChineseCulturalDO record);

    //删除一个历代名医
    int removeTraditionalDoctor(ChineseCulturalDOKey key);

    //修改一个历代名医
    int updateTraditionalDoctor(ChineseCulturalDOKey key, ChineseCulturalDO record);

    //修改一个历代名医状态

}
