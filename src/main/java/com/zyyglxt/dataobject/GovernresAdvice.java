package com.zyyglxt.dataobject;

import java.util.Date;

/**
    * 记录发文、请示报告、会签意见表
    */
public class GovernresAdvice {
    /**
    * 自增id
    */
    private Integer itemid;

    /**
    * UUID
    */
    private String itemcode;

    /**
    * 主表中itemCode
    */
    private String dataCode;

    /**
    * 初始拟稿
    */
    private String initial;

    /**
    * 初始拟稿时间
    */
    private Date initialDate;

    /**
    * 处室拟稿
    */
    private String department;

    /**
    * 处室拟稿时间
    */
    private Date departDate;

    /**
    * 办公室核稿
    */
    private String office;

    /**
    * 办公室核稿时间
    */
    private Date officeDate;

    /**
    * 分局长审核意见
    */
    private String deputyDirector;

    /**
    * 分局长审核时间
    */
    private Date deputyDirectorDate;

    /**
    * 局长审核意见
    */
    private String director;

    /**
    * 局长审核时间
    */
    private Date directorDate;

    /**
    * 创建者
    */
    private String creater;

    /**
    * 创建时间
    */
    private Date itemcreateat;

    /**
    * 修改人
    */
    private String updater;

    /**
    * 修改时间
    */
    private Date itemupdateat;

    public Integer getItemid() {
        return itemid;
    }

    public void setItemid(Integer itemid) {
        this.itemid = itemid;
    }

    public String getItemcode() {
        return itemcode;
    }

    public void setItemcode(String itemcode) {
        this.itemcode = itemcode;
    }

    public String getDataCode() {
        return dataCode;
    }

    public void setDataCode(String dataCode) {
        this.dataCode = dataCode;
    }

    public String getInitial() {
        return initial;
    }

    public void setInitial(String initial) {
        this.initial = initial;
    }

    public Date getInitialDate() {
        return initialDate;
    }

    public void setInitialDate(Date initialDate) {
        this.initialDate = initialDate;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Date getDepartDate() {
        return departDate;
    }

    public void setDepartDate(Date departDate) {
        this.departDate = departDate;
    }

    public String getOffice() {
        return office;
    }

    public void setOffice(String office) {
        this.office = office;
    }

    public Date getOfficeDate() {
        return officeDate;
    }

    public void setOfficeDate(Date officeDate) {
        this.officeDate = officeDate;
    }

    public String getDeputyDirector() {
        return deputyDirector;
    }

    public void setDeputyDirector(String deputyDirector) {
        this.deputyDirector = deputyDirector;
    }

    public Date getDeputyDirectorDate() {
        return deputyDirectorDate;
    }

    public void setDeputyDirectorDate(Date deputyDirectorDate) {
        this.deputyDirectorDate = deputyDirectorDate;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public Date getDirectorDate() {
        return directorDate;
    }

    public void setDirectorDate(Date directorDate) {
        this.directorDate = directorDate;
    }

    public String getCreater() {
        return creater;
    }

    public void setCreater(String creater) {
        this.creater = creater;
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
        this.updater = updater;
    }

    public Date getItemupdateat() {
        return itemupdateat;
    }

    public void setItemupdateat(Date itemupdateat) {
        this.itemupdateat = itemupdateat;
    }
}