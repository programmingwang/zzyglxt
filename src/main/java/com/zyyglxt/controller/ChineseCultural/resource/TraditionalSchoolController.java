package com.zyyglxt.controller.ChineseCultural.resource;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.CulturalResourcesDO;
import com.zyyglxt.dataobject.CulturalResourcesDOKey;
import com.zyyglxt.dataobject.FileDO;
import com.zyyglxt.dto.CulturalResourcesDto;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IFileService;
import com.zyyglxt.service.ITraditionalSchoolService;
import com.zyyglxt.util.ConvertDOToDTOUtil;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/10/30 9:19
 * Version: 1.0
 * 中医流派控制器
 */
//@Controller
@RestController
@RequestMapping("/cul/res/traSch")
public class TraditionalSchoolController {

    @Resource
    private ITraditionalSchoolService iTraditionalSchoolService;

    @Resource
    private IFileService iFileService;

    //获取所有的中医流派
    @RequestMapping(value = "/getAll" , method = RequestMethod.GET)
    @ResponseBody
    @LogAnnotation(logTitle = "查询所有中医流派", logLevel = "1")
    public ResponseData getAllTraditionalSchool(@RequestParam(value = "chineseCulturalStatus")String chineseCulturalStatus){
        return new ResponseData(EmBusinessError.success,iTraditionalSchoolService.getTraditionalSchoolList(chineseCulturalStatus));
    }



    //增加一个中医流派
    @RequestMapping(value = "/addTraSch" , method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(logTitle = "增加一个中医流派", logLevel = "3")
    public ResponseData addTraditionalSchool(@RequestBody CulturalResourcesDO culturalResourcesDO){
        iTraditionalSchoolService.addTraditionalSchool(culturalResourcesDO);
        return new ResponseData(EmBusinessError.success);
    }

    //删除一个中医流派（真正的数据库中删除）
    @RequestMapping(value = "/delTraSch/{itemID}/{itemCode}" , method = RequestMethod.DELETE)
    @ResponseBody
    @LogAnnotation(logTitle = "删除一个中医流派", logLevel = "4")
    public ResponseData deleteTraditionalSchool(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        CulturalResourcesDOKey culturalResourcesDOKey = new CulturalResourcesDOKey();
        culturalResourcesDOKey.setItemid(itemID);
        culturalResourcesDOKey.setItemcode(itemCode);
        iTraditionalSchoolService.removeTraditionalSchool(culturalResourcesDOKey);
        return new ResponseData(EmBusinessError.success);
    }



    //修改一个中医流派
    @RequestMapping(value = "/updTraSch" , method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(logTitle = "修改一个中医流派", logLevel = "2")
    public ResponseData updateTraditionalSchool(@RequestBody CulturalResourcesDO culturalResourcesDO)  {
        iTraditionalSchoolService.updateTraditionalSchool(culturalResourcesDO);
        return new ResponseData(EmBusinessError.success);
    }

    //修改一个中医流派状态 （逻辑删除，但是是将状态改成下架状态,也可以是处长页面 通过->上架， 未通过->下架）
    @RequestMapping(value = "/cgTraSchSta/{itemID}/{itemCode}" , method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(logTitle = "修改一个中医流派状态", logLevel = "2")
    public ResponseData changeStatus(@RequestParam("chineseCulturalStatus") String chineseCulturalStatus , @PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        CulturalResourcesDOKey culturalResourcesDOKey = new CulturalResourcesDOKey();
        culturalResourcesDOKey.setItemid(itemID);
        culturalResourcesDOKey.setItemcode(itemCode);
        iTraditionalSchoolService.changeTraditionalSchoolStatus(culturalResourcesDOKey,chineseCulturalStatus);
        return new ResponseData(EmBusinessError.success);
    }
}
