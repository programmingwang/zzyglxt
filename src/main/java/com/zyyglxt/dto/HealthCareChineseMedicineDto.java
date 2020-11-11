package com.zyyglxt.dto;

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
public class HealthCareChineseMedicineDto {
    private Integer itemid;
    private String itemcode;
    private String chineseMedicineName;
    private String chineseMedicineType;
    private String chineseMedicineAlias;
    private String chineseMedicineSource;
    private String chineseMedicineHarvesting;
    private String chineseMedicineTaste;
    private String chineseMedicineMerTro;
    private String chineseMedicineEffect;
    private String chineseMedicineUsage;
    private String chineseMedicineStatus;
    private String creater;
    private Date itemcreateat;
    private String updater;
    private Date itemupdateat;
    private String filePath;
}
