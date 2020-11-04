package com.zyyglxt.service;

import com.zyyglxt.dataobject.HealthCareChineseMedicineDO;
import com.zyyglxt.dataobject.HealthCareChineseMedicineDOKey;

import java.util.List;

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
    int updateByPrimaryKeySelective(HealthCareChineseMedicineDO record);
    HealthCareChineseMedicineDO selectByPrimaryKey(HealthCareChineseMedicineDOKey key);
    List<HealthCareChineseMedicineDO> selectAllHealthCareChineseMedicine();//查询所有中医药常识数据
}
