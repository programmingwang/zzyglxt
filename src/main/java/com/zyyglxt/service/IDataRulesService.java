package com.zyyglxt.service;

import com.zyyglxt.dataobject.DataDO;
import com.zyyglxt.dataobject.DataDOKey;
import com.zyyglxt.dto.DataDto;
import com.zyyglxt.dto.MainPageDto;

import java.util.List;

/**
 * @author qjc
 * @version 1.0
 * @date 2021/2/4 14:02
 */
public interface IDataRulesService {
    //增加一个规章制度
    int insert(DataDO record);
    //删除规章制度信息
    int delete(DataDOKey dataDOKey);
    //更新规章制度信息
    int update(DataDO record);
    //查询一个规章制度
    DataDto getOne(DataDOKey dataDOKey);
    //查询规章制度根据身份状态
    List<DataDto> selectRules(String dataStatus);
    //获取首页数据
    List<MainPageDto> selectForMainPage();

}
