package com.zyyglxt.controller.ChineseCultural.resource;

import com.zyyglxt.dataobject.CulturalResourcesDO;
import com.zyyglxt.dataobject.CulturalResourcesDOKey;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.service.ITraditionalDoctorService;
import org.springframework.beans.factory.annotation.Autowired;
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
 * Date: 2020/10/30 9:20
 * Version: 1.0
 * 历代名家控制器
 */
//@Controller
@RestController
@RequestMapping("/cul/res/traDoc")
public class TraditionalDoctorController {
    @Resource
    private ITraditionalDoctorService iTraditionalDoctorService;

    //获取所有的历代名家
    @RequestMapping(value = "/getAll" , method = RequestMethod.GET)
    public String getAllTraditionalCultural(Model model){
        List<CulturalResourcesDO> traditionalDoctorList = iTraditionalDoctorService.getTraditionalDoctorList();
        model.addAttribute("traditionalDoctorList",traditionalDoctorList);
        return "获得了所有历代名家信息";
    }

    //查询一个历代名家

    //去增加页面,这个是为了跳转到增加的页面
    @RequestMapping(value = "/toAddPage" , method = RequestMethod.GET)
    public String toAddPage(){
        return "to add page";
    }

    //增加一个中医医史
    @RequestMapping(value = "/addTraDoc" , method = RequestMethod.POST)
    public String addTraditionalCultural(CulturalResourcesDO culturalResourcesDO) throws BusinessException {
        culturalResourcesDO.setChineseCulturalType("历代名家");
        culturalResourcesDO.setChineseCulturalStatus("待上架");
        iTraditionalDoctorService.addTraditionalDoctor(culturalResourcesDO);
        return "to main page";
    }

    //删除一个历代名家（真正的数据库中删除）
    @RequestMapping(value = "/delTraDoc/{itemID}/{itemCode}" , method = RequestMethod.DELETE)
    public String deleteTraditionalCultural(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        CulturalResourcesDOKey culturalResourcesDOKey = new CulturalResourcesDOKey();
        culturalResourcesDOKey.setItemid(itemID);
        culturalResourcesDOKey.setItemcode(itemCode);
        iTraditionalDoctorService.removeTraditionalDoctor(culturalResourcesDOKey);
        return "back to main page";
    }

    //去修改的页面
    @RequestMapping(value = "/toUpdTraDoc/{itemID}/{itemCode}" , method = RequestMethod.GET)
    public String toUpdatePage(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode,Model model){
        CulturalResourcesDOKey culturalResourcesDOKey = new CulturalResourcesDOKey();
        culturalResourcesDOKey.setItemid(itemID);
        culturalResourcesDOKey.setItemcode(itemCode);
        CulturalResourcesDO culturalResources = iTraditionalDoctorService.getTraditionalDoctor(culturalResourcesDOKey);
        //在update的页面就可以拿到对应的数据了
        model.addAttribute("culturalResources",culturalResources);
        return "to update Page";
    }

    //修改一个历代名家
    @RequestMapping(value = "/updTraDoc" , method = RequestMethod.POST)
    public String updateTraditionalCultural(CulturalResourcesDO culturalResourcesDO) throws BusinessException {
        iTraditionalDoctorService.updateTraditionalDoctor(culturalResourcesDO);
        return "back to main page";
    }

    //修改一个历代名家状态 （逻辑删除，但是是将状态改成下架状态,也可以是处长页面 通过->上架， 未通过->下架）
    @RequestMapping(value = "/cgTraDocSta/{itemID}/{itemCode}" , method = RequestMethod.POST)
    public String changeStatus(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode, String status){
        CulturalResourcesDOKey culturalResourcesDOKey = new CulturalResourcesDOKey();
        culturalResourcesDOKey.setItemid(itemID);
        culturalResourcesDOKey.setItemcode(itemCode);
        iTraditionalDoctorService.changeTraditionalDoctorStatus(culturalResourcesDOKey,status);
        return "back to main page";
    }


}
