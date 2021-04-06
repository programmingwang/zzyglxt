package com.zyyglxt.service.impl;

import com.zyyglxt.dao.IndustrialDevelopExpertRefDOMapper;
import com.zyyglxt.dataobject.IndustrialDevelopExpertRefDO;
import com.zyyglxt.dataobject.IndustrialDevelopExpertRefDOKey;
import com.zyyglxt.dataobject.IndustrialDevelopTopicDO;
import com.zyyglxt.dto.ExmaineDto;
import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopTopicDODto;
import com.zyyglxt.service.IExmaineService;
import com.zyyglxt.service.IIndustrialDevelopTopicService;
import com.zyyglxt.util.UsernameUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Author:wangzh
 * Date: 2020/11/21 13:19
 * Version: 1.0
 */
@Service
@SuppressWarnings("all")
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
        //获得当前表的所有课题code
        List<String> topicCode = expertRefDOMapper.selectAllTopicCode();
        List<ExmaineDto> exmaineDtoList = new LinkedList<>();
        topicCode.forEach(tc ->{
            //获得当前code的所有课题
            List<ExmaineDto> exmaineDtos = expertRefDOMapper.selectAllByTopicCode(tc);
            int zjktsl = exmaineDtos.size();
            if(zjktsl == 1){
                exmaineDtoList.add(exmaineDtos.get(0));
            }else if (zjktsl > 1){
                ExmaineDto exmaineDto = new ExmaineDto();
                //对有多个专家的项目进行拼接
                for (int i = 0; i < zjktsl; i++) {
                    if(i == 0){
                        exmaineDto = exmaineDtos.get(0);
                    } else {
                        //上一个专家的意见 ｜ 下一个专家的意见
                        exmaineDto.setExpertCode(exmaineDto.getExpertCode() + "|" + exmaineDtos.get(i).getExpertCode());
                        exmaineDto.setExmaineStatus(exmaineDto.getExmaineStatus() + "|" + exmaineDtos.get(i).getExmaineStatus());
                        exmaineDto.setScore(exmaineDto.getScore() + "|" + exmaineDtos.get(i).getScore());
                        exmaineDto.setOpinion(exmaineDto.getOpinion() + "|" + exmaineDtos.get(i).getOpinion());
                        continue;
                    }
                }
                exmaineDtoList.add(exmaineDto);
            }
        });
        return exmaineDtoList.stream().sorted(Comparator.comparing(ExmaineDto::getItemupdateat).reversed()).collect(Collectors.toList());
    }

    @Override
    public List<ExmaineDto> selectByExpertCode(String expertCode) {
        return expertRefDOMapper.selectByExpertCode(expertCode);
    }

    @Override
    public List<IndustrialDevelopExpertRefDO> selectByTopicCode(String topicCode) {
        return expertRefDOMapper.selectByTopicCode(topicCode);
    }

    @Override
    public int deleteByTopicCode(String topicCode) {
        return expertRefDOMapper.deleteByTopicCode(topicCode);
    }

    @Override
    public List<IndustrialDevelopTopicDODto> topicAndExpertStatus() {
        return expertRefDOMapper.topicAndExpertStatus();
    }

    @Override
    public int delExpertTopic(IndustrialDevelopExpertRefDO expertRefDO) {
        return expertRefDOMapper.delExpertTopic(expertRefDO.getExpertCode(),expertRefDO.getTopicCode());
    }
}
