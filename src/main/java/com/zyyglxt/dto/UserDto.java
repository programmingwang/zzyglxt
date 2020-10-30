package com.zyyglxt.dto;

/**
 * @Author nongcn
 * @Date 2020/10/29 18:02
 * @Version 1.0
 */
public class UserDto {
    private String username;
    private String password;
    private String newPassword;
    private String checkNewPassword;
    private String mobilePhone;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getCheckNewPassword() {
        return checkNewPassword;
    }

    public void setCheckNewPassword(String checkNewPassword) {
        this.checkNewPassword = checkNewPassword;
    }

    public String getMobilePhone() {
        return mobilePhone;
    }

    public void setMobilePhone(String mobilePhone) {
        this.mobilePhone = mobilePhone;
    }
}
