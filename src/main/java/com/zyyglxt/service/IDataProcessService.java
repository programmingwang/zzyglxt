package com.zyyglxt.service;

import com.zyyglxt.dataobject.DataDO;
import com.zyyglxt.dataobject.DataDOKey;

import java.util.List;

/**
 * @Author huangtao
 * @Date 2020/10/29 10:17
 * @Version 1.0
 */
public interface IDataProcessService {
    //查询一个办事流程
    DataDO selectProcess(DataDOKey key);

    //查询所有办事流程
    List<DataDO> selectProcessList(List<String> dataStatus);

    //增加一个办事流程
    int insertProcess(DataDO record);

    //删除一个办事流程
    int deleteProcess(DataDOKey key);

    //修改办事流程
    int updateProcess(DataDO record);

    int changeStatus(DataDOKey key, String dataStatus);

    List<DataDO> searchDataDO(String keyWord);
}
