package com.zyyglxt.controller.ChineseCultural.facility;

import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;
import com.zyyglxt.service.ICulturalRelicsService;
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
    public String getAllTraditionalCultural(Model model){
        List<ChineseCulturalDO> culturalRelicsList = iCulturalRelicsService.getCulturalRelicsList();
        model.addAttribute("culturalRelicsList",culturalRelicsList);
        return "获得了所有文化古迹信息";
    }

    //查询一个文化古迹

    //去增加页面,这个是为了跳转到增加的页面
    @RequestMapping(value = "/toAddPage" , method = RequestMethod.GET)
    public String toAddPage(){
        return "to add page";
    }

    //增加一个文化古迹
    @RequestMapping(value = "/addCulRel" , method = RequestMethod.POST)
    public String addTraditionalCultural(ChineseCulturalDO chineseCulturalDO){
        chineseCulturalDO.setChineseCulturalType("文化古迹");
        chineseCulturalDO.setChineseCulturalStatus("待上架");
        iCulturalRelicsService.addCulturalRelics(chineseCulturalDO);
        return "to main page";
    }

    //删除一个文化古迹（真正的数据库中删除）
    @RequestMapping(value = "/delCulRel/{itemID}/{itemCode}" , method = RequestMethod.DELETE)
    public String deleteTraditionalCultural(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        ChineseCulturalDOKey chineseCulturalDOKey = new ChineseCulturalDOKey();
        chineseCulturalDOKey.setItemid(itemID);
        chineseCulturalDOKey.setItemcode(itemCode);
        iCulturalRelicsService.removeCulturalRelics(chineseCulturalDOKey);
        return "back to main page";
    }

    //去修改的页面
    @RequestMapping(value = "/toUpdCulRel/{itemID}/{itemCode}" , method = RequestMethod.GET)
    public String toUpdatePage(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode,Model model){
        ChineseCulturalDOKey chineseCulturalDOKey = new ChineseCulturalDOKey();
        chineseCulturalDOKey.setItemid(itemID);
        chineseCulturalDOKey.setItemcode(itemCode);
        ChineseCulturalDO chineseCultural = iCulturalRelicsService.getCulturalRelics(chineseCulturalDOKey);
        //在update的页面就可以拿到对应的数据了
        model.addAttribute("chineseCultural",chineseCultural);
        return "to update Page";
    }

    //修改一个文化古迹
    @RequestMapping(value = "/updCulRel" , method = RequestMethod.POST)
    public String updateTraditionalCultural(ChineseCulturalDO chineseCulturalDO){
        iCulturalRelicsService.updateCulturalRelics(chineseCulturalDO);
        return "back to main page";
    }

    //修改一个文化古迹状态 （逻辑删除，但是是将状态改成下架状态,也可以是处长页面 通过->上架， 未通过->下架）
    @RequestMapping(value = "/cgCulRelSta/{itemID}/{itemCode}" , method = RequestMethod.POST)
    public String changeStatus(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode, String status){
        ChineseCulturalDOKey chineseCulturalDOKey = new ChineseCulturalDOKey();
        chineseCulturalDOKey.setItemid(itemID);
        chineseCulturalDOKey.setItemcode(itemCode);
        iCulturalRelicsService.changeCulturalRelics(chineseCulturalDOKey,status);
        return "back to main page";
    }
}
