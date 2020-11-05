package com.zyyglxt.service;

import com.zyyglxt.dataobject.DictitemDO;
import com.zyyglxt.dataobject.DictitemDOKey;

public interface IDictitemDOService {
    /**
     * @version 1.0
     * @Author zs
     * @time 2020/11/05 15:07
     */

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
