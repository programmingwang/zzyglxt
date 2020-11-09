package com.zyyglxt.dataobject;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class HospDOKey {

    private Integer itemid;

    @NotBlank(message = "itemcode不能为空")
    private String itemcode;
}