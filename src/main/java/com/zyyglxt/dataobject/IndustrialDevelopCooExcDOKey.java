package com.zyyglxt.dataobject;

import com.zyyglxt.dataobject.validation.ValidationGroups;

import javax.validation.constraints.NotBlank;

public class IndustrialDevelopCooExcDOKey {
    
    private Integer itemid;

    
    @NotBlank(message = "主键不能为空",groups = ValidationGroups.UpdateOrDelete.class)
    private String itemcode;

    
    public Integer getItemid() {
        return itemid;
    }

    
    public void setItemid(Integer itemid) {
        this.itemid = itemid;
    }

    
    public String getItemcode() {
        return itemcode;
    }

    
    public void setItemcode(String itemcode) {
        this.itemcode = itemcode == null ? null : itemcode.trim();
    }
}