package com.zyyglxt.dataobject;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.Date;

@Data
public class ChineseMedicineDO extends ChineseMedicineDOKey {

    @NotBlank(message = "专家名字不能为空")
    private String chineseMedicineName;
    @NotBlank(message = "专家类型不能为空")
    private String chineseMedicineType;
    @NotBlank(message = "职位职称不能为空")
    private String chineseMedicineTitle;
    @NotBlank(message = "所在科室不能为空")
    private String deptCode;
    @NotBlank(message = "所在地点不能为空")
    private String hospCode;
    @NotBlank(message = "出诊时间不能为空")
    private String visitTime;
    @NotBlank(message = "专家类型不能为空")
    private String phone;
    @NotBlank(message = "联系电话不能为空")
    private String expertIntroduce;
    @NotBlank(message = "主要就诊不能为空")
    private String mainVisit;
    @NotBlank(message = "重点医案不能为空")
    private String medicineRecords;

    private String chineseMedicineStatus;

    private String creater;

    private Date itemcreateat;

    private String updater;

    private Date itemupdateat;
}