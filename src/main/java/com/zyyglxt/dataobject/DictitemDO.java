package com.zyyglxt.dataobject;

import javax.validation.constraints.NotBlank;
import java.util.Date;

public class DictitemDO extends DictitemDOKey {

    @NotBlank(message = "字典编码不能为空")
    private String dictCode;
    @NotBlank(message = "字典项编码不能为空")
    private String ditemCode;
    @NotBlank(message = "字典项值不能为空")
    private String ditemValue;
    private String ditemPcode;
    private String creater;
    private Date itemcreateat;
    private String updater;
    private Date itemupdateat;

    public String getDictCode() {
        return dictCode;
    }
    public void setDictCode(String dictCode) {
        this.dictCode = dictCode == null ? null : dictCode.trim();
    }
    public String getDitemCode() {
        return ditemCode;
    }
    public void setDitemCode(String ditemCode) {
        this.ditemCode = ditemCode == null ? null : ditemCode.trim();
    }
    public String getDitemValue() {
        return ditemValue;
    }
    public void setDitemValue(String ditemValue) {
        this.ditemValue = ditemValue == null ? null : ditemValue.trim();
    }
    public String getDitemPcode() {
        return ditemPcode;
    }
    public void setDitemPcode(String ditemPcode) {
        this.ditemPcode = ditemPcode == null ? null : ditemPcode.trim();
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