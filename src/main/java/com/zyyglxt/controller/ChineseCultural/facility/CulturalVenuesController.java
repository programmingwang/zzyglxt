package com.zyyglxt.controller.ChineseCultural.facility;

import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.service.ICulturalVenuesService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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
public class CulturalVenuesController {

    @Resource
    private ICulturalVenuesService iCulturalVenuesService;

    //获取所有的文化场馆
    @RequestMapping(value = "/getAll" , method = RequestMethod.GET)
    public String getAllTraditionalCultural(Model model){
        List<ChineseCulturalDO> culturalVenuesList = iCulturalVenuesService.getCulturalVenuesList();
        model.addAttribute("culturalVenuesList",culturalVenuesList);
        return "获得了所有文化场馆信息";
    }

    //查询一个文化场馆

    //去增加页面,这个是为了跳转到增加的页面
    @RequestMapping(value = "/toAddPage" , method = RequestMethod.GET)
    public String toAddPage(){
        return "to add page";
    }

    //增加一个文化古迹
    @RequestMapping(value = "/addCulVen" , method = RequestMethod.POST)
    public String addTraditionalCultural(ChineseCulturalDO chineseCulturalDO) throws BusinessException {
        chineseCulturalDO.setChineseCulturalType("文化场馆");
        chineseCulturalDO.setChineseCulturalStatus("待上架");
        iCulturalVenuesService.addCulturalVenues(chineseCulturalDO);
        return "to main page";
    }

    //删除一个文化场馆（真正的数据库中删除）
    @RequestMapping(value = "/delCulVen/{itemID}/{itemCode}" , method = RequestMethod.DELETE)
    public String deleteTraditionalCultural(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        ChineseCulturalDOKey chineseCulturalDOKey = new ChineseCulturalDOKey();
        chineseCulturalDOKey.setItemid(itemID);
        chineseCulturalDOKey.setItemcode(itemCode);
        iCulturalVenuesService.removeCulturalVenues(chineseCulturalDOKey);
        return "back to main page";
    }

    //去修改的页面
    @RequestMapping(value = "/toUpdCulVen/{itemID}/{itemCode}" , method = RequestMethod.GET)
    public String toUpdatePage(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode,Model model){
        ChineseCulturalDOKey chineseCulturalDOKey = new ChineseCulturalDOKey();
        chineseCulturalDOKey.setItemid(itemID);
        chineseCulturalDOKey.setItemcode(itemCode);
        ChineseCulturalDO chineseCultural = iCulturalVenuesService.getCulturalVenues(chineseCulturalDOKey);
        //在update的页面就可以拿到对应的数据了
        model.addAttribute("chineseCultural",chineseCultural);
        return "to update Page";
    }

    //修改一个文化场馆
    @RequestMapping(value = "/updCulVen" , method = RequestMethod.POST)
    public String updateTraditionalCultural(ChineseCulturalDO chineseCulturalDO) throws BusinessException {
        iCulturalVenuesService.updateCulturalVenues(chineseCulturalDO);
        return "back to main page";
    }

    //修改一个文化场馆状态 （逻辑删除，但是是将状态改成下架状态,也可以是处长页面 通过->上架， 未通过->下架）
    @RequestMapping(value = "/cgCulVenSta/{itemID}/{itemCode}" , method = RequestMethod.POST)
    public String changeStatus(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode, String status){
        ChineseCulturalDOKey chineseCulturalDOKey = new ChineseCulturalDOKey();
        chineseCulturalDOKey.setItemid(itemID);
        chineseCulturalDOKey.setItemcode(itemCode);
        iCulturalVenuesService.changeCulturalVenuesStatus(chineseCulturalDOKey,status);
        return "back to main page";
    }
}
