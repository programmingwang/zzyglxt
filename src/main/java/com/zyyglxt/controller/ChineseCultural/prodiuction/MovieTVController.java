package com.zyyglxt.controller.ChineseCultural.prodiuction;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;
import com.zyyglxt.dto.ChineseCulturalDto;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IFileService;
import com.zyyglxt.service.IMovieTVService;
import com.zyyglxt.util.ConvertDOToDTOUtil;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/10/30 12:21
 * Version: 1.0
 * 电影电视控制器
 */
//@Controller
@RestController
@RequestMapping("/cul/pro/movTv")
public class MovieTVController {

    @Resource
    private IMovieTVService iMovieTVService;

    @Resource
    private IFileService iFileService;

    //获取所有的电影电视
    @RequestMapping(value = "/getAll" , method = RequestMethod.GET)
    @ResponseBody
    @LogAnnotation(logTitle = "获得所有电视电影", logLevel = "1")
    public ResponseData getAllMovieTV(@RequestParam(value = "chineseCulturalStatus")String chineseCulturalStatus){
        return new ResponseData(EmBusinessError.success,iMovieTVService.getMovieTVList(chineseCulturalStatus));
    }


    //增加一个电视电影
    @RequestMapping(value = "/addMovTv" , method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(logTitle = "增加一个电视电影", logLevel = "3")
    public ResponseData addMovieTV(@RequestBody ChineseCulturalDO chineseCulturalDO){
        iMovieTVService.addMovieTV(chineseCulturalDO);
        return new ResponseData(EmBusinessError.success);
    }

    //删除一个电影电视（真正的数据库中删除）
    @RequestMapping(value = "/delMovTv/{itemID}/{itemCode}" , method = RequestMethod.DELETE)
    @ResponseBody
    @LogAnnotation(logTitle = "删除一个电视电影", logLevel = "4")
    public ResponseData deleteMovieTV(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        ChineseCulturalDOKey chineseCulturalDOKey = new ChineseCulturalDOKey();
        chineseCulturalDOKey.setItemid(itemID);
        chineseCulturalDOKey.setItemcode(itemCode);
        iMovieTVService.removeMovieTV(chineseCulturalDOKey);
        return new ResponseData(EmBusinessError.success);
    }



    //修改一个电影电视
    @RequestMapping(value = "/updMovTv" , method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(logTitle = "修改一个电视电影", logLevel = "2")
    public ResponseData updateMovieTV(@RequestBody ChineseCulturalDO chineseCulturalDO){
        iMovieTVService.updateMovieTV(chineseCulturalDO);
        return new ResponseData(EmBusinessError.success);
    }

    //修改一个电影电视状态 （逻辑删除，但是是将状态改成下架状态,也可以是处长页面 通过->上架， 未通过->下架）
    @RequestMapping(value = "/cgMovTvSta/{itemID}/{itemCode}" , method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(logTitle = "修改一个电视电影状态", logLevel = "2")
    public ResponseData changeStatus(@RequestParam("chineseCulturalStatus") String chineseCulturalStatus ,@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        ChineseCulturalDOKey chineseCulturalDOKey = new ChineseCulturalDOKey();
        chineseCulturalDOKey.setItemid(itemID);
        chineseCulturalDOKey.setItemcode(itemCode);
        iMovieTVService.changeMovieStatus(chineseCulturalDOKey,chineseCulturalStatus);
        return new ResponseData(EmBusinessError.success);
    }
}
