package com.zyyglxt.service.impl;

import com.zyyglxt.dao.HospDOMapper;
import com.zyyglxt.dataobject.HospDO;
import com.zyyglxt.dataobject.HospDOKey;
import com.zyyglxt.service.IHospService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/10/29 10:22
 */
@Service
public class HospServiceImpl implements IHospService {
    @Autowired
    HospDOMapper hospDOMapper;

    @Override
    public int addHosp(HospDO hospDO) {
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
    public List<HospDO> getAllHosp() {
        return hospDOMapper.selectAll();
    }

    /*
    搜索关键字，包括搜名称，等级，市，县，地址
     */
    @Override
    public List<HospDO> searchHosp(String keyWord) {
        return hospDOMapper.searchHosp(keyWord);
    }

}
