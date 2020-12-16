package com.zyyglxt.service.impl;

import com.zyyglxt.dao.OrganizationDOMapper;
import com.zyyglxt.dao.RoleDOMapper;
import com.zyyglxt.dao.UserDOMapper;
import com.zyyglxt.dao.UserRoleRefDOMapper;
import com.zyyglxt.dataobject.*;
import com.zyyglxt.dto.UserDto;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;

import com.zyyglxt.util.MobileUtil;
import com.zyyglxt.util.UUIDUtils;

import com.zyyglxt.service.UserService;
import com.zyyglxt.util.UUIDUtils;
import com.zyyglxt.util.UsernameUtil;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

/**
 * @Author wanglx
 * @Date 2020/10/28 0028 21:25
 * @Version 1.0
 */
@Service
public class UserServiceImpl implements UserService {
    @Resource
    UserDOMapper userDOMapper;
    @Autowired
    UserRoleRefDOMapper userRoleRefDOMapper;
    @Autowired
    RoleDOMapper roleDOMapper;
    @Autowired
    OrganizationDOMapper organizationDOMapper;
    @Autowired
    private ValidatorImpl validator;
    @Autowired
    UsernameUtil usernameUtil;

    @Override
    public void deleteUserByUsername(UserDto userDtO) {
        //删除用户角色关系
        UserDO userDO = userDOMapper.selectByUsername(userDtO.getUsername());

        UserRoleRefDOKey userRoleRefDOKey = new UserRoleRefDOKey();
        UserRoleRefDO userRoleRefDO = userRoleRefDOMapper.selectByUserCode(userDO.getItemcode());
        userRoleRefDOKey.setItemid(userRoleRefDO.getItemid());
        userRoleRefDOKey.setItemcode(userRoleRefDO.getItemcode());
        userRoleRefDOMapper.deleteByPrimaryKey(userRoleRefDOKey);
        //删除用户
        UserDOKey userDOKey = new UserDOKey();
        userDOKey.setItemid(userDO.getItemid());
        userDOKey.setItemcode(userDO.getItemcode());
        userDOMapper.deleteByPrimaryKey(userDOKey);
        //删除hospital
        OrganizationDO organizationDO = organizationDOMapper.selectByOrgName(userDtO.getOrgName());
        if (organizationDO != null) {
            organizationDOMapper.deleteByPrimaryKey(organizationDO.getItemid());
        }
    }

    @Override
    public int insert(UserDO record) {
        return userDOMapper.insert(record);
    }

    @Override
    @Transactional
    public void insertUserSelective(UserDO record)  {
        ValidatorResult result = validator.validate(record);
        if (result.isHasErrors()) {
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        // 验证手机号码
        if (!MobileUtil.checkPhone(record.getMobilephone())) {
            throw new BusinessException("手机号码不正确", EmBusinessError.MOBILEPHONE_ERROR);
        }
        // 用户名的唯一性
        UserDO userDO = userDOMapper.selectByUsername(record.getUsername());
        if (userDO != null) {
            throw new BusinessException("用户名已存在", EmBusinessError.USER_ACCOUNT_ALREADY_EXIST);
        }
        if (record.getRoleName().equals("市级中医药管理部门")){
            record.setRoleName("科研项目-市级");
            record.setType(21);
        } else if (record.getRoleName().equals("科研项目申报单位")){
            record.setType(8);
        }
        //添加用户
        record.setUpdater(usernameUtil.getOperateUser());
        record.setCreater(usernameUtil.getOperateUser());
        record.setPassword(new BCryptPasswordEncoder().encode("123456"));
        record.setItemcode(UUIDUtils.getUUID());
        userDOMapper.insertSelective(record);
        //分配角色
        //查询角色role_code
        RoleDO roleDO = roleDOMapper.selectByRoleName(record.getRoleName());
        UserRoleRefDO userRoleRefDO = new UserRoleRefDO();
        userRoleRefDO.setUpdater(usernameUtil.getOperateUser());
        userRoleRefDO.setCreater(usernameUtil.getOperateUser());
        userRoleRefDO.setItemcode(UUIDUtils.getUUID());
        userRoleRefDO.setRoleCode(roleDO.getItemcode());
        userRoleRefDO.setUserCode(record.getItemcode());
        userRoleRefDO.setPlatRole(roleDO.getRoleName());
        userRoleRefDOMapper.insertSelective(userRoleRefDO);
    }


    @Override
    public UserDO selectByPrimaryKey(UserDOKey key) {
        return userDOMapper.selectByPrimaryKey(key);
    }

    @Override
    public void updateByPrimaryKeySelective(UserDO userDO) {
        UserDOKey userDOKey = new UserDOKey();
        userDOKey.setItemid(userDO.getItemid());
        userDOKey.setItemcode(userDO.getItemcode());
        UserDO userDO1 = userDOMapper.selectByPrimaryKey(userDOKey);
        //更新用户信息
        userDO.setUpdater(usernameUtil.getOperateUser());
        userDOMapper.updateByPrimaryKeySelective(userDO);
        //更新角色
        if (!userDO1.getType().equals(userDO.getType()) && userDO.getType() != null) {
            RoleDO roleDO = roleDOMapper.selectByRoleType(userDO.getType());
            UserRoleRefDO userRoleRefDO = new UserRoleRefDO();
            //获取需要更新的userRoleRefDO
            UserRoleRefDO userRoleRefDO1 = userRoleRefDOMapper.selectByUserCode(userDO.getItemcode());
            userRoleRefDO.setUpdater(usernameUtil.getOperateUser());
            userRoleRefDO.setItemid(userRoleRefDO1.getItemid());
            userRoleRefDO.setItemcode(userRoleRefDO1.getItemcode());
            userRoleRefDO.setRoleCode(roleDO.getItemcode());
            userRoleRefDO.setUserCode(userDO.getItemcode());
            userRoleRefDO.setPlatRole(roleDO.getRoleName());
            userRoleRefDOMapper.updateByPrimaryKeySelective(userRoleRefDO);
        }
    }

    @Override
    public void resetPassword(UserDO userDO) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String password = encoder.encode("1234");
        userDO.setPassword(password);
        userDOMapper.updateByPrimaryKeySelective(userDO);
    }

    @Override
    public int updateByPrimaryKeyWithBLOBs(UserDO record) {
        return userDOMapper.updateByPrimaryKeyWithBLOBs(record);
    }

    @Override
    public int updateByPrimaryKey(UserDO record) {
        return userDOMapper.updateByPrimaryKey(record);
    }

    @Override
    public List<UserDO> selectAllUser() {
        List<UserDO> users = userDOMapper.selectAllUser();

        System.out.println("66666666666666666666: "+users.size());

        int zyr = roleDOMapper.selectByRoleName("主研人").getRoleType();
        int sbdw = roleDOMapper.selectByRoleName("科研项目申报单位").getRoleType();
        int kysj = roleDOMapper.selectByRoleName("科研项目-市级").getRoleType();
        int zj = roleDOMapper.selectByRoleName("专家").getRoleType();

        List<UserDO> userDOList = new ArrayList<UserDO>();
        for (int i = 0; i < users.size(); i++) {
            int roleytpe = users.get(i).getType();
            if (zyr == roleytpe || sbdw == roleytpe || kysj == roleytpe || zj == roleytpe) {

                userDOList.add(users.get(i));
            }
        }

        return userDOList;
    }

    @Override
    public int deleteByUsername(String username) {
        return userDOMapper.deleteByUsername(username);
    }

    @Override
    public UserDO selectByName(String username) {
        return userDOMapper.selectByUsername(username);
    }

}
