package com.zyyglxt.dataobject;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.zyyglxt.dataobject.validation.ValidationGroups;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.util.Date;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
public class IndustrialDevelopCooExcDO extends IndustrialDevelopCooExcDOKey {
    
    @NotBlank(message = "合作交流名称不能为空",groups = ValidationGroups.Insert.class)
    private String cooperationExchangeName;


    private String cooperationExchangeLeader;

    
    private Integer visitNum;

    
    @NotBlank(message = "项目简介不能为空",groups = ValidationGroups.Insert.class)
    private String projectIntroduce;

    @NotBlank(message = "联系人不能为空",groups = ValidationGroups.Insert.class)
    private String contacts;

    
    @NotBlank(message = "电话号码不能为空",groups = ValidationGroups.Insert.class)
    private String phone;

    
    @NotBlank(message = "预期合作机构不能为空",groups = ValidationGroups.Insert.class)
    private String cooperativeOrg;

    @NotBlank(message = "用户所在机构代码不能为空", groups = ValidationGroups.Insert.class)
    private String orgCode;

    
    private String status;

    
    private String creater;

    @JsonFormat(timezone = "GMT+8")
    private Date itemcreateat;

    
    private String updater;

    
    @JsonFormat(timezone = "GMT+8")
    private Date itemupdateat;

}