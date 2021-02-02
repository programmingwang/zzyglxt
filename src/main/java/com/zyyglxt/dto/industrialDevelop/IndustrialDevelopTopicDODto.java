package com.zyyglxt.dto.industrialDevelop;

import com.zyyglxt.dataobject.IndustrialDevelopTopicDO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IndustrialDevelopTopicDODto extends IndustrialDevelopTopicDO {
    private String filePath;
    private String fileName;
    private List<IndustrialDevelopExpertDto> expertList;
}