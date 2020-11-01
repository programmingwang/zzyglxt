package com.zyyglxt.service.impl;

import com.zyyglxt.dao.RoleDOMapper;
import com.zyyglxt.dao.UserDOMapper;
import com.zyyglxt.dao.UserRoleRefDOMapper;
import com.zyyglxt.dataobject.UserDO;
import com.zyyglxt.dataobject.UserRoleRefDO;
import com.zyyglxt.dto.UserDto;
import com.zyyglxt.service.IUserService;
import com.zyyglxt.util.MobileUtil;
import com.zyyglxt.util.UserUtil;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

/**
 * @Author nongcn
 * @Date 2020/10/29 11:25
 * @Version 1.0
 */
@Service
public class IUserServiceImpl implements IUserService {

    @Resource
    UserDOMapper userDOMapper;
    @Resource
    RoleDOMapper roleDOMapper;
    @Resource
    UserRoleRefDOMapper userRoleRefDOMapper;

    /**
     * 用户注册
     *
     * @param userDO
     */
    @Override
    public void Register(UserDO userDO) {
        // 根据用户名查询数据库，若查询到数据，表示该用户名已存在，不能注册
        UserDO username = userDOMapper.selectByUsername(userDO.getUsername());
        if (username != null) {
            System.out.println("用户名已存在，请更换用户名继续！");
        } else {
            insertUser(userDO);// 添加数据到user表
            insertUserRoleRef(userDO);// 添加数据到user_role_ref表
        }

    }

    /**
     * 注册功能中的添加用户
     * 待完成：需要再添加一个STATE数据，表示当前状态（登录，未登录）
     *
     * @param userDO
     */
    private void insertUser(UserDO userDO) {
        // 生成UUID, 作为用户表唯一标识UUID
        String userItemCode = UUID.randomUUID().toString();
        userDO.setItemcode(userItemCode);

        String username = userDO.getUsername();// 拿到用户名作为 盐 进行加密
        userDO.setSalt(username);// 将手机号码设置为 盐，存放到数据库中
        String password = userDO.getPassword();// 拿到前端输入的密码
        String salt = userDO.getSalt();// 拿到 盐
        password = DigestUtils.md5Hex(password + salt);// 加盐，实现密码加密
        userDO.setPassword(password);
        userDO.setCreater(userDO.getUsername());// 注册时，注册用户为 创建人
        userDO.setUpdater(userDO.getUsername());// 注册时，注册用户为 修改人
        // 设置为普通用户（0：普通，1：管理员）
        userDO.setType(0);

        userDOMapper.insertSelective(userDO);// 添加数据到user表

    }

    /**
     * 注册功能中添加用户-角色关系
     *
     * @param userDO
     */
    private void insertUserRoleRef(UserDO userDO) {
        String userItemCode = userDO.getItemcode();

        // 生成UUID, 作为用户 - 角色表唯一标识UUID
        String userRoleItemCode = UUID.randomUUID().toString();
        UserRoleRefDO userRoleRefDO = new UserRoleRefDO();
        userRoleRefDO.setItemcode(userRoleItemCode);// 唯一标识UUID
        userRoleRefDO.setUserCode(userItemCode);// 关联user表itemCode字段

        String roleType = roleDOMapper.selectItemCodeByRoleType(0);//根据角色类型查到itemcode
        userRoleRefDO.setRoleCode(roleType);// 关联role表itemCode字段

        userRoleRefDO.setCreater(userDO.getCreater());// 设置创建人
        userRoleRefDO.setUpdater(userDO.getUpdater());// 设置修改人

        userRoleRefDOMapper.insertSelective(userRoleRefDO);// 添加数据到user_role_ref表
    }

