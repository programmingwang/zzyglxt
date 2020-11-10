package com.zyyglxt.service;

import com.zyyglxt.dataobject.FamPreDO;
import com.zyyglxt.dataobject.FamPreDOKey;
import com.zyyglxt.error.BusinessException;

import java.util.List;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/10/31 12:10
 */
public interface FamPreDOService {
  /*
    历史名方添加、删除、修改、查询实现接口
   */
  int insertSelective(FamPreDO record) throws BusinessException;
  int deleteByPrimaryKey(FamPreDOKey key);
  int updateByPrimaryKeySelective(FamPreDO record) throws BusinessException;
  FamPreDO selectByPrimaryKey(FamPreDOKey key);
  List<FamPreDO> selectAllFamPre();//查询所有历史名方
  int increaseVisitNumFamPre(FamPreDOKey key);//增加浏览次数
  List<FamPreDO> searchFamPre(String keyWord);//关键字查询
}
