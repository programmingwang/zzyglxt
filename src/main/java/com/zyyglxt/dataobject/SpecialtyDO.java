package com.zyyglxt.dataobject;

import lombok.Data;
import org.springframework.stereotype.Repository;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;

@Data
public class SpecialtyDO extends SpecialtyDOKey {
    @NotBlank(message = "科室名称不能为空")
    private String specialtyName;

    @Size(max = 60)
    @NotBlank(message = "科室简介不能为空")
    private String specialtyBriefIntroduce;

    @NotBlank(message = "科室介绍不能为空")
    private String specialtyIntroduce;

    private String specialtyPhone;

    private String specialtyAddressPro;

    @NotBlank(message = "地址市区不能为空")
    private String specialtyAddressCity;

    @NotBlank(message = "地址县区不能为空")
    private String specialtyAddressCounty;

    @NotBlank(message = "详细地址不能为空")
    private String specialtyAddress;

    private String specialtyLink;

    @NotBlank(message = "科室状态不能为空")
    private String specialtyStatus;

    private String creater;

    private Date itemcreateat;

    private String updater;

    private Date itemupdateat;
}