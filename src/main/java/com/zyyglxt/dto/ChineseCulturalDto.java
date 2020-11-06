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
@Accessors(chain = true)
public class ChineseCulturalDto {
    private Integer itemid;
    private String itemcode;
    private String chineseCulturalName;
    private String chineseCulturalSource;
    private String chineseCulturalAuthor;
    private Integer visitNum;
    private String chineseCulturalType;
    private String chineseCulturalStatus;
    private String creater;
    private Date itemcreateat;
    private String updater;
    private Date itemupdateat;
    private String chineseCulturalContent;
    private String filePath;
}
