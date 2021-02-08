package com.zyyglxt.dataobject;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.zyyglxt.dataobject.validation.ValidationGroups;

import javax.validation.constraints.NotBlank;
import java.util.Date;

public class RequestReportDO extends RequestReportDOKey {

  @NotBlank(message = "报告标题不能为空",groups = ValidationGroups.Insert.class)
    private String reportTitle;

    private String reportDataStatus;

    @NotBlank(message = "报告内容不能为空",groups = ValidationGroups.Insert.class)
    private String reportContent;

    private String reason;

    private String reasonone;

    private String reasontwo;

    private String reasonth;

    private String creater;

    private Date itemcreateat;

    private String updater;

    private String updaterone;

    private String updatertwo;

    private String updaterth;

    private String updaterf;

    private Date itemupdateat;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date updateone;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date updatetwo;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date updatef;

    public String getReasonth() {
        return reasonth;
    }

    public void setReasonth(String reasonth) {
        this.reasonth = reasonth == null ? null : reasonth.trim();
    }

    public String getUpdaterth() {
        return updaterth;
    }

    public void setUpdaterth(String updaterth) {
        this.updaterth = updaterth == null ? null : updaterth.trim();
    }

    public Date getUpdateth() {
        return updateth;
    }

    public void setUpdateth(Date updateth) {
        this.updateth = updateth;
    }

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date updateth;

    public String getReasonone() {
        return reasonone;
    }

    public void setReasonone(String reasonone) {
        this.reasonone = reasonone == null ? null : reasonone.trim();
    }

    public String getReasontwo() {
        return reasontwo;
    }

    public void setReasontwo(String reasontwo) {
        this.reasontwo = reasontwo == null ? null : reasontwo.trim();
    }

    public String getUpdaterone() {
        return updaterone;
    }

    public void setUpdaterone(String updaterone) {
        this.updaterone = updaterone == null ? null : updaterone.trim();
    }

    public String getUpdatertwo() {
        return updatertwo;
    }

    public void setUpdatertwo(String updatertwo) {
        this.updatertwo = updatertwo == null ? null : updatertwo.trim();
    }

    public Date getUpdateone() {
        return updateone;
    }

    public void setUpdateone(Date updateone) {
        this.updateone = updateone;
    }

    public Date getUpdatetwo() {
        return updatetwo;
    }

    public void setUpdatetwo(Date updatetwo) {
        this.updatetwo = updatetwo;
    }


    public String getReportTitle() {
        return reportTitle;
    }

    public void setReportTitle(String reportTitle) {
        this.reportTitle = reportTitle == null ? null : reportTitle.trim();
    }

    public String getReportDataStatus() {
        return reportDataStatus;
    }

    public void setReportDataStatus(String reportDataStatus) {
        this.reportDataStatus = reportDataStatus == null ? null : reportDataStatus.trim();
    }
    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason == null ? null : reason.trim();
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

    public String getReportContent() {
        return reportContent;
    }

    public void setReportContent(String reportContent) {
        this.reportContent = reportContent == null ? null : reportContent.trim();
    }
    public String getUpdaterf() {
        return updaterf;
    }

    public void setUpdaterf(String updaterf) {
        this.updaterf = updaterf == null ? null : updaterf.trim();

    }

    public Date getUpdatef() {
        return updatef;
    }

    public void setUpdatef(Date updatef) {
        this.updatef = updatef;
    }
}