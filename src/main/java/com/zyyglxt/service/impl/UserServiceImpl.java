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
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.regex.Pattern;

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
//        if (!"主研人".equals(userRoleRefDO.getPlatRole())){
////            //删除organization
////            OrganizationDO organizationDO = organizationDOMapper.selectByOrgName(userDtO.getOrgName());
////            if (organizationDO != null) {
////                organizationDOMapper.deleteByPrimaryKey(organizationDO.getItemid());
////            }
////        }
        // 企业信息录入页面取消按钮删除企业信息
        if (!StringUtils.isBlank(userDtO.getOrgCode())){
            organizationDOMapper.deleteByNameAndCode(userDtO.getOrgName(),userDtO.getOrgCode());
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
        if (!MobileUtil.checkPhone(record.getMobilephone()) && !MobileUtil.isPhone(record.getMobilephone())) {
            throw new BusinessException("联系电话不正确", EmBusinessError.MOBILEPHONE_ERROR);
        }
        // 用户名的唯一性
        UserDO userDO = userDOMapper.selectByUsername(record.getUsername());
        if (userDO != null) {
            throw new BusinessException("用户名已存在", EmBusinessError.USER_ACCOUNT_ALREADY_EXIST);
        }
        //用户账号：字母开头，至少5位，别超过12个字符
        Pattern reg = Pattern.compile("^[a-zA-Z]([\\s\\S]{4,11})$");
        if (!reg.matcher(record.getUsername()).matches()){
            throw new BusinessException("用户账号须以字母开头，长度为5-12位", EmBusinessError.USERNAME_ERROR);
        }
        if (record.getRoleName().equals("市级中医药管理部门")){
            OrganizationDO organizationDO = organizationDOMapper.selectByOrgName(record.getRoleName());
            record.setOrgCode(organizationDO.getItemcode());
            record.setRoleName("科研项目-市级");
            record.setType(21);
        } else if (record.getRoleName().equals("科研项目申报单位")){
            OrganizationDO organizationDO = organizationDOMapper.selectByOrgName(record.getRoleName());
            record.setOrgCode(organizationDO.getItemcode());
            record.setType(8);
        } else if (record.getRoleName().equals("主研人")){
//            OrganizationDO organizationDO = organizationDOMapper.selectByOrgName("科研项目申报单位");
//            record.setOrgCode(organizationDO.getItemcode());
            record.setType(7);
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
        String password = encoder.encode("123456");
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
    public List<UserDO> selectAllUser(String itemcode, String username) {
        UserDO userDO = userDOMapper.selectByUsername(username);
        List<UserDO> userDOList = new ArrayList<UserDO>();
        if (userDO.getType() == 22) {
            userDOList = userDOMapper.selectAllUser(itemcode, username);
        } else {
            userDOList = userDOMapper.selectAllUser2(itemcode, username,usernameUtil.getOrgItemCode());
        }

        return userDOList;
    }

    @Override
    public List<UserDO> selectAllUser3(String itemcode, String username) {
        //UserDO userDO = userDOMapper.selectByUsername(username);
        return userDOMapper.selectAllUser3(itemcode, username);
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
