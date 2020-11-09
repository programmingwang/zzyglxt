package com.zyyglxt.service.impl;

import com.zyyglxt.common.Result;
import com.zyyglxt.dao.OrganizationDOMapper;
import com.zyyglxt.dao.RoleDOMapper;
import com.zyyglxt.dao.UserDOMapper;
import com.zyyglxt.dao.UserRoleRefDOMapper;
import com.zyyglxt.dataobject.OrganizationDO;
import com.zyyglxt.dataobject.RoleDO;
import com.zyyglxt.dataobject.UserDO;
import com.zyyglxt.dataobject.UserRoleRefDO;
import com.zyyglxt.dto.UpdatePwdDto;
import com.zyyglxt.dto.UserDto;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IUserService;
import com.zyyglxt.util.IDUtil;
import com.zyyglxt.util.MobileUtil;
import com.zyyglxt.util.UserUtil;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;
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
    @Resource
    OrganizationDOMapper organizationDOMapper;
    @Autowired
    ValidatorImpl validator;

    /**
     * 用户注册
     */
    @Override
    @Transactional
    public int Register(UserDto userDto) throws BusinessException {
        ValidatorResult result = validator.validate(userDto);
        if (result.isHasErrors()) {
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        // 根据用户名查询数据库，若查询到数据，表示该用户名已存在，不能注册
        UserDO userDO = userDOMapper.selectByUsername(userDto.getUsername());
        if (userDO != null) {
            throw new BusinessException("用户名已存在，请更换", EmBusinessError.USER_REGISTER_FAILED);
        } else {
            if (MobileUtil.checkPhone(userDto.getMobilePhone())) {
                register(userDto);
                return 200;
            } else {
                throw new BusinessException("手机号不正确", EmBusinessError.MOBILEPHONE_ERROR);
            }
        }
    }

    /**
     * 注册用户
     *
     * @param userDto
     */
    private void register(UserDto userDto) {

        // orgnization 表唯一标识UUID
        String orgItemCode = UUID.randomUUID().toString();
        OrganizationDO organizationDO = new OrganizationDO();
        organizationDO.setItemcode(orgItemCode);
        organizationDO.setOrgName(userDto.getOrgName());
        organizationDO.setOrgIdentify(userDto.getOrgIdentify());
        organizationDO.setOrgCode(userDto.getOrgCode());
        organizationDO.setOrgDescription(userDto.getOrgIdentify());
        organizationDO.setCreater(userDto.getUsername());
        organizationDO.setUpdater(userDto.getUsername());


        // user 表唯一标识UUID
        String userItemCode = UUID.randomUUID().toString();
        UserDO userDO = new UserDO();
        userDO.setItemcode(userItemCode);
        userDO.setOrgCode(orgItemCode);
        userDO.setUsername(userDto.getUsername());
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String password= passwordEncoder.encode(userDto.getPassword());
        userDO.setSalt(userDto.getUsername());// 将 登陆账号 设置为 盐，存放到数据库中
        userDO.setPassword(password);
        userDO.setState("出");
        userDO.setMobilephone(userDto.getMobilePhone());
        userDO.setCreater(userDto.getUsername());// 注册时，注册用户为 创建人
        userDO.setUpdater(userDto.getUsername());// 注册时，注册用户为 修改人
        userDO.setType(0);// 设置为普通用户（0：普通，1：管理员）


        // user_role_ref 表唯一标识UUID
        String userRoleItemCode = UUID.randomUUID().toString();
        UserRoleRefDO userRoleRefDO = new UserRoleRefDO();
        userRoleRefDO.setItemcode(userRoleItemCode);// 唯一标识UUID
        userRoleRefDO.setUserCode(userItemCode);// 关联user表itemCode字段
        RoleDO roleDO = roleDOMapper.selectByRoleType(0);//根据角色类型查到itemcode
        userRoleRefDO.setRoleCode(roleDO.getItemcode());// 关联role表itemCode字段
        userRoleRefDO.setPlatRole("普通用户");
        userRoleRefDO.setCreater(userDto.getUsername());// 设置创建人
        userRoleRefDO.setUpdater(userDto.getUsername());// 设置修改人

        organizationDOMapper.insertSelective(organizationDO);
        userDOMapper.insertSelective(userDO);// 添加数据到user表
        userRoleRefDOMapper.insertSelective(userRoleRefDO);// 添加数据到user_role_ref表
    }

    /**
     * 用户登录
     *
     * @param username
     * @param password
     */
    @Override
    @Transactional
    public int Login(String username, String password) throws BusinessException {
        /*
         将拿到的前端用户名和密码加盐后查询数据库，
         如果查到记录，则登录成功，否则，登录失败
         */
        password = DigestUtils.md5Hex(password + username);
        UserDO userDO = userDOMapper.selectByUsernameAndPassword(username, password);
        if (userDO != null) {
            Map<String,String> map = new HashMap<>();
            UserUtil userUtil = new UserUtil();
            map.put("username", username);
            map.put("itemid", String.valueOf(userDO.getItemid()));
            map.put("itemcode", userDO.getItemcode());

            userUtil.setUser(map);

            userDO = new UserDO();
            userDO.setState("入");
            userDO.setItemid(Integer.parseInt(map.get("itemid")));
            userDO.setItemcode(map.get("itemcode"));

            userDOMapper.updateByPrimaryKeySelective(userDO);
            return 200;
        } else {
            throw new BusinessException("用户名或密码错误", EmBusinessError.USER_LOGIN_FAILED);
        }
    }

    /**
     * 退出登录，更改状态
     */
    @Override
    public void Logout() {
        UserUtil userUtil = new UserUtil();
        UserDO userDO = new UserDO();
        userDO.setState("出");
        userDO.setItemid(Integer.parseInt(userUtil.getUser().get("itemid")));
        userDO.setItemcode(userUtil.getUser().get("itemcode"));

        userDOMapper.updateByPrimaryKeySelective(userDO);
        userUtil.removeUser();// 从session中删除用户名
    }

    /**
     * 修改密码
     *
     * @param updatePwdDto
     */
    @Override
    @Transactional
    public int UpdatePassword(UpdatePwdDto updatePwdDto) {
        //从session中拿到用户名，然后根据用户名查询数据库，得到角色类型，然后判断是普通用户还是管理员，
        //如果是普通用户则需要输入手机号码和原密码，管理员则直接输入新密码替换原密码（不需要手机号码和原密码）
        ValidatorResult result = validator.validate(updatePwdDto);
        if (result.isHasErrors()) {
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }

        UserUtil userUtil = new UserUtil();
        String username = userUtil.getUser().get("username");
        UserDO userDO = userDOMapper.selectByUsername(username);
        int userType = userDO.getType();// 用户类型（0：普通，1：管理员）

        // 如果是普通用户
        if (userType == 0) {
            if (MobileUtil.checkPhone(updatePwdDto.getMobilePhone())) {
                String mobilePhone = updatePwdDto.getMobilePhone();
                // 根据手机号码查询数据库拿到 盐
                userDO = userDOMapper.selectByMobilePhone(mobilePhone);
                String salt = userDO.getSalt();

                String oldPassword = updatePwdDto.getPassword();// 输入的原密码
                oldPassword = DigestUtils.md5Hex(oldPassword + salt);// 输入的原密码+盐计算
                // 数据库查询到的原密码和输入的 原密码+盐计算后 比对
                if (userDO.getPassword().equals(oldPassword)) {
                    // 输入的两次密码是否一致
                    updatePwdDto.setNewPassword(DigestUtils.md5Hex(updatePwdDto.getNewPassword() + username));
                    userDOMapper.updatePasswordByMobilePhone(updatePwdDto.getNewPassword(), mobilePhone);
                    return 200;
                } else {
                    throw new BusinessException("输入的旧密码错误，请重新输入！", EmBusinessError.OLDPASSWORD_ERROR);
                }
            } else {
                throw new BusinessException("手机号码不正确！", EmBusinessError.MOBILEPHONE_ERROR);
            }
        } else if (userType == 1) {
            // 如果是管理员
            updatePwdDto.setNewPassword(DigestUtils.md5Hex(updatePwdDto.getNewPassword() + username));
            userDOMapper.updatePasswordByUserName(updatePwdDto.getNewPassword(), username);
            return 200;
        }
        throw new BusinessException("该用户既不是普通用户，也不是管理员！", EmBusinessError.UNKNOWN_ERROR);
    }

    /**
     * 查看个人用户信息
     *
     * @return
     */
    @Override
    public UserDO selectOne() {
        UserUtil userUtil = new UserUtil();
        String username = userUtil.getUser().get("username");
        return userDOMapper.selectByUsername(username);
    }

    /**
     * 修改用户信息
     *
     * @param userDO
     * @return
     */
    @Override
    @Transactional
    public void UpdateUserMsg(UserDO userDO) {
        ValidatorResult result = validator.validate(userDO);
        if (result.isHasErrors()) {
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        // 验证通过返回 null，不通过则返回一个 字符串，
        // 所以利用判空来判断身份证号码是否合法
        String isValidIDCardNo = IDUtil.IdentityCardVerification(userDO.getIdcardNo());
        if (!StringUtils.isEmpty(isValidIDCardNo)) {
            throw new BusinessException(isValidIDCardNo, EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        UserUtil userUtil = new UserUtil();

        int userItemID = Integer.parseInt(userUtil.getUser().get("itemid"));
        System.out.println("servicece层 UpdateUserMsg方法下的 itemid：------------" + userItemID);
        String userItemCode = userUtil.getUser().get("itemcode");
        System.out.println("servicece层 UpdateUserMsg方法下的 itemcode：------------" + userItemCode);

        userDO.setItemid(userItemID);
        userDO.setItemcode(userItemCode);

        userDOMapper.updateByPrimaryKeySelective(userDO);
    }
}

