package com.zyyglxt.dataobject;

import java.util.Date;

public class PostDO extends PostDOKey {
    private String postDocumentNum; //文号

    private String postDocumentNum1; //文号2级选项

    private String postOpinion; //局长审核

    private String postOpinion1; //分局长审核

    private String postDocumentTitle; //文件标题

    private String postDataStatus; //数据状态

    private String postPublicWay; //公开方式

    private String postReason; //不公开理由

    private String postFairDepartmentReview; //是否需要公平竞争审查

    private String postNormativeDocuments; //是否规范性文件

    private Integer postPrinting; //印数

    private String postSecretRelated; //是否泄密

    private String creater;

    private Date itemcreateat;

    private String updater;

    private Date itemupdateat;

    public String getPostDocumentNum() {
        return postDocumentNum;
    }

    public void setPostDocumentNum(String postDocumentNum) {
        this.postDocumentNum = postDocumentNum == null ? null : postDocumentNum.trim();
    }

    public String getPostDocumentNum1() {
        return postDocumentNum1;
    }

    public void setPostDocumentNum1(String postDocumentNum1) {
        this.postDocumentNum1 = postDocumentNum1 == null ? null : postDocumentNum1.trim();
    }

    public String getPostOpinion() {
        return postOpinion;
    }

    public void setPostOpinion(String postOpinion) {
        this.postOpinion = postOpinion == null ? null : postOpinion.trim();
    }

    public String getPostOpinion1() {
        return postOpinion1;
    }

    public void setPostOpinion1(String postOpinion1) {
        this.postOpinion1 = postOpinion1 == null ? null : postOpinion1.trim();
    }

    public String getPostDocumentTitle() {
        return postDocumentTitle;
    }

    public void setPostDocumentTitle(String postDocumentTitle) {
        this.postDocumentTitle = postDocumentTitle == null ? null : postDocumentTitle.trim();
    }

    public String getPostDataStatus() {
        return postDataStatus;
    }

    public void setPostDataStatus(String postDataStatus) {
        this.postDataStatus = postDataStatus == null ? null : postDataStatus.trim();
    }

    public String getPostPublicWay() {
        return postPublicWay;
    }

    public void setPostPublicWay(String postPublicWay) {
        this.postPublicWay = postPublicWay == null ? null : postPublicWay.trim();
    }

    public String getPostReason() {
        return postReason;
    }

    public void setPostReason(String postReason) {
        this.postReason = postReason == null ? null : postReason.trim();
    }

    public String getPostFairDepartmentReview() {
        return postFairDepartmentReview;
    }

    public void setPostFairDepartmentReview(String postFairDepartmentReview) {
        this.postFairDepartmentReview = postFairDepartmentReview == null ? null : postFairDepartmentReview.trim();
    }

    public String getPostNormativeDocuments() {
        return postNormativeDocuments;
    }

    public void setPostNormativeDocuments(String postNormativeDocuments) {
        this.postNormativeDocuments = postNormativeDocuments == null ? null : postNormativeDocuments.trim();
    }

    public Integer getPostPrinting() {
        return postPrinting;
    }

    public void setPostPrinting(Integer postPrinting) {
        this.postPrinting = postPrinting;
    }

    public String getPostSecretRelated() {
        return postSecretRelated;
    }

    public void setPostSecretRelated(String postSecretRelated) {
        this.postSecretRelated = postSecretRelated == null ? null : postSecretRelated.trim();
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