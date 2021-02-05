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

    private String specialtyIntroduce;

    private String specialtyPhone;

    private String specialtyAddressPro;

    private String specialtyAddressCity;

    private String specialtyAddressCounty;

    private String specialtyAddress;

    private String specialtyLink;

    private String specialtyStatus;

    private String creater;

    private Date itemcreateat;

    private String updater;

    private Date itemupdateat;
}