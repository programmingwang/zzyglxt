package com.zyyglxt.service.impl;

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
import com.zyyglxt.dto.UserSessionDto;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IUserService;
import com.zyyglxt.util.IDUtil;
import com.zyyglxt.util.MobileUtil;
import com.zyyglxt.util.UsernameUtil;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
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
    @Autowired
    UsernameUtil usernameUtil;
    @Autowired
    HttpServletRequest request;

    /**
     * 用户注册
     */
    @Override
    @Transactional
    public ResponseData Register(UserDto userDto) {
        // 验证参数不能为空
        ValidatorResult result = validator.validate(userDto);
        if (result.isHasErrors()) {
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        // 验证手机号码
        if (!MobileUtil.checkPhone(userDto.getMobilePhone()) && !MobileUtil.isPhone(userDto.getMobilePhone())) {
            throw new BusinessException(EmBusinessError.MOBILEPHONE_ERROR);
        }
        // 用户名的唯一性
        UserDO userDO = userDOMapper.selectByUsername(userDto.getUsername());
        if (userDO != null) {
            throw new BusinessException("用户名已存在", EmBusinessError.USER_ACCOUNT_ALREADY_EXIST);
        } else {
            OrganizationDO organizationDO = organizationDOMapper.selectByOrgNameAndCode(userDto.getOrgName(), userDto.getOrgCode());
            if (organizationDO != null) {   // 申请用户所在的机构已经申请过则直接到登录页面
                register1(userDto);
                return new ResponseData(EmBusinessError.success, "/userLogin");
            } else {    // 申请用户所在的机构没有申请过则跳转到信息录入页面
                register2(userDto);
                switch (userDto.getOrgIdentify()) {
                    case "中药材种植园":
                        return new ResponseData(EmBusinessError.success, "/plantation_add");
                    case "中药材加工企业":
                        return new ResponseData(EmBusinessError.success, "/process_add");
                    case "中药材制药企业":
                        return new ResponseData(EmBusinessError.success, "/produce_add");
                    case "中药材销售企业":
                        return new ResponseData(EmBusinessError.success, "/sale_add");
                    case "中医医疗机构":
                        return new ResponseData(EmBusinessError.success, "/hosp_add");
                    case "高等医学院校":
                        return new ResponseData(EmBusinessError.success, "/school_add");
                    case "科研院所":
                        return new ResponseData(EmBusinessError.success, "/lab_add");
                    case "技术服务机构":
                        return new ResponseData(EmBusinessError.success, "/tecserviceorg_add");
                    case "旅游康养机构":
                        return new ResponseData(EmBusinessError.success, "/tour_add");
                }
                return new ResponseData(EmBusinessError.success);
            }
        }
    }

    /**
     * 注册用户
     *
     * @param userDto
     */
    private void register1(UserDto userDto) {

        String orgName = userDto.getOrgName();
        String orgCode = userDto.getOrgCode();
        OrganizationDO organizationDO = organizationDOMapper.selectByOrgNameAndCode(orgName, orgCode);

        String userItemCode = UUID.randomUUID().toString();// user 表唯一标识UUID
        UserDO userDO = new UserDO();
        userDO.setItemcode(userItemCode);
        userDO.setOrgCode(organizationDO.getItemcode());
        userDO.setUsername(userDto.getUsername());
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String password = passwordEncoder.encode(userDto.getPassword());
        userDO.setSalt(userDto.getUsername());// 将 登陆账号 设置为 盐，存放到数据库中
        userDO.setPassword(password);
        userDO.setMobilephone(userDto.getMobilePhone());
        userDO.setCreater(userDto.getUsername());// 注册时，注册用户为 创建人
        userDO.setUpdater(userDto.getUsername());// 注册时，注册用户为 修改人
//        userDO.setType(0);// 设置为普通用户（0：普通，1：管理员）

        UserRoleRefDO userRoleRefDO = new UserRoleRefDO();
        RoleDO roleDO = roleDOMapper.selectByRoleType(0);//根据角色类型查到itemcode

        userRoleRefDO.setItemcode(UUID.randomUUID().toString());// 唯一标识UUID
        userRoleRefDO.setUserCode(userItemCode);// 关联user表itemCode字段
        userRoleRefDO.setRoleCode(roleDO.getItemcode());// 关联role表itemCode字段
        userRoleRefDO.setPlatRole("普通用户");
        userRoleRefDO.setCreater(userDto.getUsername());// 设置创建人
        userRoleRefDO.setUpdater(userDto.getUsername());// 设置修改人

        userDOMapper.insertSelective(userDO);// 添加数据到user表
        userRoleRefDOMapper.insertSelective(userRoleRefDO);// 添加数据到user_role_ref表
    }

    /**
     * 注册用户
     *
     * @param userDto
     */
    private void register2(UserDto userDto) {

        // orgnization 表唯一标识UUID
        String orgItemCode = UUID.randomUUID().toString();
        OrganizationDO organizationDO = new OrganizationDO();
        organizationDO.setItemcode(orgItemCode);
        organizationDO.setOrgName(userDto.getOrgName());
        organizationDO.setOrgIdentify(userDto.getOrgIdentify());
        organizationDO.setAuditStatus("0");
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
        String password = passwordEncoder.encode(userDto.getPassword());
        userDO.setSalt(userDto.getUsername());// 将 登陆账号 设置为 盐，存放到数据库中
        userDO.setPassword(password);
        userDO.setMobilephone(userDto.getMobilePhone());
        userDO.setCreater(userDto.getUsername());// 注册时，注册用户为 创建人
        userDO.setUpdater(userDto.getUsername());// 注册时，注册用户为 修改人

        RoleDO roleDO = roleDOMapper.selectByRoleName(userDto.getOrgIdentify());
        userDO.setType(roleDO.getRoleType());
//        userDO.setType(0);// 设置为普通用户（0：普通，1：管理员）

        UserRoleRefDO userRoleRefDO = new UserRoleRefDO();
        userRoleRefDO.setItemcode(UUID.randomUUID().toString());// 唯一标识UUID
        userRoleRefDO.setUserCode(userItemCode);// 关联user表itemCode字段
//        roleDO = roleDOMapper.selectByRoleType(roleDO.getRoleType());//根据角色类型查到itemcode
        userRoleRefDO.setRoleCode(roleDO.getItemcode());// 关联role表itemCode字段
        userRoleRefDO.setPlatRole("普通用户");
        userRoleRefDO.setCreater(userDto.getUsername());// 设置创建人
        userRoleRefDO.setUpdater(userDto.getUsername());// 设置修改人

        organizationDOMapper.insertSelective(organizationDO);
        userDOMapper.insertSelective(userDO);// 添加数据到user表
        userRoleRefDOMapper.insertSelective(userRoleRefDO);// 添加数据到user_role_ref表
    }

    /**
     * 修改密码
     *
     * @param updatePwdDto
     */
    @Override
    @Transactional
    public ResponseData UpdatePassword(UpdatePwdDto updatePwdDto) {
        ValidatorResult result = validator.validate(updatePwdDto);
        if (result.isHasErrors()) {
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }

        UserDO userDO = userDOMapper.selectByUsername(usernameUtil.getOperateUser());

        String mobilePhone = updatePwdDto.getMobilePhone();
        if (MobileUtil.checkPhone(mobilePhone) || MobileUtil.isPhone(mobilePhone)) {
            if (!updatePwdDto.getMobilePhone().equals(userDO.getMobilephone())){
                throw new BusinessException("输入的电话号码与预留的不一致，请重新输入！", EmBusinessError.OLDPASSWORD_ERROR);
            }
            String oldPassword = updatePwdDto.getPassword();// 输入的原密码
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            //oldPassword = passwordEncoder.encode(oldPassword);
            // 数据库查询到的原密码和输入的原密码比对
            if (passwordEncoder.matches(oldPassword,userDO.getPassword())) {
                updatePwdDto.setNewPassword(passwordEncoder.encode(updatePwdDto.getNewPassword()));
                userDOMapper.updatePasswordByMobilePhone(updatePwdDto.getNewPassword(), mobilePhone);
                return new ResponseData(EmBusinessError.success);
            } else {
                throw new BusinessException("输入的旧密码错误，请重新输入！", EmBusinessError.OLDPASSWORD_ERROR);
            }
        } else {
            throw new BusinessException("手机号码不正确！", EmBusinessError.MOBILEPHONE_ERROR);
        }
    }

    /**
     * 查看个人用户信息
     *
     * @return
     */
    @Override
    public UserDO selectOne() {
        UserDO userDO = userDOMapper.selectByUsername(usernameUtil.getOperateUser());
//        隐藏身份证号的出生年月日和手机号的中间四位
//        userDO.setMobilephone(MobileUtil.hideMiddleMobile(userDO.getMobilephone()));
//        userDO.setIdcardNo(IDUtil.hideMiddleID(userDO.getIdcardNo()));
        return userDO;
    }

    @Override
    public OrganizationDO selectByOrgNameAndCode(String orgName, String orgCode) {
        return organizationDOMapper.selectByOrgNameAndCode(orgName, orgCode);
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
            throw new BusinessException(isValidIDCardNo, EmBusinessError.IDNO_ERROR);
        }
        // 验证电话是否正确
        if (!MobileUtil.checkPhone(userDO.getMobilephone())  && !MobileUtil.isPhone(userDO.getMobilephone())
                && !StringUtils.isEmpty(userDO.getMobilephone())) {
            throw new BusinessException("手机号码不正确！", EmBusinessError.MOBILEPHONE_ERROR);
        }

        if (userDO.getPortrait() == ""){
            userDO.setPortrait(null);
        }
        UserSessionDto userSessionDto = (UserSessionDto) request.getSession().getAttribute("user");
        userDO.setItemid(userSessionDto.getItemid());
        userDO.setItemcode(userSessionDto.getItemcode());
        userDOMapper.updateByPrimaryKeySelective(userDO);
    }

    /**
     * 修改用户头像
     *
     * @param userDO
     */
    @Override
    @Transactional
    public void UpdateUserPortrait(UserDO userDO) {
        UserSessionDto userSessionDto = (UserSessionDto) request.getSession().getAttribute("user");
        userDO.setItemid(userSessionDto.getItemid());
        userDO.setItemcode(userSessionDto.getItemcode());
        userDOMapper.updateByPrimaryKeySelective(userDO);
    }
}

