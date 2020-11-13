package com.zyyglxt.dto;


import com.zyyglxt.dataobject.HealthCareFamPreDO;
import lombok.Data;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/11/11 22:04
 */
@Data
public class HealthCareFamPreDto extends HealthCareFamPreDO {
    private String fileName;
    private String filePath;
}
