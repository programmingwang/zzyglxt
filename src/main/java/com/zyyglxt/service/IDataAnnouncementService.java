package com.zyyglxt.service;

import com.zyyglxt.dataobject.DataDO;
import com.zyyglxt.dataobject.DataDOKey;
import com.zyyglxt.dto.DataDto;
import com.zyyglxt.dto.MainPageDto;

import java.sql.Date;
import java.util.List;

/**
 * @Author huangtao
 * @Date 2020/10/29 10:17
 * @Version 1.0
 */
public interface IDataAnnouncementService {
    //查询一个通知公告
    DataDto selectAnnouncement(DataDOKey key);

    //查询所有通知公告
    List<DataDto> selectAnnouncementList(String dataStatus);

    //增加一个通知公告
    int insertAnnouncement(DataDO record);

    //删除一个通知公告
    int deleteAnnouncement(DataDOKey key);

    //修改通知公告
    int updateAnnouncement(DataDO record);

    int changeStatus(DataDOKey key, String dataDelayedRelease, String dataStatus);

    List<MainPageDto> selectForMainPage();

}
