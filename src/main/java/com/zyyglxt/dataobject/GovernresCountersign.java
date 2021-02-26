package com.zyyglxt.dataobject;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
    * 会签记录表
    */
public class GovernresCountersign {
    /**
    * 自增id
    */
    private Integer itemid;

    /**
    * UUID
    */
    private String itemcode;

    /**
    * 文件标题
    */
    @NotBlank(message = "文件标题不能为空")
    private String receivingTitle;

    /**
    * 需要份数
    */
    @NotNull(message = "需要份数不能为空")
    private Integer number;

    /**
    * 政府信息公开
    */
    @NotBlank(message = "政府信息公开不能不勾选")
    private String govPunlic;

    /**
    * 不公开理由
    */
    private String reason;

    /**
    * 文件编号
    */
    private String fileNo;

    /**
    * 密级
    */
    @NotBlank(message = "密级不能为空")
    private String classification;

    /**
    * 数据状态
    */
    private String status;

    /**
    * 创建者
    */
    private String creater;

    /**
    * 创建时间
    */
    private Date itemcreateat;

    /**
    * 修改人
    */
    private String updater;

    /**
    * 修改时间
    */
    private Date itemupdateat;
    private String parment;
    @NotBlank(message = "文件编号不能为空")
    private String fileNumber;

    public String getFileNumber() {
        return fileNumber;
    }

    public void setFileNumber(String fileNumber) {
        this.fileNumber = fileNumber;
    }

    public String getParment() {
        return parment;
    }

    public void setParment(String parment) {
        this.parment = parment;
    }

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

    public String getReceivingTitle() {
        return receivingTitle;
    }

    public void setReceivingTitle(String receivingTitle) {
        this.receivingTitle = receivingTitle;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public String getGovPunlic() {
        return govPunlic;
    }

    public void setGovPunlic(String govPunlic) {
        this.govPunlic = govPunlic;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getFileNo() {
        return fileNo;
    }

    public void setFileNo(String fileNo) {
        this.fileNo = fileNo;
    }

    public String getClassification() {
        return classification;
    }

    public void setClassification(String classification) {
        this.classification = classification;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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