package com.zyyglxt.dataobject;

import com.zyyglxt.dataobject.validation.ValidationGroups;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.constraints.NotBlank;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class IndustrialDevelopExpertRefDOKey {
    
    private Integer itemid;

    
    @NotBlank(message = "主键不能为空",groups = ValidationGroups.UpdateOrDelete.class)
    private String itemcode;

}