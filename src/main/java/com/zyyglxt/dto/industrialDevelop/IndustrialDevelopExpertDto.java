package com.zyyglxt.dto.industrialDevelop;

import com.zyyglxt.dataobject.UserDO;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *@Author zs
 *@Date 2020/11/15 16:22
 *@Version 1.0
 **/
@ApiModel(value = "com-zyyglxt-dataobject-IndustrialDevelopExpert")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class IndustrialDevelopExpertDto extends UserDO  {
    private String filed;
    private String userCode;
}
