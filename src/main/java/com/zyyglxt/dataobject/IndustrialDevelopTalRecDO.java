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
    private String title;

    @NotBlank(message = "岗位名称不能为空", groups = ValidationGroups.Insert.class)
    private String postName;

    @NotBlank(message = "工作地不能为空", groups = ValidationGroups.Insert.class)
    private String workplace;

    @NotBlank(message = "来源机构不能为空", groups = ValidationGroups.Insert.class)
    private String source;

    @NotBlank(message = "岗位数量不能为空", groups = ValidationGroups.Insert.class)
    private String postNum;

    @NotBlank(message = "待遇条件不能为空", groups = ValidationGroups.Insert.class)
    private String conditionsTreament;


    private String status;


    private String creater;


    @JsonFormat(timezone = "GMT+8")
    private Date itemcreateat;


    @JsonFormat(timezone = "GMT+8")
    private String updater;


    private Date itemupdateat;

}