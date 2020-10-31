package com.zyyglxt.service;

import com.zyyglxt.dataobject.FamPreDO;
import com.zyyglxt.dataobject.FamPreDOKey;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/10/31 12:10
 */
public interface FamPreDOService {
  /*
    历史名方添加、删除、修改、查询实现接口
   */
  int insertSelective(FamPreDO record);
  int deleteByPrimaryKey(FamPreDOKey key);
  int updateByPrimaryKeySelective(FamPreDO record);
  FamPreDO selectByPrimaryKey(FamPreDOKey key);
}
