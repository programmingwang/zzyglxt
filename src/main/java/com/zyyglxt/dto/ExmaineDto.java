package com.zyyglxt.dto;

import com.zyyglxt.dataobject.IndustrialDevelopExpertRefDO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

/**
 * Author:wangzh
 * Date: 2020/11/21 12:57
 * Version: 1.0
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class ExmaineDto extends IndustrialDevelopExpertRefDO {
    private String projectNo;
    private String projectName;
    private String company;
}
