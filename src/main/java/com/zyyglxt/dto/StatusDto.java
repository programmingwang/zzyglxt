package com.zyyglxt.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/11/14 21:57
 */
@Data
public class StatusDto {
    @NotNull(message = "id不能为空")
    private Integer itemid;
    @NotBlank(message = "code不能为空")
    private String itemcode;
    @NotBlank(message = "状态不能为空")
    private String status;

    private String updater;
}
