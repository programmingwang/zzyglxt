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
 * 中医医史业务
 */
public interface ITraditionalCulturalService {
    //查询一个中医医史
    CulturalResourcesDO getTraditionalCultural(CulturalResourcesDOKey key);

    //查询所有中医医史
    List<CulturalResourcesDO> getTraditionalCulturalList(List<String> chineseCulturalStatus);

    //增加一个中医医史
    int addTraditionalCultural(CulturalResourcesDO record);

    //删除一个中医医史
    int removeTraditionalCultural(CulturalResourcesDOKey key);

    //修改一个中医医史
    int updateTraditionalCultural(CulturalResourcesDO record);

    //修改一个中医医史状态
    int changeTraditionalCulturalStatus(CulturalResourcesDOKey key, String chineseCulturalStatus);
}
