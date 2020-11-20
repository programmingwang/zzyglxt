package com.zyyglxt.dataobject;

import com.zyyglxt.dataobject.validation.ValidationGroups;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IndustrialDevelopSciAchiDOKey {
    
    private Integer itemid;

    
    @NotBlank(message = "主键不能为空",groups = ValidationGroups.UpdateOrDelete.class)
    private String itemcode;

}