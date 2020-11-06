package com.zyyglxt.controller.ChineseCultural.facility;

import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.ICulturalVenuesService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/10/30 12:22
 * Version: 1.0
 * 文化场馆控制器
 */
//@Controller
@RestController
@RequestMapping("/cul/fac/culVen")
public class   CulturalVenuesController {

    @Resource
    private ICulturalVenuesService iCulturalVenuesService;

    //获取所有的文化场馆
    @RequestMapping(value = "/getAll" , method = RequestMethod.GET)
    @ResponseBody
    public ResponseData getAllCulturalVenues(){
        List<ChineseCulturalDO> culturalVenuesList = iCulturalVenuesService.getCulturalVenuesList();
        return new ResponseData(EmBusinessError.success,culturalVenuesList);
    }

//    //查询一个文化场馆
//
//    //去增加页面,这个是为了跳转到增加的页面
//    @RequestMapping(value = "/toAddPage" , method = RequestMethod.GET)
//    public String toAddPage(){
//        return "to add page";
//    }

    //增加一个文化古迹
    @RequestMapping(value = "/addCulVen" , method = RequestMethod.POST)
    @ResponseBody
    public ResponseData addCulturalVenues(@RequestBody ChineseCulturalDO chineseCulturalDO) throws BusinessException {
        chineseCulturalDO.setChineseCulturalType("文化场馆");
        chineseCulturalDO.setChineseCulturalStatus("待上架");
        iCulturalVenuesService.addCulturalVenues(chineseCulturalDO);
        return new ResponseData(EmBusinessError.success);
    }

    //删除一个文化场馆（真正的数据库中删除）
    @RequestMapping(value = "/delCulVen/{itemID}/{itemCode}" , method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseData deleteCulturalVenues(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        ChineseCulturalDOKey chineseCulturalDOKey = new ChineseCulturalDOKey();
        chineseCulturalDOKey.setItemid(itemID);
        chineseCulturalDOKey.setItemcode(itemCode);
        iCulturalVenuesService.removeCulturalVenues(chineseCulturalDOKey);
        return new ResponseData(EmBusinessError.success);
    }

    //去修改的页面
    @RequestMapping(value = "/toUpdCulVen/{itemID}/{itemCode}" , method = RequestMethod.GET)
    @ResponseBody
    public ResponseData toUpdatePage(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        ChineseCulturalDOKey chineseCulturalDOKey = new ChineseCulturalDOKey();
        chineseCulturalDOKey.setItemid(itemID);
        chineseCulturalDOKey.setItemcode(itemCode);
        ChineseCulturalDO chineseCultural = iCulturalVenuesService.getCulturalVenues(chineseCulturalDOKey);
        return new ResponseData(EmBusinessError.success,chineseCultural);
    }

    //修改一个文化场馆
    @RequestMapping(value = "/updCulVen" , method = RequestMethod.POST)
    @ResponseBody
    public ResponseData updateCulturalVenues(@RequestBody ChineseCulturalDO chineseCulturalDO) throws BusinessException {
        iCulturalVenuesService.updateCulturalVenues(chineseCulturalDO);
        return new ResponseData(EmBusinessError.success);
    }

    //修改一个文化场馆状态 （逻辑删除，但是是将状态改成下架状态,也可以是处长页面 通过->上架， 未通过->下架）
    @RequestMapping(value = "/cgCulVenSta/{itemID}/{itemCode}" , method = RequestMethod.POST)
    @ResponseBody
    public ResponseData changeStatus(@RequestParam("chineseCulturalStatus") String chineseCulturalStatus , @PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        ChineseCulturalDOKey chineseCulturalDOKey = new ChineseCulturalDOKey();
        chineseCulturalDOKey.setItemid(itemID);
        chineseCulturalDOKey.setItemcode(itemCode);
        iCulturalVenuesService.changeCulturalVenuesStatus(chineseCulturalDOKey,chineseCulturalStatus);
        return new ResponseData(EmBusinessError.success);
    }
}
