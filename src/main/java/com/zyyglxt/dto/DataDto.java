package com.zyyglxt.dto;

import lombok.Data;
import lombok.ToString;
import lombok.experimental.Accessors;

import java.util.Date;

/**
 * @Author huangtao
 * @Date 2020/11/6 20:48
 * @Version 1.0
 */
@Data
@ToString
@Accessors(chain = true)
public class DataDto {
    private Integer itemid;
    private String itemcode;
    private String dataTitle;
    private String dataLocation;
    private String dataAuthor;
    private String dataSource;
    private String dataFileType;
    private Date dataDelayedRelease;
    private String dataStatus;
    private String dataType;
    private String creater;
    private Date itemcreateat;
    private String updater;
    private Date itemupdateat;
    private String dataContent;
    private Integer visitNum;
    private String filePath;
}
