package com.zyyglxt.service.impl;

import com.zyyglxt.dao.IndustrialDevelopExpertRefDOMapper;
import com.zyyglxt.dataobject.IndustrialDevelopExpertRefDO;
import com.zyyglxt.dataobject.IndustrialDevelopExpertRefDOKey;
import com.zyyglxt.dataobject.IndustrialDevelopTopicDO;
import com.zyyglxt.dto.ExmaineDto;
import com.zyyglxt.service.IExmaineService;
import com.zyyglxt.service.IIndustrialDevelopTopicService;
import com.zyyglxt.util.UsernameUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/11/21 13:19
 * Version: 1.0
 */
@Service
public class ExmaineServiceImpl implements IExmaineService {
    @Resource
    private IndustrialDevelopExpertRefDOMapper expertRefDOMapper;

    @Resource
    private IIndustrialDevelopTopicService developTopicService;

    @Resource
    private UsernameUtil usernameUtil;

    @Override
    public int deleteByPrimaryKey(Integer itemid, String itemcode) {
        IndustrialDevelopExpertRefDOKey key = new IndustrialDevelopExpertRefDOKey(itemid,itemcode);
        return expertRefDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    public int insert(IndustrialDevelopExpertRefDO record) {
        return expertRefDOMapper.insert(record);
    }

    @Override
    public int insertSelective(IndustrialDevelopExpertRefDO record) {
        String user = usernameUtil.getOperateUser();
        record.setCreater(user);
        record.setUpdater(user);
        record.setItemcreateat(new Date());
        return expertRefDOMapper.insertSelective(record);
    }

    @Override
    public IndustrialDevelopExpertRefDO selectByPrimaryKey(Integer itemid, String itemcode) {
        IndustrialDevelopExpertRefDOKey key = new IndustrialDevelopExpertRefDOKey(itemid,itemcode);
        return expertRefDOMapper.selectByPrimaryKey(key);
    }

    @Override
    public int updateByPrimaryKeySelective(IndustrialDevelopExpertRefDO record) {
        return expertRefDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int updateByPrimaryKey(IndustrialDevelopExpertRefDO record) {
        return expertRefDOMapper.updateByPrimaryKey(record);
    }

    @Override
    public List<ExmaineDto> selectAll() {
        List<IndustrialDevelopExpertRefDO> industrialDevelopExpertRefDOS = expertRefDOMapper.selectAll();
        List<ExmaineDto> exmaineDtos = new ArrayList<>();
        for (IndustrialDevelopExpertRefDO industrialDevelopExpertRefDO : industrialDevelopExpertRefDOS) {
            ExmaineDto exmaineDto = new ExmaineDto();
            BeanUtils.copyProperties(industrialDevelopExpertRefDO,exmaineDto);
            IndustrialDevelopTopicDO topic = developTopicService.getTopic(industrialDevelopExpertRefDO.getTopicCode());
            exmaineDto.setProjectName(topic.getProjectName()).setCompany(topic.getCompany()).setProjectNo(topic.getProjectNo());
            exmaineDtos.add(exmaineDto);
        }
        return exmaineDtos;
    }

    @Override
    public List<IndustrialDevelopExpertRefDO> selectByTopicCode(String topicCode) {
        return expertRefDOMapper.selectByTopicCode(topicCode);
    }

    @Override
    public int deleteByTopicCode(String topicCode) {
        return expertRefDOMapper.deleteByTopicCode(topicCode);
    }
}
