package com.zyyglxt.dataobject;

import javax.validation.constraints.NotBlank;
import java.util.Date;

public class ReceiptDO extends ReceiptDOKey {
    private String receivingNum;//收文号

    private Date receivingDateOfReceipt;//收文时间

    @NotBlank(message = "来文标题不能为空")
    private String receivingTitle;//来文标题

    private String receivingUnitOfCommun;//来文单位

    private String fileNo;//文件编号

    private Integer number;//份数

    @NotBlank(message = "来文密级不能为空")
    private  String secretLevel;//密级

    private String receivingDegreeOfUrgency;//紧急程度

    private String receivingDataStatus;//数据状态

    private Date timeLimit;//办结时间

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


    public String getSecretLevel() {
        return secretLevel;
    }

    public void setSecretLevel(String secretLevel) {
        this.secretLevel = secretLevel== null ? null : secretLevel.trim();;
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