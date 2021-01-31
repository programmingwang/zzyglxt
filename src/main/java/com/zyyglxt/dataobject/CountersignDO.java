package com.zyyglxt.dataobject;

import lombok.Data;

import java.util.Date;

@Data
public class CountersignDO extends CountersignDOKey {
    private String receivingTitle;

    private Integer number;

    private String govPunlic;

    private String reason;

    private String fileNo;

    private String fileNumber;

    private String classification;

    private String status;

    private String creater;

    private Date itemcreateat;

    private String updater;

    private Date itemupdateat;

    public String getReceivingTitle() {
        return receivingTitle;
    }

    public void setReceivingTitle(String receivingTitle) {
        this.receivingTitle = receivingTitle == null ? null : receivingTitle.trim();
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
        this.govPunlic = govPunlic == null ? null : govPunlic.trim();
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason == null ? null : reason.trim();
    }

    public String getFileNo() {
        return fileNo;
    }

    public void setFileNo(String fileNo) {
        this.fileNo = fileNo == null ? null : fileNo.trim();
    }

    public String getClassification() {
        return classification;
    }

    public void setClassification(String classification) {
        this.classification = classification == null ? null : classification.trim();
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }

    public String getCreater() {
        return creater;
    }

    public void setCreater(String creater) {
        this.creater = creater == null ? null : creater.trim();
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
        this.updater = updater == null ? null : updater.trim();
    }

    public Date getItemupdateat() {
        return itemupdateat;
    }

    public void setItemupdateat(Date itemupdateat) {
        this.itemupdateat = itemupdateat;
    }
}