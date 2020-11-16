package com.zyyglxt.dataobject;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
   *@Author lrt
   *@Date 2020/11/6 20:00
   *@Version 1.0
**/
@ApiModel(value="com-zyyglxt-dataobject-IndustrialDevelopSaleDrug")
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class IndustrialDevelopSaleDrug {
    /**
    * 自增id
    */
    @ApiModelProperty(value="自增id")
    private Integer itemid;

    /**
    * UUID
    */
    @ApiModelProperty(value="UUID")
    private String itemcode;

    /**
    * 药品名称
    */
    @ApiModelProperty(value="药品名称")
    private String drugName;

    /**
    * 功能主治
    */
    @ApiModelProperty(value="功能主治")
    private String functionIndications;

    /**
    * 用法用量
    */
    @ApiModelProperty(value="用法用量")
    private String usage;

    /**
    * 不良反应
    */
    @ApiModelProperty(value="不良反应")
    private String adverseReactions;

    /**
    * 禁忌
    */
    @ApiModelProperty(value="禁忌")
    private String taboo;

    /**
    * 规格
    */
    @ApiModelProperty(value="规格")
    private String specifications;

    /**
    * 注意事项
    */
    @ApiModelProperty(value="注意事项")
    private String careful;

    /**
    * 贮藏
    */
    @ApiModelProperty(value="贮藏")
    private String storage;

    /**
    * 包装
    */
    @ApiModelProperty(value="包装")
    private String packing;

    /**
    * 数据状态
    */
    @ApiModelProperty(value="数据状态")
    private String status;

    /**
    * 用户所在机构code
    */
    @ApiModelProperty(value="用户所在机构code")
    private String orgCode;
    /**
    * 创建者
    */
    @ApiModelProperty(value="创建者")
    private String creater;

    /**
    * 创建时间
    */
    @ApiModelProperty(value="创建时间")
    private Date itemcreateat;

    /**
    * 修改人
    */
    @ApiModelProperty(value="修改人")
    private String updater;

    /**
    * 修改时间
    */
    @ApiModelProperty(value="修改时间")
    private Date itemupdateat;

    private String fileName;

    private String filePath;
}