package com.zyyglxt.service;

import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;
import com.zyyglxt.dataobject.CulturalResourcesDO;
import com.zyyglxt.dataobject.CulturalResourcesDOKey;
import com.zyyglxt.error.BusinessException;

import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/10/29 10:45
 * Version: 1.0
 * 中医流派业务
 */
public interface ITraditionalSchoolService {
    //查询一个中医流派
    CulturalResourcesDO getTraditionalSchool(CulturalResourcesDOKey key);

    //查询所有中医流派
    List<CulturalResourcesDO> getTraditionalSchoolList();

    //增加一个中医流派
    int addTraditionalSchool(CulturalResourcesDO record);

    //删除一个中医流派
    int removeTraditionalSchool(CulturalResourcesDOKey key);

    //修改一个中医流派
    int updateTraditionalSchool(CulturalResourcesDO record);

    //修改一个中医流派状态
    int changeTraditionalSchoolStatus(CulturalResourcesDOKey key, String chineseCulturalStatus);
}
