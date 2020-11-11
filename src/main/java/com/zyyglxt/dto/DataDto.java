package com.zyyglxt.dto;

import com.zyyglxt.dataobject.DataDO;
import lombok.Data;
import lombok.ToString;
import lombok.experimental.Accessors;

import java.util.Date;

/**
 * @Author huangtao
 * @Date 2020/11/6 20:48
 * @Version 1.0
 */
@Data
@ToString
public class DataDto extends DataDO {
    private String filePath;
}
