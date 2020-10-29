package com.zyyglxt.service;

import com.zyyglxt.dataobject.HealthCareChineseMedicineDO;
import com.zyyglxt.dataobject.HealthCareChineseMedicineDOKey;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/10/29 12:22
 */
public interface HealthCareChineseMedicineDOService {
   /*
    中医药科普知识添加、删除、修改、查询实现接口
   **/
    int insert(HealthCareChineseMedicineDO record);
    int deleteByPrimaryKey(HealthCareChineseMedicineDOKey key);
    int updateByPrimaryKey(HealthCareChineseMedicineDO record);
    HealthCareChineseMedicineDO selectByPrimaryKey(HealthCareChineseMedicineDOKey key);
}
