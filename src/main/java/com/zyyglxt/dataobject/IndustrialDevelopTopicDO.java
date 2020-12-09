package com.zyyglxt.dataobject;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.zyyglxt.dataobject.validation.ValidationGroups;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IndustrialDevelopTopicDO extends IndustrialDevelopTopicDOKey {

    private String projectNo;
    
    @NotBlank(message = "项目名称不能为空",groups = ValidationGroups.Insert.class)
    private String projectName;

    
    @NotBlank(message = "学科专业代码不能为空",groups = ValidationGroups.Insert.class)
    private String disciplineCode;

    
    @NotBlank(message = "学科专业名称不能为空",groups = ValidationGroups.Insert.class)
    private String disciplineName;

    
    @NotBlank(message = "申请人不能为空",groups = ValidationGroups.Insert.class)
    private String applicant;

    
    @NotBlank(message = "所在单位不能为空",groups = ValidationGroups.Insert.class)
    private String company;

    
    @NotBlank(message = "通讯地址不能为空",groups = ValidationGroups.Insert.class)
    private String postalAddress;

    
    @NotBlank(message = "邮政编码不能为空",groups = ValidationGroups.Insert.class)
    private String postalCode;

    
    @NotBlank(message = "联系电话不能为空",groups = ValidationGroups.Insert.class)
    private String contactCode;

    
    @NotBlank(message = "电子邮箱不能为空",groups = ValidationGroups.Insert.class)
    private String email;

    
    @NotNull(message = "申请日期不能为空",groups = ValidationGroups.Insert.class)
    @JsonFormat(timezone = "GMT+8")
    private Date applicationDate;

    
    private String status;

    
    private String examineStatus;

    private String reason;

    
    private String userCode;
    
    private String creater;

    
    @JsonFormat(timezone = "GMT+8")
    private Date itemcreateat;

    
    private String updater;

    
    @JsonFormat(timezone = "GMT+8")
    private Date itemupdateat;

}