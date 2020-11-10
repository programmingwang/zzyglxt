package com.zyyglxt.dataobject;

import lombok.Data;
import org.springframework.stereotype.Repository;

import javax.validation.constraints.NotBlank;
import java.util.Date;

@Data
public class SpecialtyDO extends SpecialtyDOKey {
    @NotBlank(message = "专科名称不能为空")
    private String specialtyName;

    private String specialtyPhone;

    private String specialtyAddressPro;

    @NotBlank(message = "地址市区不能为空")
    private String specialtyAddressCity;

    @NotBlank(message = "地址县区不能为空")
    private String specialtyAddressCounty;

    @NotBlank(message = "详细地址不能为空")
    private String specialtyAddress;

    private String specialtyLink;

    private String specialtyStatus;

    private String creater;

    private Date itemcreateat;

    private String updater;

    private Date itemupdateat;

    private String specialtyDescribe;

}