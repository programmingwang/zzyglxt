package com.zyyglxt.controller.user;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.*;
import com.zyyglxt.dto.UpdatePwdDto;
import com.zyyglxt.dto.UserDto;
import com.zyyglxt.dto.UserSessionDto;
import com.zyyglxt.dto.industrialDevelop.OrgStatusDto;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.*;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.UUID;

/**
 * @Author nongcn
 * @Date 2020/10/29 11:30
 * @Version 1.0
 */
@RestController
@RequestMapping(value = "user")
public class UserController {

    @Autowired
    IUserService iuserService;
    @Autowired
    UserService userService;
    @Autowired
    UserRoleRefService userRoleRefService;
    @Autowired
    IOrganizationService organizationService;
    @Autowired
    IndustrialDevelopChiMedService developChiMedService;
    @Autowired
    IndustrialDevelopTecSerOrgService developTecSerOrgService;
    @Autowired
    IndustrialDevelopSchoolService schoolService;
    @Autowired
    HttpServletRequest request;

    /**
     * 用户注册，接收前段传递的数据，到service层
     */
    @LogAnnotation(logTitle = "注册", logLevel = "3")
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseData Register(UserDto userDto) throws BusinessException {
        ResponseData rd = iuserService.Register(userDto);
        if (rd.getCode().equals(EmBusinessError.success.getErrCode())) {
            return new ResponseData(EmBusinessError.success, rd.getData());
        } else {
            return new ResponseData(EmBusinessError.USER_REGISTER_FAILED);
        }
    }

    @LogAnnotation(logTitle = "查询机构审核状态", logLevel = "1")
    @RequestMapping(value = "/queryOrgStatus", method = RequestMethod.POST)
    public ResponseData checkOrgStatus(OrgStatusDto orgStatusDto) {
        OrganizationDO organizationDO = iuserService.selectByOrgNameAndCode(orgStatusDto.getOrgName(), orgStatusDto.getOrgCode());
        if (organizationDO == null) {
            return new ResponseData(EmBusinessError.success, "该机构还未申请注册，请继续");
        } else {
            if ("中药材种植园".equals(orgStatusDto.getOrgIdentify()) ||
                    "中药材加工企业".equals(orgStatusDto.getOrgIdentify()) ||
                    "中药材制药企业".equals(orgStatusDto.getOrgIdentify())){
                IndustrialDevelopChiMed chiMed = developChiMedService.selectByOrgNameAndCode(orgStatusDto.getOrgName(),orgStatusDto.getOrgCode());
                if ("提交".equals(chiMed.getStatus())){
                    return new ResponseData(EmBusinessError.success,"您申请注册的机构还在审核中，请耐心等待");
                } else if ("地市局用户审核不通过".equals(chiMed.getStatus())){
                    return new ResponseData(EmBusinessError.success,"您申请注册的机构暂未审核通过，审核意见："+chiMed.getReason()+"，点击此处修改信息");
                } else if ("地市局用户审核通过".equals(chiMed.getStatus())){
                    return new ResponseData(EmBusinessError.success,"您申请注册的机构市局审核已通过，请耐心等待省局审核");
                } else if ("省局用户审核不通过".equals(chiMed.getStatus())){
                    return new ResponseData(EmBusinessError.success,"您申请注册的机构暂未审核通过，审核意见："+chiMed.getReason()+"，点击此处修改信息");
                } else if ("省局用户审核通过".equals(chiMed.getStatus())){
                    return new ResponseData(EmBusinessError.success,"您已注册成功，点击此处立即登录");
                } else {
                    return new ResponseData(EmBusinessError.success,"该机构审核状态不存在");
                }
            }
            if ("科研院所".equals(orgStatusDto.getOrgIdentify()) ||
                    "技术服务机构".equals(orgStatusDto.getOrgIdentify()) ||
                    "旅游康养机构".equals(orgStatusDto.getOrgIdentify())){
                IndustrialDevelopTecSerOrg tecSerOrg = developTecSerOrgService.selectByOrgNameAndCode(orgStatusDto.getOrgName(),orgStatusDto.getOrgCode());
                if ("提交".equals(tecSerOrg.getStatus())){
                    return new ResponseData(EmBusinessError.success,"您申请注册的机构还在审核中，请耐心等待");
                } else if ("地市局用户审核不通过".equals(tecSerOrg.getStatus())){
                    return new ResponseData(EmBusinessError.success,"您申请注册的机构暂未审核通过，审核意见："+tecSerOrg.getReason()+"，点击此处修改信息");
                } else if ("地市局用户审核通过".equals(tecSerOrg.getStatus())){
                    return new ResponseData(EmBusinessError.success,"您申请注册的机构市局审核已通过，请耐心等待省局审核");
                } else if ("省局用户审核不通过".equals(tecSerOrg.getStatus())){
                    return new ResponseData(EmBusinessError.success,"您申请注册的机构暂未审核通过，审核意见："+tecSerOrg.getReason()+"，点击此处修改信息");
                } else if ("省局用户审核通过".equals(tecSerOrg.getStatus())){
                    return new ResponseData(EmBusinessError.success,"您已注册成功，点击此处立即登录");
                } else {
                    return new ResponseData(EmBusinessError.success,"该机构审核状态不存在");
                }
            }
            return new ResponseData(EmBusinessError.success, "您已注册成功，点击此处立即登录");
        }
    }

