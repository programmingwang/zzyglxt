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
@ApiModel(value="com-zyyglxt-dataobject-IndustrialDevelopSchool")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class IndustrialDevelopSchool {
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
    * 学校名称
    */
    @ApiModelProperty(value="学校名称")
    private String schoolName;

    /**
    * 学校简介（字少）
    */
    @ApiModelProperty(value="学校简介（字少）")
    private String schoolIntroduce;

    /**
    * 二级学院名称
    */
    @ApiModelProperty(value="二级学院名称")
    private String secondaryCollege;

    /**
    * 本科招生专业
    */
    @ApiModelProperty(value="本科招生专业")
    private String enrollmentMajor;

    /**
    * 研究生招生专业
    */
    @ApiModelProperty(value="研究生招生专业")
    private String graduateEnrollmentMajor;

    /**
    * 联系电话
    */
    @ApiModelProperty(value="联系电话")
    private String phone;

    /**
    * 在线地址
    */
    @ApiModelProperty(value="在线地址")
    private String onlineAddress;

    /**
    * 学校简介
    */
    @ApiModelProperty(value="学校简介")
    private String schoolText;

    /**
    * 学校地址省份
    */
    @ApiModelProperty(value="学校地址省份")
    private String addressPro;

    /**
    * 学校地址市
    */
    @ApiModelProperty(value="学校地址市")
    private String addressCity;

    /**
    * 学校地址省份
    */
    @ApiModelProperty(value="学校地址省份")
    private String addressCountry;

    /**
    * 手动输入地址
    */
    @ApiModelProperty(value="手动输入地址 ")
    private String address;

    /**
    * 数据状态
    */
    @ApiModelProperty(value="数据状态")
    private String status;

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

    /**
     * 机构编号
     */
    @ApiModelProperty(value="机构编号 ")
    private String orgCode;

}
