package com.zyyglxt.service.impl;

import com.zyyglxt.dao.DataDOMapper;
import com.zyyglxt.dataobject.DataDO;
import com.zyyglxt.dataobject.DataDOKey;
import com.zyyglxt.service.IDataDOService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

import java.util.Date;
import java.util.List;

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
    public DataDO selectNewsInf(DataDOKey key) {
        return dataDOMapper.selectByPrimaryKey(key,"新闻信息");
    }

    @Override
    public List<DataDO> selectAllNewsInf(String dataType) {
        return dataDOMapper.selectByAllInf(dataType);
    }

    @Override
    @Transactional
    public int insertNewsInf(DataDO record) {
        record.setItemcreateat(new Date());
        record.setCreater("test");
        record.setItemupdateat(new Date());
        record.setUpdater("test");
        record.setDataType("新闻管理");
        return dataDOMapper.insertSelective(record);
    }

    @Override
    @Transactional
    public int deleteNewsInf(DataDOKey key) {
        return dataDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    @Transactional
    public int updateNewsInf(DataDO record) {
        record.setUpdater("asd");
        record.setItemupdateat(new Date());
        return dataDOMapper.updateByPrimaryKeySelective(record);
    }

    /**
     * 关键字搜索
     * @param keyWord
     * @return
     */
    @Override
    public List<DataDO> searchDataDO(String keyWord) {
        return dataDOMapper.searchDataDO(keyWord);
    }

}
