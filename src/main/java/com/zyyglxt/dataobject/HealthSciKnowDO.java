package com.zyyglxt.dataobject;

import javax.validation.constraints.NotBlank;
import java.util.Date;

public class HealthSciKnowDO extends HealthSciKnowDOKey {

    @NotBlank(message = "科普知识名称不能为空")
    private String scienceKnowledgeName;

    private String scienceKnowledgeSource;

    @NotBlank(message = "作者不能为空")
    private String scienceKnowledgeAuthor;

    private Integer visitNum;

    private String scienceKnowledgeStatus;

    private String creater;

    private Date itemcreateat;

    private String updater;

    private Date itemupdateat;

    private String content;

    public String getScienceKnowledgeName() {
        return scienceKnowledgeName;
    }

    public void setScienceKnowledgeName(String scienceKnowledgeName) {
        this.scienceKnowledgeName = scienceKnowledgeName == null ? null : scienceKnowledgeName.trim();
    }

    public String getScienceKnowledgeSource() {
        return scienceKnowledgeSource;
    }

    public void setScienceKnowledgeSource(String scienceKnowledgeSource) {
        this.scienceKnowledgeSource = scienceKnowledgeSource == null ? null : scienceKnowledgeSource.trim();
    }

    public String getScienceKnowledgeAuthor() {
        return scienceKnowledgeAuthor;
    }

    public void setScienceKnowledgeAuthor(String scienceKnowledgeAuthor) {
        this.scienceKnowledgeAuthor = scienceKnowledgeAuthor == null ? null : scienceKnowledgeAuthor.trim();
    }

    public Integer getVisitNum() {
        return visitNum;
    }

    public void setVisitNum(Integer visitNum) {
        this.visitNum = visitNum;
    }

    public String getScienceKnowledgeStatus() {
        return scienceKnowledgeStatus;
    }

    public void setScienceKnowledgeStatus(String scienceKnowledgeStatus) {
        this.scienceKnowledgeStatus = scienceKnowledgeStatus == null ? null : scienceKnowledgeStatus.trim();
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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }
}