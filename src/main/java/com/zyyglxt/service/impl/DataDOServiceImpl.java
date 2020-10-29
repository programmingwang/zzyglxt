package com.zyyglxt.service.impl;

import com.zyyglxt.dao.DataDOMapper;
import com.zyyglxt.dataobject.DataDO;
import com.zyyglxt.dataobject.DataDOKey;
import com.zyyglxt.service.IDataDOService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @Author huangtao
 * @Date 2020/10/29 10:18
 * @Version 1.0
 */
@Service
public class DataDOServiceImpl  implements IDataDOService{
    @Resource
    DataDOMapper dataDOMapper;

    @Override
    public DataDO selectByPrimaryKey(DataDOKey key) {
        return dataDOMapper.selectByPrimaryKey(key);
    }

    @Override
    public void insertSelective(DataDO record) {
        dataDOMapper.insertSelective(record);
    }

    @Override
    public void deleteByPrimaryKey(DataDOKey key) {
        dataDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    public void updateByPrimaryKeySelective(DataDO record) {
        dataDOMapper.updateByPrimaryKeySelective(record);
    }
}
