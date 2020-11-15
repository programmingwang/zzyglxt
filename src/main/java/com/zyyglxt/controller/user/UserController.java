package com.zyyglxt.controller.user;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.OrganizationDO;
import com.zyyglxt.dataobject.UserDO;
import com.zyyglxt.dto.UpdatePwdDto;
import com.zyyglxt.dto.UserDto;
import com.zyyglxt.dto.UserSessionDto;
import com.zyyglxt.dto.industrialDevelop.OrgStatusDto;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IOrganizationService;
import com.zyyglxt.service.IUserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
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
    IUserService userService;
    @Autowired
    IOrganizationService organizationService;
    @Autowired
    HttpServletRequest request;

    /**
     * 用户注册，接收前段传递的数据，到service层
     */
    @LogAnnotation(logTitle = "注册", logLevel = "3")
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseData Register(UserDto userDto) throws BusinessException {
        ResponseData rd = userService.Register(userDto);
        if (rd.getCode().equals(EmBusinessError.success.getErrCode())) {
            return new ResponseData(EmBusinessError.success, rd.getData());
        } else {
            return new ResponseData(EmBusinessError.USER_REGISTER_FAILED);
        }
    }

//    @LogAnnotation(logTitle = "查询机构审核状态", logLevel = "1")
    @RequestMapping(value = "/queryOrgStatus", method = RequestMethod.POST)
    public ResponseData checkOrgStatus(OrgStatusDto orgStatusDto){
        OrganizationDO organizationDO = userService.selectByOrgNameAndCode(orgStatusDto.getOrgName(),orgStatusDto.getOrgCode());
        if (organizationDO == null){
            return new ResponseData(EmBusinessError.success,"该机构还未申请注册，请继续");
        } else {
            if ("待审核".equals(organizationDO.getAuditStatus())){
                return new ResponseData(EmBusinessError.success,"您申请注册的机构还在审核中，请耐心等待");
            } else if ("市局审核未通过".equals(organizationDO.getAuditStatus())){
                return new ResponseData(EmBusinessError.success,"您申请注册的机构暂未审核通过，审核意见："+organizationDO.getReason()+"，点击此处修改信息");
            } else if ("市局审核已通过".equals(organizationDO.getAuditStatus())){
                return new ResponseData(EmBusinessError.success,"您申请注册的机构市局审核已通过，请耐心等待省局审核");
            } else if ("省局审核未通过".equals(organizationDO.getAuditStatus())){
                return new ResponseData(EmBusinessError.success,"您申请注册的机构暂未审核通过，审核意见："+organizationDO.getReason()+"，点击此处修改信息");
            } else if ("省局审核已通过".equals(organizationDO.getAuditStatus())){
                System.out.println("66666666666666666666666");
                return new ResponseData(EmBusinessError.success,"您已注册成功，点击此处立即登录");
            } else {
                return null;
            }

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
                ResponseData rd = userService.UpdatePassword(updatePwdDto);
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
        UserDO userDO = userService.selectOne();
        return new ResponseData(EmBusinessError.success, userDO);
    }

    @LogAnnotation(logTitle = "修改个人信息", logLevel = "2")
    @RequestMapping(value = "/updateusermsg", method = RequestMethod.POST)
    public ResponseData updateUserMsg(UserDO userDO) {
        userService.UpdateUserMsg(userDO);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 查询出所有机构用于渲染在表格上
     *
     * @return
     */
    @LogAnnotation(logTitle = "查询所有机构", logLevel = "1")
    @RequestMapping(value = "/queryAllOrg", method = RequestMethod.GET)
    public ResponseData selectOrganization() {
        List<OrganizationDO> organizationDO = organizationService.selectAllOrgByAuditStatus();
        return new ResponseData(EmBusinessError.success, organizationDO);
    }

    @LogAnnotation(logTitle = "机构通过审核", logLevel = "2")
    @RequestMapping(value = "/checkOrgPass", method = RequestMethod.POST)
    public ResponseData orgAudit1(@RequestBody OrganizationDO organizationDO) {
        UserSessionDto user = (UserSessionDto) request.getSession().getAttribute("user");
        if ("市级中医药管理部门".equals(user.getRolename())) {
            if ("待审核".equals(organizationDO.getAuditStatus())) {
                organizationDO.setAuditStatus("市局审核已通过");
            }
        } else if ("省局中医药管理部门".equals(user.getRolename())){
            if ("待审核".equals(organizationDO.getAuditStatus())) {
                organizationDO.setAuditStatus("省局审核已通过");
            }
            if ("市局审核已通过".equals(organizationDO.getAuditStatus())) {
                organizationDO.setAuditStatus("省局审核已通过");
            }
        }
        organizationService.orgAudit(organizationDO);
        return new ResponseData(EmBusinessError.success);
    }

    @LogAnnotation(logTitle = "机构未通过审核", logLevel = "2")
    @RequestMapping(value = "/checkOrgNotPass", method = RequestMethod.POST)
    public ResponseData orgAudit2(@RequestBody OrganizationDO organizationDO) {
        UserSessionDto user = (UserSessionDto) request.getSession().getAttribute("user");
        if ("市级中医药管理部门".equals(user.getRolename())) {
            if ("待审核".equals(organizationDO.getAuditStatus())) {
                organizationDO.setAuditStatus("市局审核未通过");
            }
        } else if ("省局中医药管理部门".equals(user.getRolename())){
            if ("待审核".equals(organizationDO.getAuditStatus())) {
                organizationDO.setAuditStatus("省局审核未通过");
            }
            if ("市局审核已通过".equals(organizationDO.getAuditStatus())) {
                organizationDO.setAuditStatus("省局审核未通过");
            }
        }
        organizationService.orgAudit(organizationDO);
        return new ResponseData(EmBusinessError.success);
    }
}
