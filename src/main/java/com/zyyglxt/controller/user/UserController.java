package com.zyyglxt.controller.user;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.common.Result;
import com.zyyglxt.dataobject.UserDO;
import com.zyyglxt.dto.UpdatePwdDto;
import com.zyyglxt.dto.UserDto;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IUserService;
import com.zyyglxt.util.UserUtil;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

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

    /**
     * 用户注册，接收前段传递的数据，到service层
     */
    @LogAnnotation(logTitle = "注册", logLevel = "3")
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseData Register(UserDto userDto) throws BusinessException {
        ResponseData rd = userService.Register(userDto);
        if (rd.getCode().equals(EmBusinessError.success.getErrCode())) {
            return new ResponseData(EmBusinessError.success);
        } else {
            return new ResponseData(EmBusinessError.USER_REGISTER_FAILED);
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
}
