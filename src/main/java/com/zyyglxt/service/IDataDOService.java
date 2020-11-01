package com.zyyglxt.service;

import com.zyyglxt.dataobject.DataDO;
import com.zyyglxt.dataobject.DataDOKey;

import java.util.List;

/**
 * @Author huangtao
 * @Date 2020/10/29 10:17
 * @Version 1.0
 */
public interface IDataDOService {
    DataDO selectByPrimaryKey(DataDOKey key);

    void insertSelective(DataDO record);

    void deleteByPrimaryKey(DataDOKey key);

    void updateByPrimaryKeySelective(DataDO record);

    List<DataDO> selectAll();

    List<DataDO> searchDataDO(String keyWord);
}
