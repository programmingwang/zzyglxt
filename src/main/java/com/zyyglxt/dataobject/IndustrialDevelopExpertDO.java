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
public class IndustrialDevelopExpertDO extends IndustrialDevelopExpertDOKey {
    
    @NotBlank(message = "用户代码不能为空",groups = ValidationGroups.Insert.class)
    private String userCode;

    
    @NotBlank(message = "擅长领域不能为空",groups = ValidationGroups.Insert.class)
    private String filed;

    
    private String creater;

    
    @JsonFormat(timezone = "GMT+8")
    private Date itemcreateat;

    
    private String updater;

    
    @JsonFormat(timezone = "GMT+8")
    private Date itemupdateat;

}