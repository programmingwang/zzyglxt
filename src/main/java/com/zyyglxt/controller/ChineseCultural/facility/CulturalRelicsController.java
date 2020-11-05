package com.zyyglxt.controller.ChineseCultural.facility;

import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.ICulturalRelicsService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
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
public class CulturalRelicsController {

    @Resource
    private ICulturalRelicsService iCulturalRelicsService;

    //获取所有的文化古迹
    @RequestMapping(value = "/getAll" , method = RequestMethod.GET)
    @ResponseBody
    public ResponseData getAllCulturalRelics(Model model){
        List<ChineseCulturalDO> culturalRelicsList = iCulturalRelicsService.getCulturalRelicsList();
        model.addAttribute("culturalRelicsList",culturalRelicsList);
        return new ResponseData(EmBusinessError.success,culturalRelicsList);
    }

//    //查询一个文化古迹
//
//    //去增加页面,这个是为了跳转到增加的页面
//    @RequestMapping(value = "/toAddPage" , method = RequestMethod.GET)
//    public String toAddPage(){
//        return "to add page";
//    }

    //增加一个文化古迹
    @RequestMapping(value = "/addCulRel" , method = RequestMethod.POST)
    @ResponseBody
    public ResponseData addCulturalRelics(@RequestBody ChineseCulturalDO chineseCulturalDO){
        iCulturalRelicsService.addCulturalRelics(chineseCulturalDO);
        return new ResponseData(EmBusinessError.success);
    }

    //删除一个文化古迹（真正的数据库中删除）
    @RequestMapping(value = "/delCulRel/{itemID}/{itemCode}" , method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseData deleteCulturalRelics(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        ChineseCulturalDOKey chineseCulturalDOKey = new ChineseCulturalDOKey();
        chineseCulturalDOKey.setItemid(itemID);
        chineseCulturalDOKey.setItemcode(itemCode);
        iCulturalRelicsService.removeCulturalRelics(chineseCulturalDOKey);
        return new ResponseData(EmBusinessError.success);
    }

    //去修改的页面
    @RequestMapping(value = "/toUpdCulRel/{itemID}/{itemCode}" , method = RequestMethod.GET)
    @ResponseBody
    public ResponseData toUpdatePage(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        ChineseCulturalDOKey chineseCulturalDOKey = new ChineseCulturalDOKey();
        chineseCulturalDOKey.setItemid(itemID);
        chineseCulturalDOKey.setItemcode(itemCode);
        ChineseCulturalDO chineseCultural = iCulturalRelicsService.getCulturalRelics(chineseCulturalDOKey);
        return new ResponseData(EmBusinessError.success,chineseCultural);
    }

    //修改一个文化古迹
    @RequestMapping(value = "/updCulRel" , method = RequestMethod.POST)
    @ResponseBody
    public ResponseData updateCulturalRelics(@RequestBody ChineseCulturalDO chineseCulturalDO){
        iCulturalRelicsService.updateCulturalRelics(chineseCulturalDO);
        return new ResponseData(EmBusinessError.success);
    }

    //修改一个文化古迹状态 （逻辑删除，但是是将状态改成下架状态,也可以是处长页面 通过->上架， 未通过->下架）
    @RequestMapping(value = "/cgCulRelSta/{itemID}/{itemCode}" , method = RequestMethod.POST)
    @ResponseBody
    public ResponseData changeStatus(@RequestParam("chineseCulturalStatus") String chineseCulturalStatus , @PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        ChineseCulturalDOKey chineseCulturalDOKey = new ChineseCulturalDOKey();
        chineseCulturalDOKey.setItemid(itemID);
        chineseCulturalDOKey.setItemcode(itemCode);
        iCulturalRelicsService.changeCulturalRelics(chineseCulturalDOKey,chineseCulturalStatus);
        return new ResponseData(EmBusinessError.success);
    }
}
