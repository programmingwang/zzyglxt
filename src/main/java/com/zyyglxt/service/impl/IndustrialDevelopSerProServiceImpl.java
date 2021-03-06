package com.zyyglxt.service.impl;

import com.zyyglxt.util.UUIDUtils;
import com.zyyglxt.util.UsernameUtil;
import org.springframework.stereotype.Service;
import javax.annotation.Resource;
import com.zyyglxt.dataobject.IndustrialDevelopSerPro;
import com.zyyglxt.dao.IndustrialDevelopSerProMapper;
import com.zyyglxt.service.IndustrialDevelopSerProService;

import java.util.List;

/**
   *@Author lrt
   *@Date 2020/11/6 20:00
   *@Version 1.0
**/
@Service
public class IndustrialDevelopSerProServiceImpl implements IndustrialDevelopSerProService{

    @Resource
    private IndustrialDevelopSerProMapper industrialDevelopSerProMapper;
    @Resource
    UsernameUtil usernameUtil;
    @Override
    public int deleteByPrimaryKey(Integer itemid,String itemcode) {
        return industrialDevelopSerProMapper.deleteByPrimaryKey(itemid,itemcode);
    }

    @Override
    public int insert(IndustrialDevelopSerPro record) {
        return industrialDevelopSerProMapper.insert(record);
    }

    @Override
    public int insertSelective(IndustrialDevelopSerPro record) {
//        record.setItemcode(UUIDUtils.getUUID());
        record.setOrgCode(usernameUtil.getOrgCode());
        return industrialDevelopSerProMapper.insertSelective(record);
    }

    @Override
    public IndustrialDevelopSerPro selectByPrimaryKey(Integer itemid,String itemcode) {
        return industrialDevelopSerProMapper.selectByPrimaryKey(itemid,itemcode);
    }

    @Override
    public int updateByPrimaryKeySelective(IndustrialDevelopSerPro record) {
        record.setOrgCode(usernameUtil.getOrgCode());
        return industrialDevelopSerProMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int updateByPrimaryKey(IndustrialDevelopSerPro record) {
        return industrialDevelopSerProMapper.updateByPrimaryKey(record);
    }

    @Override
    public List<IndustrialDevelopSerPro> selectAll() {
        return industrialDevelopSerProMapper.selectAll();
    }

    @Override
    public List<IndustrialDevelopSerPro> selectByorgcode() {
        return industrialDevelopSerProMapper.selectByorgcode(usernameUtil.getOrgCode());
    }

}
