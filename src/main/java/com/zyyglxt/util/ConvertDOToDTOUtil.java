package com.zyyglxt.util;

import com.zyyglxt.dataobject.*;
import com.zyyglxt.dto.ChineseCulturalDto;
import com.zyyglxt.dto.CulturalResourcesDto;
import com.zyyglxt.dto.PostDto;
import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopSciAchiDODto;
import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopTopicDODto;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;

import java.util.Collections;
import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/11/6 15:39
 * Version: 1.0
 */
public class ConvertDOToDTOUtil {

    public static ChineseCulturalDto convertFromDOToDTO(ChineseCulturalDO chineseCulturalDO, String filePath){
        filePath = StringUtils.isEmpty(filePath) ? "已经损坏了" : filePath;
        ChineseCulturalDto chineseCulturalDto = new ChineseCulturalDto();
        BeanUtils.copyProperties(chineseCulturalDO,chineseCulturalDto);
        chineseCulturalDto.setFilePath(filePath);
        return chineseCulturalDto;
    }

    public static CulturalResourcesDto convertFromDOToDTO(CulturalResourcesDO culturalResourcesDO, String filePath){
        filePath = StringUtils.isEmpty(filePath) ? "已经损坏了" : filePath;
        CulturalResourcesDto culturalResourcesDto = new CulturalResourcesDto();
        BeanUtils.copyProperties(culturalResourcesDO,culturalResourcesDto);
        culturalResourcesDto.setFilePath(filePath);
        return culturalResourcesDto;
    }

    public static CulturalResourcesDto convertFromDOToDTO(CulturalResourcesDO culturalResourcesDO, String filePath, String fileName){
        filePath = StringUtils.isEmpty(filePath) ? "已经损坏了" : filePath;
        CulturalResourcesDto culturalResourcesDto = new CulturalResourcesDto();
        BeanUtils.copyProperties(culturalResourcesDO,culturalResourcesDto);
        culturalResourcesDto.setFilePath(filePath);
        culturalResourcesDto.setFileName(fileName);
        return culturalResourcesDto;
    }

    public static IndustrialDevelopSciAchiDODto convertFromDOToDTO(IndustrialDevelopSciAchiDO industrialDevelopSciAchiDO, String filePath, String fileName){
        filePath = StringUtils.isEmpty(filePath) ? "已经损坏了" : filePath;
        IndustrialDevelopSciAchiDODto industrialDevelopSciAchiDODto = new IndustrialDevelopSciAchiDODto();
        BeanUtils.copyProperties(industrialDevelopSciAchiDO,industrialDevelopSciAchiDODto);
        industrialDevelopSciAchiDODto.setFilePath(filePath);
        industrialDevelopSciAchiDODto.setFileName(fileName);
        return industrialDevelopSciAchiDODto;
    }

    public static IndustrialDevelopTopicDODto convertFromDOToDTO(IndustrialDevelopTopicDO topicDO, String filePath, String fileName){
        filePath = StringUtils.isEmpty(filePath) ? "已经损坏了" : filePath;
        IndustrialDevelopTopicDODto topicDODto = new IndustrialDevelopTopicDODto();
        BeanUtils.copyProperties(topicDO,topicDODto);
        topicDODto.setFilePath(filePath);
        topicDODto.setFileName(fileName);
        return topicDODto;
    }

    public static PostDto convertFromDOToDTO(PostDO postDO, List<String> filePath, List<String> fileName){
        filePath = StringUtils.isEmpty((CharSequence) filePath) ? Collections.singletonList("已经损坏了") : filePath;
        PostDto postDto = new PostDto();
        BeanUtils.copyProperties(postDO,postDto);
        postDto.setFilePath(filePath);
        postDto.setFileName(fileName);
        return postDto;
    }
}
