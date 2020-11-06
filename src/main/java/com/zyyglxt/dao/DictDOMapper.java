package com.zyyglxt.dao;

import com.zyyglxt.dataobject.DictDO;
import com.zyyglxt.dataobject.DictDOKey;

public interface DictDOMapper {
    /**
     * @version 1.0
     * @Author zs
     * @time 2020/11/05 15:05
     */

    /*删除数据字典*/
    int deleteByPrimaryKey(DictDOKey key);

    /*新增数据字典*/
    int insert(DictDO record);

    /*新增数据字典跳NULL*/
    int insertSelective(DictDO record);

    /*查找数据字典*/
    DictDO selectByPrimaryKey(DictDOKey key);

    /*修改数据字典跳NULL*/
    int updateByPrimaryKeySelective(DictDO record);

    /*修改数据字典*/
    int updateByPrimaryKey(DictDO record);
}