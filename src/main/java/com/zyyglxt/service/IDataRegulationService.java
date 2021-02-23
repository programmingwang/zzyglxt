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
public interface IDataRegulationService {
    //查询一个政策法规
    DataDto selectRegulation(DataDOKey key);

    //查询所有政策法规
    List<DataDto> selectRegulationList(String dataStatus);

    //增加一个政策法规
    int insertRegulation(DataDO record);

    //删除一个政策法规
    int deleteRegulation(DataDOKey key);

    //修改政策法规
    int updateRegulation(DataDO record);

    int changeStatus(DataDOKey key, String dataDelayedRelease, String dataStatus);

    List<MainPageDto> selectForMainPage();

}
