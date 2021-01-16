package com.zyyglxt.controller.ChineseCultural.facility;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;
import com.zyyglxt.dto.ChineseCulturalDto;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.ICulturalRelicsService;
import com.zyyglxt.service.IFileService;
import com.zyyglxt.util.ConvertDOToDTOUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/10/30 12:22
 * Version: 1.0
 * 文化古迹控制器
 */
//@Controller
@RestController
@RequestMapping("/cul/fac/culRel")
@Slf4j
public class CulturalRelicsController {

    @Resource
    private ICulturalRelicsService iCulturalRelicsService;

    @Resource
    private IFileService iFileService;

    //获取所有的文化古迹
    @RequestMapping(value = "/getAll" , method = RequestMethod.GET)
    @ResponseBody
    @LogAnnotation(logTitle = "查看所有文化古迹", logLevel = "1")
    public ResponseData getAllCulturalRelics(@RequestParam(value = "chineseCulturalStatus")String chineseCulturalStatus){
        return new ResponseData(EmBusinessError.success,iCulturalRelicsService.getCulturalRelicsList(chineseCulturalStatus));
    }



    //增加一个文化古迹
    @RequestMapping(value = "/addCulRel" , method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(logTitle = "增加一个文化古迹", logLevel = "3")
    public ResponseData addCulturalRelics(@RequestBody ChineseCulturalDO chineseCulturalDO){
        iCulturalRelicsService.addCulturalRelics(chineseCulturalDO);
        return new ResponseData(EmBusinessError.success);
    }

    //删除一个文化古迹（真正的数据库中删除）
    @RequestMapping(value = "/delCulRel/{itemID}/{itemCode}" , method = RequestMethod.DELETE)
    @ResponseBody
    @LogAnnotation(logTitle = "删除一个文化古迹", logLevel = "4")
    public ResponseData deleteCulturalRelics(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        ChineseCulturalDOKey chineseCulturalDOKey = new ChineseCulturalDOKey();
        chineseCulturalDOKey.setItemid(itemID);
        chineseCulturalDOKey.setItemcode(itemCode);
        iCulturalRelicsService.removeCulturalRelics(chineseCulturalDOKey);
        return new ResponseData(EmBusinessError.success);
    }



    //修改一个文化古迹
    @RequestMapping(value = "/updCulRel" , method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(logTitle = "修改一个文化古迹", logLevel = "2")
    public ResponseData updateCulturalRelics(@RequestBody ChineseCulturalDO chineseCulturalDO){
        iCulturalRelicsService.updateCulturalRelics(chineseCulturalDO);
        return new ResponseData(EmBusinessError.success);
    }

    //修改一个文化古迹状态 （逻辑删除，但是是将状态改成下架状态,也可以是处长页面 通过->上架， 未通过->下架）
    @RequestMapping(value = "/cgCulRelSta/{itemID}/{itemCode}" , method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(logTitle = "修改一个文化古迹信息状态", logLevel = "2")
    public ResponseData changeStatus(@RequestParam("chineseCulturalStatus") String chineseCulturalStatus , @PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        ChineseCulturalDOKey chineseCulturalDOKey = new ChineseCulturalDOKey();
        chineseCulturalDOKey.setItemid(itemID);
        chineseCulturalDOKey.setItemcode(itemCode);
        iCulturalRelicsService.changeCulturalRelics(chineseCulturalDOKey,chineseCulturalStatus);
        return new ResponseData(EmBusinessError.success);
    }
}
