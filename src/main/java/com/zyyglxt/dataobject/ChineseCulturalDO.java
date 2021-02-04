package com.zyyglxt.dataobject;

import lombok.ToString;

import javax.validation.constraints.NotBlank;
import java.util.Date;

@ToString
public class ChineseCulturalDO extends ChineseCulturalDOKey {

    @NotBlank(message = "名称不能为空")
    private String chineseCulturalName;

    private String chineseCulturalSource;

    private String chineseCulturalAuthor;

    private Integer visitNum;

    private String chineseCulturalType;

    private String chineseCulturalStatus;

    private String creater;

    private Date itemcreateat;

    private String updater;

    private Date itemupdateat;

    @NotBlank(message = "正文不能为空")
    private String chineseCulturalContent;

    public String getChineseCulturalName() {
        return chineseCulturalName;
    }

    public void setChineseCulturalName(String chineseCulturalName) {
        this.chineseCulturalName = chineseCulturalName == null ? null : chineseCulturalName.trim();
    }

    public String getChineseCulturalSource() {
        return chineseCulturalSource;
    }

    public void setChineseCulturalSource(String chineseCulturalSource) {
        this.chineseCulturalSource = chineseCulturalSource == null ? null : chineseCulturalSource.trim();
    }

    public String getChineseCulturalAuthor() {
        return chineseCulturalAuthor;
    }

    public void setChineseCulturalAuthor(String chineseCulturalAuthor) {
        this.chineseCulturalAuthor = chineseCulturalAuthor == null ? null : chineseCulturalAuthor.trim();
    }

    public Integer getVisitNum() {
        return visitNum;
    }

    public void setVisitNum(Integer visitNum) {
        this.visitNum = visitNum;
    }

    public String getChineseCulturalType() {
        return chineseCulturalType;
    }

    public void setChineseCulturalType(String chineseCulturalType) {
        this.chineseCulturalType = chineseCulturalType == null ? null : chineseCulturalType.trim();
    }

    public String getChineseCulturalStatus() {
        return chineseCulturalStatus;
    }

    public void setChineseCulturalStatus(String chineseCulturalStatus) {
        this.chineseCulturalStatus = chineseCulturalStatus == null ? null : chineseCulturalStatus.trim();
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

    public String getChineseCulturalContent() {
        return chineseCulturalContent;
    }

    public void setChineseCulturalContent(String chineseCulturalContent) {
        this.chineseCulturalContent = chineseCulturalContent == null ? null : chineseCulturalContent.trim();
    }
}