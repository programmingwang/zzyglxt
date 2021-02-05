package com.zyyglxt.dataobject;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@Data
public class ResourcesDO extends ResourcesDOKey {
    @NotBlank(message = "resourceName不能为空")
    private String resourceName;
    @NotBlank(message = "resourceType不能为空:权限：p，菜单：m")
    private String resourceType;

    private String resourcePcode;

    private String resourceLevel;
    @NotBlank(message = "resourceUrl不能为空")
    private String resourceUrl;

    private String resourceDescription;

    private Integer sort;

    private String creater;

    private Date itemcreateat;

    private String updater;

    private Date itemupdateat;

    /**
     * 存储子菜单集合
     */
    private List<ResourcesDO> resourcesDOList = new ArrayList<>();
    //@NotBlank(message = "roleNmae不能为空")
    private String roleNmae;
}