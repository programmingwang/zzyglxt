package com.zyyglxt.dto;

import lombok.Data;

/**
 * @Author nongcn
 * @Date 2020/11/10 12:52
 * @Version 1.0
 */
@Data
public class UserSessionDto {
    private String username;

    private int itemid;

    private String itemcode;

    private String rolename;
}
