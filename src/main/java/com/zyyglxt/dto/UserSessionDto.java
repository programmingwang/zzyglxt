package com.zyyglxt.dto;

import lombok.Data;
import lombok.ToString;
/**
 * @Author nongcn
 * @Date 2020/11/10 12:52
 * @Version 1.0
 */
@Data
@ToString
public class UserSessionDto {
    private String username;

    private int itemid;

    private String itemcode;

    private String rolename;
}
