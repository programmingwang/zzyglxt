package com.zyyglxt.controller.ChineseCultural.prodiuction;

import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.service.ICartoonAllusionsService;
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
 * 漫画典故控制器
 */
//@Controller
@RestController
@RequestMapping("/cul/pro/carAll")
public class CartoonAllusionsController {
    @Resource
    private ICartoonAllusionsService iCartoonAllusionsService;

    //获取所有的漫画典故
    @RequestMapping(value = "/getAll" , method = RequestMethod.GET)
    public String getAllTraditionalCultural(Model model){
        List<ChineseCulturalDO> cartoonAllusionsList = iCartoonAllusionsService.getCartoonAllusionsList();
        model.addAttribute("cartoonAllusionsList",cartoonAllusionsList);
        return "获得了所有漫画典故信息";
    }

    //查询一个漫画典故

    //去增加页面,这个是为了跳转到增加的页面
    @RequestMapping(value = "/toAddPage" , method = RequestMethod.GET)
    public String toAddPage(){
        return "to add page";
    }

    //增加一个漫画典故
    @RequestMapping(value = "/addCarAll" , method = RequestMethod.POST)
    public String addTraditionalCultural(ChineseCulturalDO chineseCulturalDO) throws BusinessException {
        chineseCulturalDO.setChineseCulturalType("漫画典故");
        chineseCulturalDO.setChineseCulturalStatus("待上架");
        iCartoonAllusionsService.addCartoonAllusions(chineseCulturalDO);
        return "to main page";
    }

    //删除一个漫画典故（真正的数据库中删除）
    @RequestMapping(value = "/delCarAll/{itemID}/{itemCode}" , method = RequestMethod.DELETE)
    public String deleteTraditionalCultural(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        ChineseCulturalDOKey chineseCulturalDOKey = new ChineseCulturalDOKey();
        chineseCulturalDOKey.setItemid(itemID);
        chineseCulturalDOKey.setItemcode(itemCode);
        iCartoonAllusionsService.removeCartoonAllusions(chineseCulturalDOKey);
        return "back to main page";
    }

    //去修改的页面
    @RequestMapping(value = "/toUpdCarAll/{itemID}/{itemCode}" , method = RequestMethod.GET)
    public String toUpdatePage(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode,Model model){
        ChineseCulturalDOKey chineseCulturalDOKey = new ChineseCulturalDOKey();
        chineseCulturalDOKey.setItemid(itemID);
        chineseCulturalDOKey.setItemcode(itemCode);
        ChineseCulturalDO chineseCultural = iCartoonAllusionsService.getCartoonAllusions(chineseCulturalDOKey);
        //在update的页面就可以拿到对应的数据了
        model.addAttribute("chineseCultural",chineseCultural);
        return "to update Page";
    }

    //修改一个漫画典故
    @RequestMapping(value = "/updCarAll" , method = RequestMethod.POST)
    public String updateTraditionalCultural(ChineseCulturalDO chineseCulturalDO) throws BusinessException {
        iCartoonAllusionsService.updateCartoonAllusions(chineseCulturalDO);
        return "back to main page";
    }

    //修改一个漫画典故状态 （逻辑删除，但是是将状态改成下架状态,也可以是处长页面 通过->上架， 未通过->下架）
    @RequestMapping(value = "/cgCarAllSta/{itemID}/{itemCode}" , method = RequestMethod.POST)
    public String changeStatus(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode, String status){
        ChineseCulturalDOKey chineseCulturalDOKey = new ChineseCulturalDOKey();
        chineseCulturalDOKey.setItemid(itemID);
        chineseCulturalDOKey.setItemcode(itemCode);
        iCartoonAllusionsService.changeCartoonAllusionsStatus(chineseCulturalDOKey,status);
        return "back to main page";
    }
}
