package com.zyyglxt.dto;

import com.zyyglxt.dataobject.CulturalResourcesDO;
import lombok.Data;
import lombok.ToString;

import java.util.Date;

/**
 * Author:wangzh
 * Date: 2020/11/6 15:36
 * Version: 1.0
 */
@Data
@ToString
public class CulturalResourcesDto extends CulturalResourcesDO {
    private String filePath;
    private String fileName;
}
