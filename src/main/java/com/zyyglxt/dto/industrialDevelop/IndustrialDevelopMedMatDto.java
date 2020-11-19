package com.zyyglxt.dto.industrialDevelop;

import com.zyyglxt.dataobject.IndustrialDevelopMedMat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

/**
 * @Author lrt
 * @Date 2020/11/8 22:46
 * @Version 1.0
 **/
@ApiModel(value = "com-zyyglxt-dataobject-IndustrialDevelopMedMat")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class IndustrialDevelopMedMatDto extends IndustrialDevelopMedMat {
    private List<String> filePath;
}