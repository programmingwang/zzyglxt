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
@ApiModel(value="com-zyyglxt-dataobject-IndustrialDevelopTecSerOrg")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class IndustrialDevelopTecSerOrg {
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
    * 企业名称、院所名称、基地名称
    */
    @ApiModelProperty(value="企业名称、院所名称、基地名称")
    private String name;

    /**
    * 旅游养生机构占地面积
    */
    @ApiModelProperty(value="旅游养生机构占地面积")
    private String areaCoverd;

    /**
    * 旅游养生机构特色服务
    */
    @ApiModelProperty(value="旅游养生机构特色服务")
    private String specialService;

    /**
    * 项目名称
    */
    @ApiModelProperty(value="项目名称")
    private String projectName;

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
    * 地址省份
    */
    @ApiModelProperty(value="地址省份")
    private String addressPro;

    /**
    * 地址市
    */
    @ApiModelProperty(value="地址市")
    private String addressCity;

    /**
    * 地址县
    */
    @ApiModelProperty(value="地址县")
    private String addressCountry;

    /**
    * 手动输入地址
    */
    @ApiModelProperty(value="手动输入地址")
    private String address;

    @ApiModelProperty(value = "在线地址")
    private String onlineAddress;

    /**
    * 简介
    */
    @ApiModelProperty(value="简介")
    private String intruduce;

    /**
    * 修改以后提交信息数据状态
    */
    @ApiModelProperty(value="修改以后提交信息数据状态")
    private String status;

    /**
    * 不通过理由
    */
    @ApiModelProperty(value="不通过理由")
    private String reason;

    /**
    * 用户所在机构code
    */
    @ApiModelProperty(value="用户所在机构code")
    private String orgCode;

    /**
    * 区别数据
    */
    @ApiModelProperty(value="区别数据")
    private String type;

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