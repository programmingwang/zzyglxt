package com.zyyglxt.dto;

import lombok.Data;

/**
 * @Author nongcn
 * @Date 2020/10/29 18:02
 * @Version 1.0
 */
@Data
public class UserDto {
    private String username;
    private String password;
    private String newPassword;
    private String checkNewPassword;
    private String mobilePhone;
}
