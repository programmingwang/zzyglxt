package com.zyyglxt.service;

import com.zyyglxt.dataobject.DictDO;
import com.zyyglxt.dataobject.DictDOKey;

public interface IDictDOService {

    /*删除数据字典*/
    int deleteByPrimaryKey(DictDOKey key);

    /*新增数据字典*/
    int insert(DictDO record);

    /*新增数据字典跳过NULL*/
    int insertSelective(DictDO record);

    /*查找数据字典*/
    DictDO selectByPrimaryKey(DictDOKey key);

    /*修改数据字典跳NULL*/
    int updateByPrimaryKeySelective(DictDO record);

    /*修改数据字典*/
    int updateByPrimaryKey(DictDO record);
}
