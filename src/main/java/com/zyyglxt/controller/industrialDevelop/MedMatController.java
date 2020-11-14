package com.zyyglxt.controller.industrialDevelop;

import com.zyyglxt.dataobject.IndustrialDevelopMedMat;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IndustrialDevelopMedMatService;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @Author lrt
 * @Date 2020/11/6 21:05
 * @Version 1.0
 **/
@Api(tags = "产业发展-加工企业在售药材、种植园在售药材")
@RestController
@RequestMapping(value = "industrialdevelop")
public class MedMatController {

    @Resource
    IndustrialDevelopMedMatService medMatService;

    @ResponseBody
    @RequestMapping(value = "med-mat", method = RequestMethod.POST)
    public ResponseData addMedMat(@RequestBody IndustrialDevelopMedMat record){
        medMatService.insertSelective(record);
        return new ResponseData(EmBusinessError.success);
    }

    @ResponseBody
    @RequestMapping(value = "med-mat", method = RequestMethod.PUT)
    public ResponseData updMedMat(@RequestBody IndustrialDevelopMedMat record){
        medMatService.updateByPrimaryKeySelective(record);
        return new ResponseData(EmBusinessError.success);
    }

    @ResponseBody
    @RequestMapping(value = "med-mat", method = RequestMethod.DELETE)
    public ResponseData delMedMat(@RequestBody IndustrialDevelopMedMat record){
        medMatService.deleteByPrimaryKey(record.getItemid(),record.getItemcode());
        return new ResponseData(EmBusinessError.success);
    }
}