    /**
     * 用户登录
     *
     * @param username
     * @param password
     */
    @Override
    public void Login(String username, String password) {
        /*
         将拿到的前端用户名和密码加盐后查询数据库，
         如果查到记录，则登录成功，否则，登录失败
         */
        password = DigestUtils.md5Hex(password + username);
        UserDO userDO = userDOMapper.selectByUsernameAndPassword(username, password);
        if (userDO != null) {
            UserUtil userUtil = new UserUtil();
            userUtil.setUserName(username);// 用户登录进去将用户名存到session中
            userDOMapper.updateStateByUserName("入", userUtil.getUserName());
            System.out.println("登录成功");
        } else {
            System.out.println("登录失败");
        }
    }

    /**
     * 退出登录，更改状态
     */
    @Override
    public void Logout() {
        UserUtil userUtil = new UserUtil();
        userDOMapper.updateStateByUserName("出", userUtil.getUserName());
    }

    /**
     * 修改密码
     *
     * @param userDto
     */
    @Override
    public void UpdatePassword(UserDto userDto) {
        //从session中拿到用户名，然后根据用户名查询数据库，得到角色类型，然后判断是普通用户还是管理员，
        //如果是普通用户则需要输入手机号码和原密码，管理员则直接输入新密码替换原密码（不需要手机号码和原密码）
        UserUtil userUtil = new UserUtil();
        UserDO userDO = userDOMapper.selectByUsername(userUtil.getUserName());
        int userType = userDO.getType();// 用户类型（0：普通，1：管理员）
        System.out.println("用户类型：" + userType);

        // 如果是普通用户
        if (userType == 0) {
            if (MobileUtil.checkPhone(userDto.getMobilePhone())) {
                String mobilePhone = userDto.getMobilePhone();
                System.out.println("输入的手机号码：" + mobilePhone);
                // 根据手机号码查询数据库拿到 盐
                userDO = userDOMapper.selectByMobilePhone(mobilePhone);
                String salt = userDO.getSalt();

                String oldPassword = userDto.getPassword();// 输入的原密码
                oldPassword = DigestUtils.md5Hex(oldPassword + salt);// 输入的原密码+盐计算
                // 数据库查询到的原密码和输入的 原密码+盐计算后 比对
                if (userDO.getPassword().equals(oldPassword)) {
                    String newPassword = userDto.getNewPassword();// 第一次输入的新密码
                    String checkNewPassword = userDto.getCheckNewPassword();// 第二次输入的新密码
                    // 输入不能为空
                    if (StringUtils.isEmpty(newPassword) || StringUtils.isEmpty(checkNewPassword)) {
                        System.out.println("密码输入不能为空，请重新输入！");
                    } else {
                        // 判断两次输入的新密码是否一致
                        if (newPassword.equals(checkNewPassword)) {
                            userDto.setNewPassword(DigestUtils.md5Hex(userDto.getNewPassword() + salt));
                            userDOMapper.updatePasswordByMobilePhone(userDto.getNewPassword(), mobilePhone);
                        } else {
                            System.out.println("两次输入的新密码不一致，请重新输入！");
                        }
                    }
                } else {
                    System.out.println("输入的旧密码错误，请重新输入！");
                }
            } else {
                System.out.println("手机号码不正确！");
            }
        } else if (userType == 1) {
            // 如果是管理员
            String username = userUtil.getUserName();

            String newPassword = userDto.getNewPassword();// 第一次输入的新密码
            String checkNewPassword = userDto.getCheckNewPassword();// 第二次输入的新密码
            // 判断两次输入的新密码是否一致
            if (StringUtils.isEmpty(newPassword) || StringUtils.isEmpty(checkNewPassword)) {
                System.out.println("密码输入不能为空，请重新输入！");
            } else {
                if (newPassword.equals(checkNewPassword)) {
                    userDto.setNewPassword(DigestUtils.md5Hex(userDto.getNewPassword() + username));
                    userDOMapper.updatePasswordByUserName(userDto.getNewPassword(), username);
                } else {
                    System.out.println("两次输入的新密码不一致，请重新输入！");
                }
            }
        }
    }
}

