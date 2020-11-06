package com.zyyglxt.dataobject;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.zyyglxt.dataobject.validation.ValidationGroups;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IndustrialDevelopExpertRefDO extends IndustrialDevelopExpertRefDOKey {

    @NotBlank(message = "专家代码不能为空", groups = ValidationGroups.Insert.class)
    private String expertCode;


    @NotBlank(message = "课题代码不能为空", groups = ValidationGroups.Insert.class)
    private String topicCode;

    private String exmaineStatus;

    private String submitStatus;

    private Integer score;

    private String opinion;


    private String creater;


    @JsonFormat(timezone = "GMT+8")
    private Date itemcreateat;


    private String updater;


    @JsonFormat(timezone = "GMT+8")
    private Date itemupdateat;

}