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

    public Integer getItemid() {
        return itemid;
    }

    public void setItemid(Integer itemid) {
        this.itemid = itemid;
    }

    public String getItemcode() {
        return itemcode;
    }

    public void setItemcode(String itemcode) {
        this.itemcode = itemcode;
    }

    public String getDrugName() {
        return drugName;
    }

    public void setDrugName(String drugName) {
        this.drugName = drugName;
    }

    public String getFunctionIndications() {
        return functionIndications;
    }

    public void setFunctionIndications(String functionIndications) {
        this.functionIndications = functionIndications;
    }

    public String getUsage() {
        return usage;
    }

    public void setUsage(String usage) {
        this.usage = usage;
    }

    public String getAdverseReactions() {
        return adverseReactions;
    }

    public void setAdverseReactions(String adverseReactions) {
        this.adverseReactions = adverseReactions;
    }

    public String getTaboo() {
        return taboo;
    }

    public void setTaboo(String taboo) {
        this.taboo = taboo;
    }

    public String getSpecifications() {
        return specifications;
    }

    public void setSpecifications(String specifications) {
        this.specifications = specifications;
    }

    public String getCareful() {
        return careful;
    }

    public void setCareful(String careful) {
        this.careful = careful;
    }

    public String getStorage() {
        return storage;
    }

    public void setStorage(String storage) {
        this.storage = storage;
    }

    public String getPacking() {
        return packing;
    }

    public void setPacking(String packing) {
        this.packing = packing;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getOrgCode() {
        return orgCode;
    }

    public void setOrgCode(String orgCode) {
        this.orgCode = orgCode;
    }

    public String getCreater() {
        return creater;
    }

    public void setCreater(String creater) {
        this.creater = creater;
    }

    public Date getItemcreateat() {
        return itemcreateat;
    }

    public void setItemcreateat(Date itemcreateat) {
        this.itemcreateat = itemcreateat;
    }

    public String getUpdater() {
        return updater;
    }

    public void setUpdater(String updater) {
        this.updater = updater;
    }

    public Date getItemupdateat() {
        return itemupdateat;
    }

    public void setItemupdateat(Date itemupdateat) {
        this.itemupdateat = itemupdateat;
    }

}