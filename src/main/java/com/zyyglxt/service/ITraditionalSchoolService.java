package com.zyyglxt.service;

import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;

import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/10/29 10:45
 * Version: 1.0
 * 中医流派业务
 */
public interface ITraditionalSchoolService {
    //查询一个中医流派
    ChineseCulturalDO getTraditionalSchool(ChineseCulturalDOKey key);

    //查询所有中医流派
    List<ChineseCulturalDO> getTraditionalSchoolList();

    //增加一个中医流派
    int addTraditionalSchool(ChineseCulturalDO record);

    //删除一个中医流派
    int removeTraditionalSchool(ChineseCulturalDOKey key);

    //修改一个中医流派
    int updateTraditionalSchool(ChineseCulturalDOKey key, ChineseCulturalDO record);

    //修改一个中医流派状态

}
