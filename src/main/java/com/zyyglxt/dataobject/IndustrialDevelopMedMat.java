package com.zyyglxt.dataobject;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
   *@Author lrt
   *@Date 2020/11/6 20:00
   *@Version 1.0
**/
@ApiModel(value="com-zyyglxt-dataobject-IndustrialDevelopMedMat")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class IndustrialDevelopMedMat {
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
    * 药材名称
    */
    @ApiModelProperty(value="药材名称")
    private String name;

    /**
    * 规格
    */
    @ApiModelProperty(value="规格")
    private String specifications;

    /**
    * 产地
    */
    @ApiModelProperty(value="产地")
    private String place;

    /**
    * 联系人
    */
    @ApiModelProperty(value="联系人")
    private String contacts;

    /**
    * 联系电话
    */
    @ApiModelProperty(value="联系电话")
    private String phone;

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
}