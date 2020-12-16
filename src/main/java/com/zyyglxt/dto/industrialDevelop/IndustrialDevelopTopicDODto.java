package com.zyyglxt.dto.industrialDevelop;

import com.zyyglxt.dataobject.IndustrialDevelopSciAchiDO;
import com.zyyglxt.dataobject.IndustrialDevelopTopicDO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IndustrialDevelopTopicDODto extends IndustrialDevelopTopicDO {
    private String filePath;
    private String fileName;
    private String expertCode;
}