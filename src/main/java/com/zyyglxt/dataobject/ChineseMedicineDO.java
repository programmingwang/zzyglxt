package com.zyyglxt.dataobject;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.Date;

@Data
public class ChineseMedicineDO extends ChineseMedicineDOKey {

    @NotBlank(message = "专家名字不能为空")
    private String chineseMedicineName;

    private String chineseMedicineType;

    private String chineseMedicineTitle;

    @NotBlank(message = "所在科室不能为空")
    private String deptCode;

    @NotBlank(message = "所在地点不能为空")
    private String hospCode;

    private String visitTime;

    private String phone;

    @NotBlank(message = "专家简介不能为空")
    private String expertBriefIntroduce;

    @NotBlank(message = "专家介绍不能为空")
    private String expertIntroduce;

    @NotBlank(message = "主要就诊不能为空")
    private String mainVisit;

    private String medicineRecords;

    private String chineseMedicineStatus;

    private String creater;

    private Date itemcreateat;

    private String updater;

    private Date itemupdateat;
}