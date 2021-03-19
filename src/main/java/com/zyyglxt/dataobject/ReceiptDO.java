package com.zyyglxt.dataobject;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.zyyglxt.dataobject.validation.ValidationGroups;

import javax.validation.constraints.NotBlank;
import java.util.Date;

public class ReceiptDO extends ReceiptDOKey {
    private String receivingNum;//收文号

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date receivingDateOfReceipt;//收文时间

    @NotBlank(message = "来文标题不能为空",groups = ValidationGroups.Insert.class)
    private String receivingTitle;//来文标题

    @NotBlank(message = "来文单位不能为空",groups = ValidationGroups.Insert.class)
    private String receivingUnitOfCommun;//来文单位

    private String fileNo;//文件编号

    private Integer number;//份数

    private String secretLevel;//密级

    private String receivingDegreeOfUrgency;//紧急程度

    private String receivingDataStatus;//数据状态

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date timeLimit;//办结时间

    private String creater;

    private Date itemcreateat;

    private String updater;

    private Date itemupdateat;

    private String reasono;//审核理由
    private String reasont;
    private String reasonh;
    private String reasonf;
    private String reasonv;
    private String reasons;

    private String nameo;//审核人姓名
    private String namet;
    private String nameh;
    private String namef;
    private String namev;
    private String names;

    private String receiptReason;//局长审核
    private String receiptReasonl;//分局审核

    public String getReceiptReason() {
        return receiptReason;
    }

    public void setReceiptReason(String receiptReason) {
        this.receiptReason = receiptReason== null ? null : receiptReason.trim();
    }

    public String getReceiptReasonl() {
        return receiptReasonl;
    }

    public void setReceiptReasonl(String receiptReasonl) {
        this.receiptReasonl = receiptReasonl== null ? null : receiptReasonl.trim();
    }

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date dateo;

    public String getReasono() {
        return reasono;
    }

    public void setReasono(String reasono) {
        this.reasono = reasono == null ? null : reasono.trim();
    }

    public String getReasont() {
        return reasont;
    }

    public void setReasont(String reasont) {
        this.reasont = reasont == null ? null : reasont.trim();
    }

    public String getReasonh() {
        return reasonh;
    }

    public void setReasonh(String reasonh) {
        this.reasonh = reasonh == null ? null : reasonh.trim();
    }

    public String getReasonf() {
        return reasonf;
    }

    public void setReasonf(String reasonf) {
        this.reasonf = reasonf == null ? null : reasonf.trim();
    }

    public String getReasonv() {
        return reasonv;
    }

    public void setReasonv(String reasonv) {
        this.reasonv = reasonv == null ? null : reasonv.trim();
    }

    public String getReasons() {
        return reasons;
    }

    public void setReasons(String reasons) {
        this.reasons = reasons == null ? null : reasons.trim();
    }

    public String getNameo() {
        return nameo;
    }

    public void setNameo(String nameo) {
        this.nameo = nameo == null ? null : nameo.trim();
    }

    public String getNamet() {
        return namet;
    }

    public void setNamet(String namet) {
        this.namet = namet == null ? null : namet.trim();
    }

    public String getNameh() {
        return nameh;
    }

    public void setNameh(String nameh) {
        this.nameh = nameh == null ? null : nameh.trim();
    }

    public String getNamef() {
        return namef;
    }

    public void setNamef(String namef) {
        this.namef = namef == null ? null : namef.trim();
}

    public String getNamev() {
        return namev;
    }

    public void setNamev(String namev) {
        this.namev = namev == null ? null : namev.trim();
    }

    public String getNames() {
        return names;
    }

    public void setNames(String names) {
        this.names = names == null ? null : names.trim();
    }

    public Date getDateo() {
        return dateo;
    }

    public void setDateo(Date dateo) {
        this.dateo = dateo;
    }

    public Date getDatet() {
        return datet;
    }

    public void setDatet(Date datet) {
        this.datet = datet;
    }

    public Date getDateh() {
        return dateh;
    }

    public void setDateh(Date dateh) {
        this.dateh = dateh;
    }

    public Date getDatef() {
        return datef;
    }

    public void setDatef(Date datef) {
        this.datef = datef;
    }

    public Date getDatev() {
        return datev;
    }

    public void setDatev(Date datev) {
        this.datev = datev;
    }

    public Date getDates() {
        return dates;
    }

    public void setDates(Date dates) {
        this.dates = dates;
    }
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date datet;//审核意见时间
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date dateh;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date datef;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date datev;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date dates;

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
        this.secretLevel = secretLevel== null ? null : secretLevel.trim();
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