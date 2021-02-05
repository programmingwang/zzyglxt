package com.zyyglxt.dataobject;

import lombok.Data;

import java.io.Serializable;

/**
 * @Author lrt
 * @Date 2020/11/2 17:12
 * @Version 1.0
 **/
@Data
public class DictItem implements Serializable {
    private String code;
    private String value;
}
