package com.zyyglxt.controller.user;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.*;
import com.zyyglxt.dto.UpdatePwdDto;
import com.zyyglxt.dto.UserDto;
import com.zyyglxt.dto.industrialDevelop.OrgStatusDto;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.*;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

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
        if (organizationDO != null) {
            if (organizationDO.getOrgIdentify().equals(orgStatusDto.getOrgIdentify())) {
                switch (orgStatusDto.getOrgIdentify()) {
                    case "中药材种植园":
                    case "中药材加工企业":
                    case "中药材制药企业":
                        IndustrialDevelopChiMed chiMed = developChiMedService.selectByOrgNameAndCode(orgStatusDto.getOrgName(), orgStatusDto.getOrgCode());
                        switch (chiMed.getStatus()) {
                            case "1":
                                return new ResponseData(EmBusinessError.success, "您申请注册的机构还在审核中，请耐心等待");
                            case "5":
                            case "7":
                                return new ResponseData(EmBusinessError.success, "您申请注册的机构暂未审核通过，审核意见：" + chiMed.getReason() + "，点击此处修改信息");
                            case "4":
                                return new ResponseData(EmBusinessError.success, "您申请注册的机构市局审核已通过，请耐心等待省局审核");
                            case "6":
                                return new ResponseData(EmBusinessError.success, "该机构审核已通过，已有账号点击此处登录");
                        }
                        return new ResponseData(EmBusinessError.success, "非法状态：" + chiMed.getStatus());
                    case "科研院所":
                    case "技术服务机构":
                    case "旅游康养机构":
                        IndustrialDevelopTecSerOrg tecSerOrg = developTecSerOrgService.selectByOrgNameAndCode(orgStatusDto.getOrgName(), orgStatusDto.getOrgCode());
                        switch (tecSerOrg.getStatus()) {
                            case "1":
                                return new ResponseData(EmBusinessError.success, "您申请注册的机构还在审核中，请耐心等待");
                            case "5":
                            case "7":
                                return new ResponseData(EmBusinessError.success, "您申请注册的机构暂未审核通过，审核意见：" + tecSerOrg.getReason() + "，点击此处修改信息");
                            case "4":
                                return new ResponseData(EmBusinessError.success, "您申请注册的机构市局审核已通过，请耐心等待省局审核");
                            case "6":
                                return new ResponseData(EmBusinessError.success, "该机构审核已通过，已有账号点击此处登录");
                        }
                        return new ResponseData(EmBusinessError.success, "非法状态：" + tecSerOrg.getStatus());
                    case "中医医疗机构":
                    case "高等医学院校":
                        return new ResponseData(EmBusinessError.success, "该机构类型无需审核");
                    default:
                        return new ResponseData(EmBusinessError.success, "无此机构类型");
                }
            } else {
                return new ResponseData(EmBusinessError.success, "该机构不属于此机构类型");
            }
        } else {
            return new ResponseData(EmBusinessError.success, "该机构还未申请注册，请继续");
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
    public ResponseData updateUserMsg(@RequestBody UserDO userDO) {
        iuserService.UpdateUserMsg(userDO);
        return new ResponseData(EmBusinessError.success);
    }

    @LogAnnotation(logTitle = "修改用户头像", logLevel = "2")
    @RequestMapping(value = "/updateuserimg", method = RequestMethod.POST)
    public ResponseData updateUserPortrait(@RequestBody UserDO userDO) {
        iuserService.UpdateUserPortrait(userDO);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 科研项目管理-账号管理-查询所有用户
     *
     * @return user和查询结果
     */
    @LogAnnotation(logTitle = "查询所有用户", logLevel = "1")
    @RequestMapping(value = "/alluser", method = RequestMethod.GET)
    public ResponseData selectAllUser() {
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
     *
     * @return user和查询结果
     */
    @LogAnnotation(logTitle = "产业发展-账号管理-新增用户", logLevel = "3")
    @RequestMapping(value = "/adduser", method = RequestMethod.POST)
    public ResponseData insertUser(@RequestBody UserDO userDO) {
        userService.insertUserSelective(userDO);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 用户未录入机构信息点击返回按钮则删除用户信息
     * 科研项目管理-账号管理-删除用户
     * @param userDtO
     * @return
     */
    @LogAnnotation(logTitle = "产业发展-账号管理-删除用户", logLevel = "4")
    @RequestMapping(value = "/deletuser", method = RequestMethod.POST)
    public ResponseData deleteUserByUsername(@RequestBody UserDto userDtO){
        userService.deleteUserByUsername(userDtO);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 科研项目管理-账号管理-重置密码
     * @param userDo
     * @return
     */
    @LogAnnotation(logTitle ="产业发展-账号管理-重置密码",logLevel ="2")
    @RequestMapping(value = "/reset", method = RequestMethod.PUT)
    public ResponseData resetPassword(@RequestBody UserDO userDo){
        userService.resetPassword(userDo);
        return new ResponseData(EmBusinessError.success);
    }
}
