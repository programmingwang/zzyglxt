package com.zyyglxt.dataobject;

import com.zyyglxt.dataobject.validation.ValidationGroups;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

/**
   *@Author lrt
   *@Date 2020/11/6 20:00
   *@Version 1.0
**/
@ApiModel(value="com-zyyglxt-dataobject-IndustrialDevelopChiMed")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class IndustrialDevelopChiMed {
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
    * 名称
    */
    @ApiModelProperty(value="名称")
    @NotBlank(message = "名称不能为空", groups = {ValidationGroups.Process.class,ValidationGroups.Produce.class,ValidationGroups.Plantation.class,ValidationGroups.Sale.class})
    private String name;

    /**
    * 占地面积
    */
    @ApiModelProperty(value="占地面积")
    @NotBlank(message = "占地面积不能为空",groups = {ValidationGroups.Process.class,ValidationGroups.Plantation.class})
    private String areaCoverd;

    /**
    * 销售种类
    */
    @ApiModelProperty(value="销售种类")
    @NotBlank(message = "销售种类不能为空",groups = {ValidationGroups.Sale.class})
    private String salesCategory;

    /**
    * 加工种类
    */
    @ApiModelProperty(value="加工种类")
    @NotBlank(message = "加工种类不能为空",groups = {ValidationGroups.Process.class})
    private String processingType;

    /**
    * 生产种类
    */
    @ApiModelProperty(value="生产种类")
    @NotBlank(message = "生产种类不能为空",groups = {ValidationGroups.Produce.class})
    private String peoduceType;

    /**
    * 种植类别
    */
    @ApiModelProperty(value="种植类别")
    @NotBlank(message = "种植类别不能为空",groups = {ValidationGroups.Plantation.class})
    private String plantType;

    /**
    * 生产药品
    */
    @ApiModelProperty(value="生产药品")
    @NotBlank(message = "生产药品不能为空",groups = {ValidationGroups.Produce.class})
    private String peoduceDrug;

    /**
    * 销售药品
    */
    @ApiModelProperty(value="销售药品")
    @NotBlank(message = "销售药品不能为空",groups = {ValidationGroups.Sale.class})
    private String sellingDrugs;

    /**
    * 联系人
    */
    @ApiModelProperty(value="联系人")
    @NotBlank(message = "联系人不能为空", groups = {ValidationGroups.Process.class,ValidationGroups.Produce.class,ValidationGroups.Plantation.class,ValidationGroups.Sale.class})
    private String contacts;

    /**
    * 联系电话
    */
    @ApiModelProperty(value="联系电话")
    @NotBlank(message = "联系电话不能为空", groups = {ValidationGroups.Process.class,ValidationGroups.Produce.class,ValidationGroups.Plantation.class,ValidationGroups.Sale.class})
    private String phone;

    /**
    * 地址省份
    */
    @ApiModelProperty(value="地址省份")
    @NotBlank(message = "地址省份不能为空", groups = {ValidationGroups.Process.class,ValidationGroups.Produce.class,ValidationGroups.Plantation.class,ValidationGroups.Sale.class})
    private String addressPro;

    /**
    * 地址市
    */
    @ApiModelProperty(value="地址市")
    @NotBlank(message = "地址市不能为空", groups = {ValidationGroups.Process.class,ValidationGroups.Produce.class,ValidationGroups.Plantation.class,ValidationGroups.Sale.class})
    private String addressCity;

    /**
    * 地址县
    */
    @ApiModelProperty(value="地址县")
    @NotBlank(message = "地址县不能为空", groups = {ValidationGroups.Process.class,ValidationGroups.Produce.class,ValidationGroups.Plantation.class,ValidationGroups.Sale.class})
    private String addressCountry;

    /**
    * 手动输入地址
    */
    @ApiModelProperty(value="手动输入地址")
    @NotBlank(message = "详细地址不能为空", groups = {ValidationGroups.Process.class,ValidationGroups.Produce.class,ValidationGroups.Plantation.class,ValidationGroups.Sale.class})
    private String address;

    /**
    * 简介
    */
    @ApiModelProperty(value="简介")
    @NotBlank(message = "名称不能为空", groups = {ValidationGroups.Process.class,ValidationGroups.Produce.class,ValidationGroups.Plantation.class,ValidationGroups.Sale.class})
    private String intruduce;

    /**
    * 数据状态
    */
    @ApiModelProperty(value="数据状态")
    @NotBlank(message = "名称不能为空", groups = {ValidationGroups.Process.class,ValidationGroups.Produce.class,ValidationGroups.Plantation.class,ValidationGroups.Sale.class})
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