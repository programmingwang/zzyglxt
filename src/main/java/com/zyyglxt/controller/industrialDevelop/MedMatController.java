package com.zyyglxt.controller.industrialDevelop;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.FileDO;
import com.zyyglxt.dataobject.IndustrialDevelopMedMat;
import com.zyyglxt.dto.StatusDto;
import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopMedMatDto;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IFileService;
import com.zyyglxt.service.IndustrialDevelopMedMatService;
import io.swagger.annotations.Api;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * @Author lrt
 * @Date 2020/11/6 21:05
 * @Version 1.0
 **/
@Api(tags = "产业发展-加工企业在售药材、种植园在售药材")
@RestController
@RequestMapping(value = "/industrialdevelop/medmat")
public class MedMatController {

    @Resource
    IndustrialDevelopMedMatService medMatService;
    @Resource
    private IFileService fileService;

    @ResponseBody
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @LogAnnotation(appCode ="",logTitle ="添加产业发展-加工企业在售药材、种植园信息",logLevel ="3",creater ="",updater = "")
    public ResponseData addMedMat(@RequestBody IndustrialDevelopMedMat record){
        medMatService.insertSelective(record);
        return new ResponseData(EmBusinessError.success);
    }

    @ResponseBody
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @LogAnnotation(appCode ="",logTitle ="更新产业发展-加工企业在售药材、种植园信息",logLevel ="2",creater ="",updater = "")
    public ResponseData updMedMat(@RequestBody IndustrialDevelopMedMat record){
        medMatService.updateByPrimaryKeySelective(record);
        return new ResponseData(EmBusinessError.success);
    }

    @ResponseBody
    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    @LogAnnotation(appCode ="",logTitle ="删除产业发展-加工企业在售药材、种植园信息",logLevel ="4",creater ="",updater = "")
    public ResponseData delMedMat(@RequestBody IndustrialDevelopMedMat record){
        medMatService.deleteByPrimaryKey(record.getItemid(),record.getItemcode());
        return new ResponseData(EmBusinessError.success);
    }

    @ResponseBody
    @PostMapping("/updateStatus")
    public ResponseData updateStatus(StatusDto statusDto){
        medMatService.updateStatus(statusDto);
        return new ResponseData(EmBusinessError.success);
    }

    @ResponseBody
    @GetMapping("/selectMedMat")
    public ResponseData selectMedMatByORGCode(){
        List<IndustrialDevelopMedMat> medMatList = medMatService.selectMedMatByORGCode();
        return new ResponseData(EmBusinessError.success,DoToDto(medMatList));
    }

    private List<IndustrialDevelopMedMatDto> DoToDto(List<IndustrialDevelopMedMat> DOList){
        List<IndustrialDevelopMedMatDto> DtoList = new ArrayList<>();
        if (!DOList.isEmpty()){
            for (IndustrialDevelopMedMat DO:DOList){
                IndustrialDevelopMedMatDto Dto = new IndustrialDevelopMedMatDto();
                BeanUtils.copyProperties(DO,Dto);
                List<FileDO> fileDO= fileService.selectMultipleFileByDataCode(Dto.getItemcode());
                List<String> filePath = new ArrayList<>();
                for (FileDO file:fileDO){
                    filePath.add(file.getFilePath());
                }
                Dto.setFilePath(filePath);
                DtoList.add(Dto);
            }
        }
        return DtoList;
    }
}
