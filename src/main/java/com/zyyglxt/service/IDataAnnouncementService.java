package com.zyyglxt.service;

import com.zyyglxt.dataobject.DataDO;
import com.zyyglxt.dataobject.DataDOKey;

import java.util.List;

/**
 * @Author huangtao
 * @Date 2020/10/29 10:17
 * @Version 1.0
 */
public interface IDataAnnouncementService {
    //查询一个通知公告
    DataDO selectAnnouncement(DataDOKey key);

    //查询所有通知公告
    List<DataDO> selectAnnouncementList(List<String> dataStatus);

    //增加一个通知公告
    int insertAnnouncement(DataDO record);

    //删除一个通知公告
    int deleteAnnouncement(DataDOKey key);

    //修改通知公告
    int updateAnnouncement(DataDO record);

    int changeStatus(DataDOKey key, String dataStatus);

    List<DataDO> searchDataDO(String keyWord);
}
