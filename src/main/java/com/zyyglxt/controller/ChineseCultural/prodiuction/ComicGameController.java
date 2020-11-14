package com.zyyglxt.controller.ChineseCultural.prodiuction;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;
import com.zyyglxt.dto.ChineseCulturalDto;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IComicGameService;
import com.zyyglxt.service.IFileService;
import com.zyyglxt.util.ConvertDOToDTOUtil;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
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

    @Resource
    private IFileService iFileService;

    //获取所有的动漫游戏
    @RequestMapping(value = "/getAll" , method = RequestMethod.GET)
    @ResponseBody
    @LogAnnotation(logTitle = "查询所有动漫游戏", logLevel = "1")
    public ResponseData getAllComicGame(String chineseCulturalStatus){
        List<ChineseCulturalDO> comicGameList = iComicGameService.getComicGameList(chineseCulturalStatus);
        List<ChineseCulturalDto> chineseCulturalDtoList = new ArrayList<>();
        for (ChineseCulturalDO chineseCulturalDO : comicGameList) {
            chineseCulturalDtoList.add(
                    ConvertDOToDTOUtil.convertFromDOToDTO(
                            chineseCulturalDO,iFileService.selectFileByDataCode(
                                    chineseCulturalDO.getItemcode()).getFilePath()));
        }
        return new ResponseData(EmBusinessError.success,chineseCulturalDtoList);
    }


    //增加一个漫画典故
    @RequestMapping(value = "/addComGam" , method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(logTitle = "增加一个动漫游戏状态", logLevel = "3")
    public ResponseData addComicGame(@RequestBody ChineseCulturalDO chineseCulturalDO){
        iComicGameService.addComicGame(chineseCulturalDO);
        return new ResponseData(EmBusinessError.success);
    }

    //删除一个动漫游戏（真正的数据库中删除）
    @RequestMapping(value = "/delComGam/{itemID}/{itemCode}" , method = RequestMethod.DELETE)
    @ResponseBody
    @LogAnnotation(logTitle = "删除一个动漫游戏", logLevel = "4")
    public ResponseData deleteTraditionalCultural(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        ChineseCulturalDOKey chineseCulturalDOKey = new ChineseCulturalDOKey();
        chineseCulturalDOKey.setItemid(itemID);
        chineseCulturalDOKey.setItemcode(itemCode);
        iComicGameService.removeComicGame(chineseCulturalDOKey);
        return new ResponseData(EmBusinessError.success);
    }


    //修改一个动漫游戏
    @RequestMapping(value = "/updComGam" , method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(logTitle = "修改一个动漫游戏", logLevel = "2")
    public ResponseData updateComicGame(@RequestBody ChineseCulturalDO chineseCulturalDO){
        iComicGameService.updateComicGame(chineseCulturalDO);
        return new ResponseData(EmBusinessError.success);
    }

    //修改一个动漫游戏状态 （逻辑删除，但是是将状态改成下架状态,也可以是处长页面 通过->上架， 未通过->下架）
    @RequestMapping(value = "/cgComGamSta/{itemID}/{itemCode}" , method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(logTitle = "修改一个动漫游戏状态", logLevel = "2")
    public ResponseData changeStatus(@RequestParam("chineseCulturalStatus") String chineseCulturalStatus , @PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        ChineseCulturalDOKey chineseCulturalDOKey = new ChineseCulturalDOKey();
        chineseCulturalDOKey.setItemid(itemID);
        chineseCulturalDOKey.setItemcode(itemCode);
        iComicGameService.changeComicGameStatus(chineseCulturalDOKey,chineseCulturalStatus);
        return new ResponseData(EmBusinessError.success);
    }
}
