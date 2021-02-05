package com.zyyglxt.dataobject;


import javax.validation.constraints.NotBlank;
import java.util.Date;

public class FamPreDO extends FamPreDOKey {

    @NotBlank(message = "名方名称不能为空")
    private String name;

    private String author;

    private String famsource;
    @NotBlank(message = "名方出处不能为空")
    private String source;

    @NotBlank(message = "名方处方不能为空")
    private String prescription;

    private Integer visitNum;

    private String status;

    @NotBlank(message = "名方剂型不能为空")
    private String type;

    private String creater;

    private Date itemcreateat;

    private String updater;

    private Date itemupdateat;

    @NotBlank(message = "名方制法及用途不能为空")
    private String content;

    public String getName() {
        return name;
    }
    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author == null ? null : author.trim();
    }
    public String getFamsource() {
        return famsource;
    }

    public void setFamsource(String famsource) {
        this.famsource = famsource == null ? null : famsource.trim();
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source == null ? null : source.trim();
    }

    public String getPrescription() {
        return prescription;
    }

    public void setPrescription(String prescription) {
        this.prescription = prescription == null ? null : prescription.trim();
    }

    public Integer getVisitNum() {
        return visitNum;
    }

    public void setVisitNum(Integer visitNum) {
        this.visitNum = visitNum;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type == null ? null : type.trim();
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