
package com.zyyglxt.dto;

import com.zyyglxt.dataobject.ChineseMedicineDO;
import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/11/9 19:08
 */
@Data
public class ChineseMedicineDto extends ChineseMedicineDO {

    @NotBlank(message = "医院名称不能为空")
    private String hospitalName;

    @NotBlank(message = "专科名称不能为空")
    private String specialtyName;

    private String filePath;
}