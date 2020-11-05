package com.zyyglxt.service;

import com.zyyglxt.dataobject.DataDO;
import com.zyyglxt.dataobject.DataDOKey;
import com.zyyglxt.error.BusinessException;

import java.util.List;

/**
 * @Author huangtao
 * @Date 2020/10/29 10:17
 * @Version 1.0
 */
public interface IDataDOService {
    //查询一个新闻信息
    DataDO selectNewsInf(DataDOKey key);

    //查询所有新闻信息
    List<DataDO> selectAllNewsInf(String dataType);

    //增加一个信息
    int insertNewsInf(DataDO record);

    //删除一个新闻信息
    int deleteNewsInf(DataDOKey key);

    //修改新闻信息
    int updateNewsInf(DataDO record);

    int changeStatus(DataDOKey key, String dataStatus);

    List<DataDO> searchDataDO(String keyWord);


}
