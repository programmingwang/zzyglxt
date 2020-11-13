package com.zyyglxt.util;

import com.zyyglxt.dataobject.CulturalResourcesDO;
import com.zyyglxt.dataobject.FamPreDO;
import com.zyyglxt.dataobject.HealthCareFamPreDO;
import com.zyyglxt.dto.CulturalResourcesDto;
import com.zyyglxt.dto.HealthCareFamPreDto;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/11/11 21:40
 */
public class ConvertDOToCareFamPre {
    public static HealthCareFamPreDto convertFromCareFamPre(HealthCareFamPreDO healthCareFamPreDO, String filePath, String fileName) {
        if (StringUtils.isEmpty(filePath)) {
            filePath = "已经损坏了";
        }
        HealthCareFamPreDto healthCareFamPreDto = new HealthCareFamPreDto();
        BeanUtils.copyProperties(healthCareFamPreDO, healthCareFamPreDto);
        healthCareFamPreDto.setFilePath(filePath);
        healthCareFamPreDto.setFileName(fileName);
        return healthCareFamPreDto;
    }
}
