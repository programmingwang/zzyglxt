package com.zyyglxt.dto;

import com.zyyglxt.dataobject.ChineseCulturalDO;
import lombok.Data;
import lombok.ToString;
import lombok.experimental.Accessors;

import java.util.Date;

/**
 * Author:wangzh
 * Date: 2020/11/6 9:54
 * Version: 1.0
 */
@Data
@ToString
public class ChineseCulturalDto extends ChineseCulturalDO {
    private String filePath;
}
