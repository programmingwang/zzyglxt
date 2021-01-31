package com.zyyglxt.dto;

import com.zyyglxt.dataobject.GovernresCountersign;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.List;

/**
 * @Author ZS
 * @Date 2021/1/31 14:36
 * @Version 1.0
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class CountersignDto extends GovernresCountersign {
    private List<String> fileName;
    private List<String> filePath;

}
