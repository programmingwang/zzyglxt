package com.zyyglxt.controller.ChineseCultural.prodiuction;

import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IComicGameService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

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
    @ResponseBody
    public ResponseData getAllComicGame(){
        List<ChineseCulturalDO> comicGameList = iComicGameService.getComicGameList();
        return new ResponseData(EmBusinessError.success,comicGameList);
    }

//    //查询一个动漫游戏
//
//    //去增加页面,这个是为了跳转到增加的页面
//    @RequestMapping(value = "/toAddPage" , method = RequestMethod.GET)
//    public String toAddPage(){
//        return "to add page";
//    }

    //增加一个漫画典故
    @RequestMapping(value = "/addComGam" , method = RequestMethod.POST)
    @ResponseBody
    public ResponseData addComicGame(@RequestBody ChineseCulturalDO chineseCulturalDO){
        iComicGameService.addComicGame(chineseCulturalDO);
        return new ResponseData(EmBusinessError.success);
    }

    //删除一个动漫游戏（真正的数据库中删除）
    @RequestMapping(value = "/delComGam/{itemID}/{itemCode}" , method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseData deleteTraditionalCultural(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        ChineseCulturalDOKey chineseCulturalDOKey = new ChineseCulturalDOKey();
        chineseCulturalDOKey.setItemid(itemID);
        chineseCulturalDOKey.setItemcode(itemCode);
        iComicGameService.removeComicGame(chineseCulturalDOKey);
        return new ResponseData(EmBusinessError.success);
    }

    //去修改的页面
    @RequestMapping(value = "/toUpdComGam/{itemID}/{itemCode}" , method = RequestMethod.GET)
    @ResponseBody
    public ResponseData toUpdatePage(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        ChineseCulturalDOKey chineseCulturalDOKey = new ChineseCulturalDOKey();
        chineseCulturalDOKey.setItemid(itemID);
        chineseCulturalDOKey.setItemcode(itemCode);
        ChineseCulturalDO chineseCultural = iComicGameService.getComicGame(chineseCulturalDOKey);
        return new ResponseData(EmBusinessError.success,chineseCultural);
    }

    //修改一个动漫游戏
    @RequestMapping(value = "/updComGam" , method = RequestMethod.POST)
    @ResponseBody
    public ResponseData updateComicGame(@RequestBody ChineseCulturalDO chineseCulturalDO){
        iComicGameService.updateComicGame(chineseCulturalDO);
        return new ResponseData(EmBusinessError.success);
    }

    //修改一个动漫游戏状态 （逻辑删除，但是是将状态改成下架状态,也可以是处长页面 通过->上架， 未通过->下架）
    @RequestMapping(value = "/cgComGamSta/{itemID}/{itemCode}" , method = RequestMethod.POST)
    @ResponseBody
    public ResponseData changeStatus(@RequestParam("chineseCulturalStatus") String chineseCulturalStatus , @PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        ChineseCulturalDOKey chineseCulturalDOKey = new ChineseCulturalDOKey();
        chineseCulturalDOKey.setItemid(itemID);
        chineseCulturalDOKey.setItemcode(itemCode);
        iComicGameService.changeComicGameStatus(chineseCulturalDOKey,chineseCulturalStatus);
        return new ResponseData(EmBusinessError.success);
    }
}
