package com.zyyglxt.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * @Author nongcn
 * @Date 2020/11/2 19:58
 * @Version 1.0
 */
@Data
public class UpdatePwdDto {
    @NotBlank(message = "密码不能为空")
    private String password;

    @NotBlank(message = "手机号不能为空")
    private String mobilePhone;

    @NotBlank(message = "密码不能为空")
    private String newPassword;

    @NotBlank(message = "密码不能为空")
    private String checkNewPassword;
}
