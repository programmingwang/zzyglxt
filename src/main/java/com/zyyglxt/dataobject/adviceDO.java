package com.zyyglxt.dataobject;

import lombok.Data;

import java.util.Date;

@Data
public class adviceDO extends adviceDOKey {
    private String dataCode;

    private String initial;

    private Date initialDate;

    private String department;

    private String departmentName;

    private Date departDate;

    private String office;

    private String officeName;

    private Date officeDate;

    private String deputyDirector; //中医处分管局长审核意见

    private String deputyDirectorName; //中医处分管局长姓名

    private Date deputyDirectorDate; //中医处分管局长审核时间

    private String deputyDirector1; //中药处分管局长审核意见

    private String deputyDirectorName1; //中药处分管局长姓名

    private Date deputyDirectorDate1; //中药处分管局长审核时间

    private String deputyDirector2; //综合处分管局长审核意见

    private String deputyDirectorName2;  //综合处分管局长姓名

    private Date deputyDirectorDate2; //综合处分管局长审核时间

    private String deputyDirector3; //法规监督处分管局长审核意见

    private String deputyDirectorName3; //法规监督处分管局长姓名

    private Date deputyDirectorDate3; //法规监督处分管局长审核时间

    private String director;

    private String directorName;

    private Date directorDate;

    private String signOpinion;

    private Date signDate;

    private String signName;

    private String creater;

    private Date itemcreateat;

    private String updater;

    private Date itemupdateat;

    public String getDataCode() {
        return dataCode;
    }

    public void setDataCode(String dataCode) {
        this.dataCode = dataCode == null ? null : dataCode.trim();
    }

    public String getInitial() {
        return initial;
    }

    public void setInitial(String initial) {
        this.initial = initial == null ? null : initial.trim();
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
        this.department = department == null ? null : department.trim();
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
        this.office = office == null ? null : office.trim();
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
        this.deputyDirector = deputyDirector == null ? null : deputyDirector.trim();
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
        this.director = director == null ? null : director.trim();
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

    public String getSignOpinion() {
        return signOpinion;
    }

    public void setSignOpinion(String signOpinion) {
        this.signOpinion = signOpinion;
    }

    public Date getSignDate() {
        return signDate;
    }

    public void setSignDate(Date signDate) {
        this.signDate = signDate;
    }

    public String getSignName() {
        return signName;
    }

    public void setSignName(String signName) {
        this.signName = signName;
    }
}