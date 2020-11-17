package com.zyyglxt.dto.industrialDevelop;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * @Author lrt
 * @Date 2020/11/16 9:25
 * @Version 1.0
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuditDto {

    private Integer itemid;

    private String itemcode;

    private String name;

    private String status;

    private String addressCity;

    private String type;

    private Date itemcreateat;
}
