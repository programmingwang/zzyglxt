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


    @NotBlank(message = "科研成果不能为空",groups = ValidationGroups.Insert.class)
    private String industrialDevelopName;

    @NotBlank(message = "主研人不能为空",groups = ValidationGroups.Insert.class)
    private String industrialDevelopLeader;

    private Integer visitNum;

    @NotBlank(message = "来源不能为空",groups = ValidationGroups.Insert.class)
    private String industrialDevelopSource;

    @NotBlank(message = "作者不能为空",groups = ValidationGroups.Insert.class)
    private String industrialDevelopAuthor;

    private String industrialDevelopContent;

    private String industrialDevelopStatus;

    private String creater;

    @JsonFormat(timezone = "GMT+8")
    private Date itemcreateat;

    private String updater;

    @JsonFormat(timezone = "GMT+8")
    private Date itemupdateat;

}