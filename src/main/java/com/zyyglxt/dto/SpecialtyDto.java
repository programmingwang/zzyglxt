package com.zyyglxt.dto;

import com.zyyglxt.dataobject.SpecialtyDO;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.Date;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/11/1 9:47
 */
@Data
public class SpecialtyDto extends SpecialtyDO {
    @NotBlank(message = "医院code不能为空")
    private String hospitalCode;
}