    /**
     * 根据电话号码来修改密码
     *
     * @param updatePwdDto
     */
    @LogAnnotation(logTitle = "修改密码", logLevel = "2")
    @RequestMapping(value = "/updatepwd", method = RequestMethod.PUT)
    public ResponseData UpdatePassword(UpdatePwdDto updatePwdDto) {
        if (StringUtils.isEmpty(updatePwdDto.getNewPassword()) || StringUtils.isEmpty(updatePwdDto.getCheckNewPassword())) {
            System.out.println("密码输入不能为空，请重新输入！");
            return new ResponseData(EmBusinessError.INPUT_NOT_NULL);
        } else {
            if (updatePwdDto.getNewPassword().equals(updatePwdDto.getCheckNewPassword())) {
                ResponseData rd = iuserService.UpdatePassword(updatePwdDto);
                if (rd.getCode().equals(EmBusinessError.success.getErrCode())) {
                    return new ResponseData(EmBusinessError.success);
                } else {
                    return new ResponseData(EmBusinessError.MODIFY_USER_MESSAGE_FAILED);
                }
            } else {
                System.out.println("两次输入的新密码不一致，请重新输入！");
                return new ResponseData(EmBusinessError.NEWPASSWORD_NOT_EQUAL);
            }
        }
    }

    @LogAnnotation(logTitle = "查看个人信息", logLevel = "1")
    @RequestMapping(value = "/usermsg", method = RequestMethod.GET)
    public ResponseData selectOne() {
        UserDO userDO = iuserService.selectOne();
        return new ResponseData(EmBusinessError.success, userDO);
    }

    @LogAnnotation(logTitle = "修改个人信息", logLevel = "2")
    @RequestMapping(value = "/updateusermsg", method = RequestMethod.POST)
    public ResponseData updateUserMsg(UserDO userDO) {
        iuserService.UpdateUserMsg(userDO);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 科研项目管理-账号管理-查询所有用户
     * @return user和查询结果
     */
    @LogAnnotation(logTitle = "查询所有用户", logLevel = "1")
    @RequestMapping(value = "/alluser",method = RequestMethod.GET)
    public ResponseData selectAllUser(){
        List<UserDO> users = userService.selectAllUser();
        for (UserDO user : users) {
            String userItemCode = user.getItemcode();
            UserRoleRefDO userRoleRefDO = userRoleRefService.selectByUserCode(userItemCode);
            String roleName = userRoleRefDO.getPlatRole();
            user.setRoleName(roleName);
        }
        return new ResponseData(EmBusinessError.success, users);
    }


    /**
     * 科研项目管理-账号管理-新增用户
     * @return user和查询结果
     */
    @LogAnnotation(logTitle = "账号管理新增用户", logLevel = "3")
    @RequestMapping(value = "/adduser",method = RequestMethod.POST)
    public ResponseData insertUser(UserDO userDO){
        userService.insertUserSelective(userDO);
        return new ResponseData(EmBusinessError.success);
    }
}
