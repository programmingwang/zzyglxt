package com.zyyglxt.dataobject;

import javax.validation.constraints.NotBlank;
import java.util.Date;

public class HealthCareChineseMedicineDO extends HealthCareChineseMedicineDOKey {

    @NotBlank(message = "中医药名称不能为空")
    private String chineseMedicineName;

    private String chineseMedicineType;

    @NotBlank(message = "中医药别名不能为空")
    private String chineseMedicineAlias;

    private String chineseMedicineSource;

    @NotBlank(message = "中医药采制不能为空")
    private String chineseMedicineHarvesting;

    @NotBlank(message = "中医药性味不能为空")
    private String chineseMedicineTaste;

    @NotBlank(message = "中医药归经不能为空")
    private String chineseMedicineMerTro;

    @NotBlank(message = "中医药功能主治不能为空")
    private String chineseMedicineEffect;

    @NotBlank(message = "中医药用法用量不能为空")
    private String chineseMedicineUsage;

    private String chineseMedicineStatus;

    private String creater;

    private Date itemcreateat;

    private String updater;

    private Date itemupdateat;

    public String getChineseMedicineName() {
        return chineseMedicineName;
    }

    public void setChineseMedicineName(String chineseMedicineName) {
        this.chineseMedicineName = chineseMedicineName == null ? null : chineseMedicineName.trim();
    }

    public String getChineseMedicineType() {
        return chineseMedicineType;
    }

    public void setChineseMedicineType(String chineseMedicineType) {
        this.chineseMedicineType = chineseMedicineType == null ? null : chineseMedicineType.trim();
    }

    public String getChineseMedicineAlias() {
        return chineseMedicineAlias;
    }

    public void setChineseMedicineAlias(String chineseMedicineAlias) {
        this.chineseMedicineAlias = chineseMedicineAlias == null ? null : chineseMedicineAlias.trim();
    }

    public String getChineseMedicineSource() {
        return chineseMedicineSource;
    }

    public void setChineseMedicineSource(String chineseMedicineSource) {
        this.chineseMedicineSource = chineseMedicineSource == null ? null : chineseMedicineSource.trim();
    }

    public String getChineseMedicineHarvesting() {
        return chineseMedicineHarvesting;
    }

    public void setChineseMedicineHarvesting(String chineseMedicineHarvesting) {
        this.chineseMedicineHarvesting = chineseMedicineHarvesting == null ? null : chineseMedicineHarvesting.trim();
    }

    public String getChineseMedicineTaste() {
        return chineseMedicineTaste;
    }

    public void setChineseMedicineTaste(String chineseMedicineTaste) {
        this.chineseMedicineTaste = chineseMedicineTaste == null ? null : chineseMedicineTaste.trim();
    }

    public String getChineseMedicineMerTro() {
        return chineseMedicineMerTro;
    }

    public void setChineseMedicineMerTro(String chineseMedicineMerTro) {
        this.chineseMedicineMerTro = chineseMedicineMerTro == null ? null : chineseMedicineMerTro.trim();
    }

    public String getChineseMedicineEffect() {
        return chineseMedicineEffect;
    }

    public void setChineseMedicineEffect(String chineseMedicineEffect) {
        this.chineseMedicineEffect = chineseMedicineEffect == null ? null : chineseMedicineEffect.trim();
    }

    public String getChineseMedicineUsage() {
        return chineseMedicineUsage;
    }

    public void setChineseMedicineUsage(String chineseMedicineUsage) {
        this.chineseMedicineUsage = chineseMedicineUsage == null ? null : chineseMedicineUsage.trim();
    }

    public String getChineseMedicineStatus() {
        return chineseMedicineStatus;
    }

    public void setChineseMedicineStatus(String chineseMedicineStatus) {
        this.chineseMedicineStatus = chineseMedicineStatus == null ? null : chineseMedicineStatus.trim();
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