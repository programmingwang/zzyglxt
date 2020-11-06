package com.zyyglxt.dataobject;

import lombok.ToString;

import javax.validation.constraints.NotBlank;
import java.util.Date;

@ToString
public class DictDO extends DictDOKey {
    @NotBlank(message = "字典名称不能为空")
    private String dictName;
    @NotBlank(message = "字典编码不能为空")
    private String dictCode;
    private String dictIstree;
    @NotBlank(message = "字典描述不能为空")
    private String dictDescription;
    private String creater;
    private Date itemcreateat;
    private String updater;
    private Date itemupdateat;
    public String getDictName() {
        return dictName;
    }
    public void setDictName(String dictName) {
        this.dictName = dictName == null ? null : dictName.trim();
    }
    public String getDictCode() {
        return dictCode;
    }
    public void setDictCode(String dictCode) {
        this.dictCode = dictCode == null ? null : dictCode.trim();
    }
    public String getDictIstree() {
        return dictIstree;
    }
    public void setDictIstree(String dictIstree) {
        this.dictIstree = dictIstree == null ? null : dictIstree.trim();
    }
    public String getDictDescription() {
        return dictDescription;
    }
    public void setDictDescription(String dictDescription) {
        this.dictDescription = dictDescription == null ? null : dictDescription.trim();
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