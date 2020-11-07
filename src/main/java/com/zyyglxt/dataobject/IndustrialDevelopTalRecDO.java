package com.zyyglxt.dataobject;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.zyyglxt.dataobject.validation.ValidationGroups;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IndustrialDevelopTalRecDO extends IndustrialDevelopTalRecDOKey {

    @NotBlank(message = "标题不能为空", groups = ValidationGroups.Insert.class)
    private String recruitmentTitle;

    @NotBlank(message = "岗位名称不能为空", groups = ValidationGroups.Insert.class)
    private String recruitmentPosition;

    @NotBlank(message = "招聘数量不能为空", groups = ValidationGroups.Insert.class)
    private String recruitmentCount;

    @NotBlank(message = "薪水不能为空", groups = ValidationGroups.Insert.class)
    private String salary;

    @NotBlank(message = "工作地不能为空", groups = ValidationGroups.Insert.class)
    private String workplace;

    @NotBlank(message = "学历要求不能为空", groups = ValidationGroups.Insert.class)
    private String education;

    @NotBlank(message = "邮箱不能为空", groups = ValidationGroups.Insert.class)
    private String emali;

    @NotBlank(message = "岗位职责不能为空", groups = ValidationGroups.Insert.class)
    private String postDuty;

    private String postDescr;

    private String status;

    @NotBlank(message = "来源机构不能为空", groups = ValidationGroups.Insert.class)
    private String orgCode;

    private Integer visitNum;

    private String creater;


    @JsonFormat(timezone = "GMT+8")
    private Date itemcreateat;


    @JsonFormat(timezone = "GMT+8")
    private String updater;


    private Date itemupdateat;

}