package com.zyyglxt.service.impl;


import com.zyyglxt.dao.IndustrialDevelopExpertDtoMapper;
import com.zyyglxt.dao.UserDOMapper;
import com.zyyglxt.dataobject.UserDO;
import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopExpertDto;
import com.zyyglxt.service.IIndustrialDevelopExpertService;
import com.zyyglxt.validator.ValidatorImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.UUID;


/**
 * @Author ZS
 * @Date 2020/11/15 15:17
 * @Version 1.0
 **/
@Service
public class IndustrialDevelopExpertServiceImpl implements IIndustrialDevelopExpertService {

    @Resource
    IndustrialDevelopExpertDtoMapper developExpertDtoMapper;

    @Resource
    UserDOMapper userDOMapper;


    @Resource
    ValidatorImpl validator;
    //新增专家信息
    @Override
    public void addExpert(IndustrialDevelopExpertDto record) {
        UserDO userDO = new UserDO();
        String itemCode=UUID.randomUUID().toString();
        userDO.setItemcode(itemCode);
        userDO.setUsername(record.getUsername());
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String password = encoder.encode("1234");
        userDO.setPassword(password);
        userDO.setName(record.getName());
        userDO.setGender(record.getGender());
        userDO.setMobilephone(record.getMobilephone());
        userDO.setCreater(record.getCreater());
        userDO.setUpdater(record.getUpdater());
        userDOMapper.insertSelective(userDO);
        record.setUserCode(itemCode);
        record.setItemcode(UUID.randomUUID().toString());
        developExpertDtoMapper.insertSelective(record);

    }

    //删除专家信息
    @Override
    public int delExpert(String itemCode) {
        return developExpertDtoMapper.deleteByPrimaryKey(itemCode);
    }

    //重置密码
    @Override
    public int resetPassword(Integer itemid, String itemcode) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String password = encoder.encode("1234");
        return developExpertDtoMapper.resetPassword(itemid,itemcode,password);
    }
    //查看所有专家信息
    @Override
    public List<IndustrialDevelopExpertDto> getExperts() {
        return developExpertDtoMapper.selectAll();
    }
    //查看专家个人信息
    @Override
    public UserDO selectByPrimaryKey(String itemcode) {
        return  developExpertDtoMapper.selectByPrimaryKey(itemcode);
    }


}
