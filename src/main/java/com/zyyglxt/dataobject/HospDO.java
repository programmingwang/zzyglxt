package com.zyyglxt.dataobject;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.Date;

@Data
public class HospDO extends HospDOKey {
    @NotBlank(message = "医院名称不能为空")
    private String hospitalName;

    @NotBlank(message = "医院等级不能为空")
    private String hospitalLevel;

    @NotBlank(message = "联系电话不能为空")
    private String hospitalTelephone;

    private String hospitalAddressPro;

    @NotBlank(message = "医院所在市不能为空")
    private String hospitalAddressCity;

    @NotBlank(message = "医院所在县不能为空")
    private String hospitalAddressCountry;

    @NotBlank(message = "医院地址不能为空")
    private String hospitalAddress;

    private String hospitalLink;

    private String hospitalStatus;

    private String creater;

    private Date itemcreateat;

    private String updater;

    private Date itemupdateat;

    private String hospitalIntroduce;
}