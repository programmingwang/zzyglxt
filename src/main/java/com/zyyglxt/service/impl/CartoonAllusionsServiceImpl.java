package com.zyyglxt.service.impl;

import com.zyyglxt.dao.ChineseCulturalDOMapper;
import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;
import com.zyyglxt.service.ICartoonAllusionsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/10/29 19:34
 * Version: 1.0
 */
@Service
public class CartoonAllusionsServiceImpl implements ICartoonAllusionsService {
    @Resource
    private ChineseCulturalDOMapper chineseCulturalDOMapper;

    @Override
    public ChineseCulturalDO getCartoonAllusions(ChineseCulturalDOKey key) {
        return chineseCulturalDOMapper.selectByPrimaryKey(key,"漫画典故");
    }

    @Override
    public List<ChineseCulturalDO> getCartoonAllusionsList() {
        return chineseCulturalDOMapper.selectChineseCulturalList("漫画典故");
    }

    @Override
    @Transactional
    public int addCartoonAllusions(ChineseCulturalDO record) {
        chineseCulturalDOMapper.insertSelective(record);
        record.setItemcreateat(new Date());
        record.setCreater("");
        record.setItemupdateat(new Date());
        record.setUpdater("");
        record.setChineseCulturalType("漫画典故");
        return 0;
    }

    @Override
    @Transactional
    public int removeCartoonAllusions(ChineseCulturalDOKey key) {
        return chineseCulturalDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    @Transactional
    public int updateCartoonAllusions(ChineseCulturalDOKey key, ChineseCulturalDO record) {
        record.setUpdater("");
        record.setItemupdateat(new Date());
        return chineseCulturalDOMapper.updateByPrimaryKeySelective(key,record);
    }
}
