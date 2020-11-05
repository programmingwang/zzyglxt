package com.zyyglxt.controller.ChineseCultural.resource;

import com.zyyglxt.dataobject.CulturalResourcesDO;
import com.zyyglxt.dataobject.CulturalResourcesDOKey;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.ITraditionalSchoolService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
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

    //获取所有的中医流派
    @RequestMapping(value = "/getAll" , method = RequestMethod.GET)
    @ResponseBody
    public ResponseData getAllTraditionalSchool(){
        List<CulturalResourcesDO> traditionalSchoolList = iTraditionalSchoolService.getTraditionalSchoolList();
        return new ResponseData(EmBusinessError.success,traditionalSchoolList);
    }

//    //查询一个中医流派
//
//    //去增加页面,这个是为了跳转到增加的页面
//    @RequestMapping(value = "/toAddPage" , method = RequestMethod.GET)
//    public ResponseData toAddPage(){
//        return "to add page";
//    }

    //增加一个中医流派
    @RequestMapping(value = "/addTraSch" , method = RequestMethod.POST)
    @ResponseBody
    public ResponseData addTraditionalSchool(@RequestBody CulturalResourcesDO culturalResourcesDO){
        iTraditionalSchoolService.addTraditionalSchool(culturalResourcesDO);
        return new ResponseData(EmBusinessError.success);
    }

    //删除一个中医流派（真正的数据库中删除）
    @RequestMapping(value = "/delTraSch/{itemID}/{itemCode}" , method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseData deleteTraditionalSchool(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        CulturalResourcesDOKey culturalResourcesDOKey = new CulturalResourcesDOKey();
        culturalResourcesDOKey.setItemid(itemID);
        culturalResourcesDOKey.setItemcode(itemCode);
        iTraditionalSchoolService.removeTraditionalSchool(culturalResourcesDOKey);
        return new ResponseData(EmBusinessError.success);
    }

    //去修改的页面
    @RequestMapping(value = "/toUpdTraSch/{itemID}/{itemCode}" , method = RequestMethod.GET)
    @ResponseBody
    public ResponseData toUpdatePage(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        CulturalResourcesDOKey culturalResourcesDOKey = new CulturalResourcesDOKey();
        culturalResourcesDOKey.setItemid(itemID);
        culturalResourcesDOKey.setItemcode(itemCode);
        CulturalResourcesDO culturalResources = iTraditionalSchoolService.getTraditionalSchool(culturalResourcesDOKey);
        return new ResponseData(EmBusinessError.success,culturalResources);
    }

    //修改一个中医流派
    @RequestMapping(value = "/updTraSch" , method = RequestMethod.POST)
    @ResponseBody
    public ResponseData updateTraditionalSchool(@RequestBody CulturalResourcesDO culturalResourcesDO)  {
        iTraditionalSchoolService.updateTraditionalSchool(culturalResourcesDO);
        return new ResponseData(EmBusinessError.success);
    }

    //修改一个中医流派状态 （逻辑删除，但是是将状态改成下架状态,也可以是处长页面 通过->上架， 未通过->下架）
    @RequestMapping(value = "/cgTraSchSta/{itemID}/{itemCode}" , method = RequestMethod.POST)
    @ResponseBody
    public ResponseData changeStatus(@RequestParam("chineseCulturalStatus") String chineseCulturalStatus , @PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        CulturalResourcesDOKey culturalResourcesDOKey = new CulturalResourcesDOKey();
        culturalResourcesDOKey.setItemid(itemID);
        culturalResourcesDOKey.setItemcode(itemCode);
        iTraditionalSchoolService.changeTraditionalSchoolStatus(culturalResourcesDOKey,chineseCulturalStatus);
        return new ResponseData(EmBusinessError.success);
    }
}
