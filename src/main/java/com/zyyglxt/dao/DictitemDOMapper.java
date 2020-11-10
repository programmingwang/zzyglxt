package com.zyyglxt.dao;

import com.zyyglxt.dataobject.DictitemDO;
import com.zyyglxt.dataobject.DictitemDOKey;

public interface DictitemDOMapper {
    /*删除数据字典项*/
    int deleteByPrimaryKey(DictitemDOKey key);
    /*新增数据字典项*/
    int insert(DictitemDO record);
    /*新增数据字典项跳NULL*/
    int insertSelective(DictitemDO record);
    /*查找数据字典项*/
    DictitemDO selectByPrimaryKey(DictitemDOKey key);
    /*修改数据字典项跳NULL*/
    int updateByPrimaryKeySelective(DictitemDO record);
    /*修改数据字典项*/
    int updateByPrimaryKey(DictitemDO record);
}