package com.zyyglxt.dto;

import com.zyyglxt.dataobject.RequestReportDO;
import lombok.Data;

import javax.validation.constraints.NotNull;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/12/27 13:20
 */
@Data
public class RequestReportDto extends RequestReportDO {
    @NotNull(message="文件不能为空")
    private String fileName;
    private String filePath;
}
