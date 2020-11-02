package com.zyyglxt.controller.ChineseCultural.resource;

import com.zyyglxt.dataobject.CulturalResourcesDO;
import com.zyyglxt.dataobject.CulturalResourcesDOKey;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.service.ITraditionalSchoolService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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
    public String getAllTraditionalCultural(Model model){
        List<CulturalResourcesDO> traditionalSchoolList = iTraditionalSchoolService.getTraditionalSchoolList();
        model.addAttribute("traditionalSchoolList",traditionalSchoolList);
        return "获得了所有中医流派信息";
    }

    //查询一个中医流派

    //去增加页面,这个是为了跳转到增加的页面
    @RequestMapping(value = "/toAddPage" , method = RequestMethod.GET)
    public String toAddPage(){
        return "to add page";
    }

    //增加一个中医流派
    @RequestMapping(value = "/addTraSch" , method = RequestMethod.POST)
    public String addTraditionalCultural(CulturalResourcesDO culturalResourcesDO) throws BusinessException {
        culturalResourcesDO.setChineseCulturalType("中医流派");
        culturalResourcesDO.setChineseCulturalStatus("待上架");
        iTraditionalSchoolService.addTraditionalSchool(culturalResourcesDO);
        return "to main page";
    }

    //删除一个中医流派（真正的数据库中删除）
    @RequestMapping(value = "/delTraSch/{itemID}/{itemCode}" , method = RequestMethod.DELETE)
    public String deleteTraditionalCultural(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        CulturalResourcesDOKey culturalResourcesDOKey = new CulturalResourcesDOKey();
        culturalResourcesDOKey.setItemid(itemID);
        culturalResourcesDOKey.setItemcode(itemCode);
        iTraditionalSchoolService.removeTraditionalSchool(culturalResourcesDOKey);
        return "back to main page";
    }

    //去修改的页面
    @RequestMapping(value = "/toUpdTraSch/{itemID}/{itemCode}" , method = RequestMethod.GET)
    public String toUpdatePage(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode,Model model){
        CulturalResourcesDOKey culturalResourcesDOKey = new CulturalResourcesDOKey();
        culturalResourcesDOKey.setItemid(itemID);
        culturalResourcesDOKey.setItemcode(itemCode);
        CulturalResourcesDO culturalResources = iTraditionalSchoolService.getTraditionalSchool(culturalResourcesDOKey);
        //在update的页面就可以拿到对应的数据了
        model.addAttribute("culturalResources",culturalResources);
        return "to update Page";
    }

    //修改一个中医流派
    @RequestMapping(value = "/updTraSch" , method = RequestMethod.POST)
    public String updateTraditionalCultural(CulturalResourcesDO culturalResourcesDO) throws BusinessException {
        iTraditionalSchoolService.updateTraditionalSchool(culturalResourcesDO);
        return "back to main page";
    }

    //修改一个中医流派状态 （逻辑删除，但是是将状态改成下架状态,也可以是处长页面 通过->上架， 未通过->下架）
    @RequestMapping(value = "/cgTraSchSta/{itemID}/{itemCode}" , method = RequestMethod.POST)
    public String changeStatus(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode, String status){
        CulturalResourcesDOKey culturalResourcesDOKey = new CulturalResourcesDOKey();
        culturalResourcesDOKey.setItemid(itemID);
        culturalResourcesDOKey.setItemcode(itemCode);
        iTraditionalSchoolService.changeTraditionalSchoolStatus(culturalResourcesDOKey,status);
        return "back to main page";
    }
}
