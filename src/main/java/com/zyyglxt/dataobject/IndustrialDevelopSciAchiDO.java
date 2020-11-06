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
public class IndustrialDevelopSciAchiDO extends IndustrialDevelopSciAchiDOKey {


    @NotBlank(message = "项目名称不能为空",groups = ValidationGroups.Insert.class)
    private String projectName;

    @NotBlank(message = "科研成果不能为空", groups = ValidationGroups.Insert.class)
    private String industrialDevelopName;

    @NotBlank(message = "主研人不能为空",groups = ValidationGroups.Insert.class)
    private String industrialDevelopLeader;

    @NotBlank(message = "联系人不能为空", groups = ValidationGroups.Insert.class)
    private String contacts;

    private Integer visitNum;

    /**
     * 联系电话
     */
    private String phone;

    /**
     * 成果简介
     */
    private String context;

    @NotBlank(message = "来源不能为空",groups = ValidationGroups.Insert.class)
    private String industrialDevelopSource;

    @NotBlank(message = "作者不能为空",groups = ValidationGroups.Insert.class)
    private String industrialDevelopAuthor;

    private String industrialDevelopStatus;

    @NotBlank(message = "用户机构不能为空", groups = ValidationGroups.Insert.class)
    private String orgCode;

    private String creater;

    @JsonFormat(timezone = "GMT+8")
    private Date itemcreateat;

    private String updater;

    @JsonFormat(timezone = "GMT+8")
    private Date itemupdateat;

}