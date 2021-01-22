package com.zyyglxt.dto;

import com.zyyglxt.dataobject.HealthCareChineseMedicineDO;
import lombok.Data;
import lombok.ToString;
import lombok.experimental.Accessors;

import java.util.Date;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/11/6 10:49
 */
@Data
@ToString
@Accessors(chain = true)
public class HealthCareChineseMedicineDto extends HealthCareChineseMedicineDO {
    private String fileName;
    private String filePath;
}
