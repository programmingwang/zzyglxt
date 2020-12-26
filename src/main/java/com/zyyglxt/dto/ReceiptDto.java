package com.zyyglxt.dto;

import com.zyyglxt.dataobject.ReceiptDO;
import lombok.Data;

import javax.validation.constraints.NotNull;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/12/26 15:30
 */
@Data
public class ReceiptDto extends ReceiptDO {
    @NotNull(message="文件不能为空")
    private String fileName;
    private String filePath;
}
