package com.zyyglxt.controller.ChineseCultural.prodiuction;

import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.service.IComicGameService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/10/30 12:21
 * Version: 1.0
 * 动漫游戏控制器
 */
//@Controller
@RestController
@RequestMapping("/cul/pro/comGam")
public class ComicGameController {

    @Resource
    private IComicGameService iComicGameService;

    //获取所有的动漫游戏
    @RequestMapping(value = "/getAll" , method = RequestMethod.GET)
    public String getAllTraditionalCultural(Model model){
        List<ChineseCulturalDO> comicGameList = iComicGameService.getComicGameList();
        model.addAttribute("comicGameList",comicGameList);
        return "获得了所有动漫游戏信息";
    }

    //查询一个动漫游戏

    //去增加页面,这个是为了跳转到增加的页面
    @RequestMapping(value = "/toAddPage" , method = RequestMethod.GET)
    public String toAddPage(){
        return "to add page";
    }

    //增加一个漫画典故
    @RequestMapping(value = "/addComGam" , method = RequestMethod.POST)
    public String addTraditionalCultural(ChineseCulturalDO chineseCulturalDO) throws BusinessException {
        chineseCulturalDO.setChineseCulturalType("动漫游戏");
        chineseCulturalDO.setChineseCulturalStatus("待上架");
        iComicGameService.addComicGame(chineseCulturalDO);
        return "to main page";
    }

    //删除一个动漫游戏（真正的数据库中删除）
    @RequestMapping(value = "/delComGam/{itemID}/{itemCode}" , method = RequestMethod.DELETE)
    public String deleteTraditionalCultural(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        ChineseCulturalDOKey chineseCulturalDOKey = new ChineseCulturalDOKey();
        chineseCulturalDOKey.setItemid(itemID);
        chineseCulturalDOKey.setItemcode(itemCode);
        iComicGameService.removeComicGame(chineseCulturalDOKey);
        return "back to main page";
    }

    //去修改的页面
    @RequestMapping(value = "/toUpdComGam/{itemID}/{itemCode}" , method = RequestMethod.GET)
    public String toUpdatePage(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode,Model model){
        ChineseCulturalDOKey chineseCulturalDOKey = new ChineseCulturalDOKey();
        chineseCulturalDOKey.setItemid(itemID);
        chineseCulturalDOKey.setItemcode(itemCode);
        ChineseCulturalDO chineseCultural = iComicGameService.getComicGame(chineseCulturalDOKey);
        //在update的页面就可以拿到对应的数据了
        model.addAttribute("chineseCultural",chineseCultural);
        return "to update Page";
    }

    //修改一个动漫游戏
    @RequestMapping(value = "/updComGam" , method = RequestMethod.POST)
    public String updateTraditionalCultural(ChineseCulturalDO chineseCulturalDO) throws BusinessException {
        iComicGameService.updateComicGame(chineseCulturalDO);
        return "back to main page";
    }

    //修改一个动漫游戏状态 （逻辑删除，但是是将状态改成下架状态,也可以是处长页面 通过->上架， 未通过->下架）
    @RequestMapping(value = "/cgComGamSta/{itemID}/{itemCode}" , method = RequestMethod.POST)
    public String changeStatus(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode, String status){
        ChineseCulturalDOKey chineseCulturalDOKey = new ChineseCulturalDOKey();
        chineseCulturalDOKey.setItemid(itemID);
        chineseCulturalDOKey.setItemcode(itemCode);
        iComicGameService.changeComicGameStatus(chineseCulturalDOKey,status);
        return "back to main page";
    }
}
