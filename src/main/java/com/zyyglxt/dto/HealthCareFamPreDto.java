package com.zyyglxt.dto;



import com.zyyglxt.dataobject.HealthCareFamPreDO;
import lombok.Data;
import lombok.ToString;
import lombok.experimental.Accessors;

import javax.validation.constraints.NotNull;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/11/11 22:04
 */
@Data
@ToString
@Accessors(chain = true)
public class HealthCareFamPreDto extends HealthCareFamPreDO {
    @NotNull(message="文件不能为空")
    private String fileName;
    private String filePath;
}
