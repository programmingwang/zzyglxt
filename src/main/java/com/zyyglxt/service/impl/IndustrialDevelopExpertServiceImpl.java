package com.zyyglxt.service.impl;

import com.zyyglxt.dao.IndustrialDevelopExpertDOMapper;
import com.zyyglxt.dao.IndustrialDevelopExpertRefDOMapper;
import com.zyyglxt.dataobject.IndustrialDevelopExpertDO;
import com.zyyglxt.dataobject.IndustrialDevelopExpertDOKey;
import com.zyyglxt.dataobject.IndustrialDevelopExpertRefDO;
import com.zyyglxt.dataobject.IndustrialDevelopExpertRefDOKey;
import com.zyyglxt.service.IIndustrialDevelopExpertService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;

/**
 * @Author lrt
 * @Date 2020/10/29 15:17
 * @Version 1.0
 **/
@Service
public class IndustrialDevelopExpertServiceImpl implements IIndustrialDevelopExpertService {

    @Resource
    IndustrialDevelopExpertDOMapper developExpertDOMapper;

    @Resource
    IndustrialDevelopExpertRefDOMapper developExpertRefDOMapper;


    @Override
    public void addExpert(IndustrialDevelopExpertDO record) {
        record.setCreater("未定义");
        record.setUpdater("未定义");
        record.setItemcreateat(new Date());
        record.setItemupdateat(new Date());
        developExpertDOMapper.insertSelective(record);
    }

    @Override
    public void delExpert(IndustrialDevelopExpertDOKey key) {
        developExpertDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    public void updExpert(IndustrialDevelopExpertDO record) {
        record.setUpdater("未定义");
        record.setItemupdateat(new Date());
        developExpertDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public void addExpertRef(IndustrialDevelopExpertRefDO record) {
        record.setCreater("未定义");
        record.setUpdater("未定义");
        record.setItemcreateat(new Date());
        record.setItemupdateat(new Date());
        developExpertRefDOMapper.insertSelective(record);
    }

    @Override
    public void delExpertRef(IndustrialDevelopExpertRefDOKey key) {
        developExpertRefDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    public void updExpertRef(IndustrialDevelopExpertRefDO record) {
        record.setUpdater("未定义");
        record.setItemupdateat(new Date());
        developExpertRefDOMapper.updateByPrimaryKeySelective(record);
    }
}
