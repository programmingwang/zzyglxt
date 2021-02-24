package com.zyyglxt.dataobject;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

public class DataDO extends DataDOKey {

    @NotBlank(message = "名称或者标题不能为空")
    private String dataTitle;

    private String dataLocation;

    private String dataAuthor;

    private String dataSource;

    private String dataFileType;

    private Date dataDelayedRelease;

    private String dataStatus;

    private String dataType;

    private String creater;

    private Date itemcreateat;

    private String updater;

    private Date itemupdateat;

    @NotBlank(message = "正文不能为空")
    private String dataContent;

    //新增RELEASE_OR_NOT字段，注释是否发布到河北中医药网
    private String releaseOrNot;

    private Integer visitNum;

    public String getReleaseOrNot() {
        return releaseOrNot;
    }

    public void setReleaseOrNot(String releaseOrNot) {
        this.releaseOrNot = releaseOrNot == null ? null : releaseOrNot.trim();
    }

    public Integer getVisitNum() {
        return visitNum;
    }

    public void setVisitNum(Integer visitNum) {
        this.visitNum = visitNum;
    }


    public String getDataTitle() {
        return dataTitle;
    }


    public void setDataTitle(String dataTitle) {
        this.dataTitle = dataTitle == null ? null : dataTitle.trim();
    }


    public String getDataLocation() {
        return dataLocation;
    }


    public void setDataLocation(String dataLocation) {
        this.dataLocation = dataLocation == null ? null : dataLocation.trim();
    }


    public String getDataAuthor() {
        return dataAuthor;
    }


    public void setDataAuthor(String dataAuthor) {
        this.dataAuthor = dataAuthor == null ? null : dataAuthor.trim();
    }


    public String getDataSource() {
        return dataSource;
    }


    public void setDataSource(String dataSource) {
        this.dataSource = dataSource == null ? null : dataSource.trim();
    }

    public String getDataFileType() {
        return dataFileType;
    }

    public void setDataFileType(String dataFileType) {
        this.dataFileType = dataFileType == null ? null : dataFileType.trim();
    }

    public Date getDataDelayedRelease() {
        return dataDelayedRelease;
    }


    public void setDataDelayedRelease(Date dataDelayedRelease) {
        this.dataDelayedRelease = dataDelayedRelease;
    }


    public String getDataStatus() {
        return dataStatus;
    }


    public void setDataStatus(String dataStatus) {
        this.dataStatus = dataStatus == null ? null : dataStatus.trim();
    }


    public String getDataType() {
        return dataType;
    }


    public void setDataType(String dataType) {
        this.dataType = dataType == null ? null : dataType.trim();
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


    public String getDataContent() {
        return dataContent;
    }


    public void setDataContent(String dataContent) {
        this.dataContent = dataContent == null ? null : dataContent.trim();
    }
}