package com.zyyglxt.service.impl;

import com.zyyglxt.dao.HospDOMapper;
import com.zyyglxt.dataobject.HospDO;
import com.zyyglxt.dataobject.HospDOKey;
import com.zyyglxt.service.IHospService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.UUID;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/10/29 10:22
 */
@Service
public class HospServiceImpl implements IHospService {
    @Resource
    HospDOMapper hospDOMapper;

    @Override
    public int addHosp(HospDO hospDO) {
        hospDO.setItemcode(UUID.randomUUID().toString());
        return hospDOMapper.insertSelective(hospDO);
    }

    @Override
    public int updateHosp(HospDO hospDO) {
        return hospDOMapper.updateByPrimaryKeySelective(hospDO);
    }

    @Override
    public int deleteHosp(HospDOKey hospDOKey) {
        return hospDOMapper.deleteByPrimaryKey(hospDOKey);
    }

    @Override
    public List<HospDO> selectAllHosp() {
        return hospDOMapper.selectAllHosp();
    }

    /*
    搜索关键字，包括搜名称，等级，市，县，地址
     */
    @Override
    public List<HospDO> searchHosp(String keyWord) {
        return hospDOMapper.searchHosp(keyWord);
    }

    @Override
    public List<HospDO> top5Hosp() {
        return hospDOMapper.top5Hosp();
    }

}
