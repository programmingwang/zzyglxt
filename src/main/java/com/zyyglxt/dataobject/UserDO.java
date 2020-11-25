package com.zyyglxt.dataobject;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDO extends UserDOKey {

    private String orgCode;

    private String username;

    private String password;

    private String salt;

    private String name;

    private String gender;

    private String idcardType;

    private String idcardNo;

    @Email(message = "邮箱格式不正确")
    private String email;

    private String state;

    private String contacts;

    private String mobilephone;

    private String creater;

    private Date itemcreateat;

    private String updater;

    private Date itemupdateat;

    private String cityid;

    private Integer type;

    private String portrait;

    private String roleName;



}
