package com.zyyglxt.dto;

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
public class CulturalResourcesDto {
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
    private String filePath;
}
