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
public class IndustrialDevelopOffDO extends IndustrialDevelopOffDOKey {
    
    @NotNull(message = "年份不能为空",groups = ValidationGroups.Insert.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy", timezone = "GMT+8")
    private String year;

    
    @NotNull(message = "开始时间不能为空",groups = ValidationGroups.Insert.class)
    @JsonFormat(timezone = "GMT+8")
    private Date startTime;

    
    @JsonFormat(timezone = "GMT+8")
    private Date endTime;

    
    private String isimp;

    
    private String creater;

    
    @JsonFormat(timezone = "GMT+8")
    private Date itemcreateat;

    
    private String updater;

    
    @JsonFormat(timezone = "GMT+8")
    private Date itemupdateat;

}