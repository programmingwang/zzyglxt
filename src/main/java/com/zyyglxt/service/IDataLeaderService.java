package com.zyyglxt.service;

import com.zyyglxt.dataobject.DataDO;
import com.zyyglxt.dataobject.DataDOKey;
import com.zyyglxt.dto.DataDto;

import java.util.List;

/**
 * @Author huangtao
 * @Date 2020/10/29 10:17
 * @Version 1.0
 */
public interface IDataLeaderService {
    //查询一个领导讲话
    DataDO selectLeader(DataDOKey key);

    //查询所有领导讲话
    List<DataDto> selectLeaderList(List<String> dataStatus);

    //增加一个领导讲话
    int insertLeader(DataDO record);

    //删除一个领导讲话
    int deleteLeader(DataDOKey key);

    //修改领导讲话
    int updateLeader(DataDO record);

    int changeStatus(DataDOKey key, String dataDelayedRelease, String dataStatus);
    //获取首页数据
    List<String> selectForMainPage();
}
