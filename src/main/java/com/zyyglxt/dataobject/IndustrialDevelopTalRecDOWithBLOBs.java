package com.zyyglxt.dataobject;

import com.zyyglxt.dataobject.validation.ValidationGroups;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IndustrialDevelopTalRecDOWithBLOBs extends IndustrialDevelopTalRecDO {
    
    @NotBlank(message = "岗位职责不能为空",groups = ValidationGroups.Insert.class)
    private String postDuty;

    
    @NotBlank(message = "岗位资质不能为空",groups = ValidationGroups.Insert.class)
    private String qualifications;

}