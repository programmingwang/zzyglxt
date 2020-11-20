package com.zyyglxt.dataobject;

import lombok.Data;
import lombok.experimental.Accessors;

import java.util.Date;

@Data
@Accessors(chain = true)
public class LogDO  {
    /*itemid*/
    private Integer itemid;
    /*itemcode*/
    private String itemcode;
    /*应用代码*/
    private String appCode;
    /*日志标题*/
    private String logTitle;
    /*日志等级*/
    private String logLevel;
    /*创建人*/
    private String creater;
    /*项目创建时间*/
    private Date itemcreateat;
    /*修改人*/
    private String updater;
    /*项目修改时间*/
    private Date itemupdateat;

}