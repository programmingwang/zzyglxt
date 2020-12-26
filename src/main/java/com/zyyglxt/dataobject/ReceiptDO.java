package com.zyyglxt.dataobject;

import java.util.Date;

public class ReceiptDO extends ReceiptDOKey {
    private String receivingNum;

    private Date receivingDateOfReceipt;

    private String receivingTitle;

    private String receivingUnitOfCommun;

    private String fileNo;

    private Integer number;

    private String receivingDegreeOfUrgency;

    private String receivingDataStatus;

    private Date timeLimit;

    private String creater;

    private Date itemcreateat;

    private String updater;

    private Date itemupdateat;

    public String getReceivingNum() {
        return receivingNum;
    }

    public void setReceivingNum(String receivingNum) {
        this.receivingNum = receivingNum == null ? null : receivingNum.trim();
    }

    public Date getReceivingDateOfReceipt() {
        return receivingDateOfReceipt;
    }

    public void setReceivingDateOfReceipt(Date receivingDateOfReceipt) {
        this.receivingDateOfReceipt = receivingDateOfReceipt;
    }

    public String getReceivingTitle() {
        return receivingTitle;
    }

    public void setReceivingTitle(String receivingTitle) {
        this.receivingTitle = receivingTitle == null ? null : receivingTitle.trim();
    }

    public String getReceivingUnitOfCommun() {
        return receivingUnitOfCommun;
    }

    public void setReceivingUnitOfCommun(String receivingUnitOfCommun) {
        this.receivingUnitOfCommun = receivingUnitOfCommun == null ? null : receivingUnitOfCommun.trim();
    }

    public String getFileNo() {
        return fileNo;
    }

    public void setFileNo(String fileNo) {
        this.fileNo = fileNo == null ? null : fileNo.trim();
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public String getReceivingDegreeOfUrgency() {
        return receivingDegreeOfUrgency;
    }

    public void setReceivingDegreeOfUrgency(String receivingDegreeOfUrgency) {
        this.receivingDegreeOfUrgency = receivingDegreeOfUrgency == null ? null : receivingDegreeOfUrgency.trim();
    }

    public String getReceivingDataStatus() {
        return receivingDataStatus;
    }

    public void setReceivingDataStatus(String receivingDataStatus) {
        this.receivingDataStatus = receivingDataStatus == null ? null : receivingDataStatus.trim();
    }

    public Date getTimeLimit() {
        return timeLimit;
    }

    public void setTimeLimit(Date timeLimit) {
        this.timeLimit = timeLimit;
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