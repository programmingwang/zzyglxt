package com.zyyglxt.service;

import com.zyyglxt.dataobject.HospDO;
import com.zyyglxt.dataobject.HospDOKey;
import com.zyyglxt.dto.HospDto;
import com.zyyglxt.dto.StatusDto;

import java.util.List;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/10/29 10:21
 */
public interface IHospService {
    //增加医院记录
    int addHosp(HospDO hospDO);
    //更新医院记录
    int updateHosp(HospDO hospDO);
    //删除医院记录
    int deleteHosp(HospDOKey hospDOKey);
    //查询医院记录根据前端传来多个状态
    List<HospDto> selectAllHosp(List<String> hospitalStatus);
    //查询医院记录通过关键字，即搜索
    List<HospDto> searchHosp(String keyWord);
    //查询医院记录通过itemCode
    HospDto selectHospByItemCode(String itemCode);
    //查询医院记录通过一个状态
    List<HospDto> selectByStatus(String status);
    //更新医院记录状态
    int updateStatus(StatusDto statusDto);
    //查询全部医院记录
    List<HospDto> selectAllNoStatus();
    //查询医院记录通过OrgCode
    HospDO selectByOrgCode(String orgCode);
}
