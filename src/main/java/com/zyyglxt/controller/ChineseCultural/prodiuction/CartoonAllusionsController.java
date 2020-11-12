package com.zyyglxt.controller.ChineseCultural.prodiuction;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;
import com.zyyglxt.dto.ChineseCulturalDto;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.ICartoonAllusionsService;
import com.zyyglxt.service.IFileService;
import com.zyyglxt.util.ConvertDOToDTOUtil;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
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

    @Resource
    private IFileService iFileService;

    //获取所有的漫画典故
    @RequestMapping(value = "/getAll" , method = RequestMethod.GET)
    @ResponseBody
    @LogAnnotation(logTitle = "查询所有的漫画典故", logLevel = "1")
    public ResponseData getAllCartoonAllusions(){
        List<ChineseCulturalDO> cartoonAllusionsList = iCartoonAllusionsService.getCartoonAllusionsList();
        List<ChineseCulturalDto> chineseCulturalDtoList = new ArrayList<>();
        for (ChineseCulturalDO chineseCulturalDO : cartoonAllusionsList) {
            chineseCulturalDtoList.add(
                    ConvertDOToDTOUtil.convertFromDOToDTO(
                            chineseCulturalDO,iFileService.selectFileByDataCode(
                                    chineseCulturalDO.getItemcode()).getFilePath()));
        }
        return new ResponseData(EmBusinessError.success,chineseCulturalDtoList);
    }



    //增加一个漫画典故
    @RequestMapping(value = "/addCarAll" , method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(logTitle = "增加一个漫画典故状态", logLevel = "3")
    public ResponseData addCartoonAllusions(@RequestBody ChineseCulturalDO chineseCulturalDO) {
        iCartoonAllusionsService.addCartoonAllusions(chineseCulturalDO);
        return new ResponseData(EmBusinessError.success);
    }

    //删除一个漫画典故（真正的数据库中删除）
    @RequestMapping(value = "/delCarAll/{itemID}/{itemCode}" , method = RequestMethod.DELETE)
    @ResponseBody
    @LogAnnotation(logTitle = "删除一个漫画典故状态", logLevel = "4")
    public ResponseData deleteCartoonAllusions(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        ChineseCulturalDOKey chineseCulturalDOKey = new ChineseCulturalDOKey();
        chineseCulturalDOKey.setItemid(itemID);
        chineseCulturalDOKey.setItemcode(itemCode);
        iCartoonAllusionsService.removeCartoonAllusions(chineseCulturalDOKey);
        return new ResponseData(EmBusinessError.success);
    }


    //修改一个漫画典故
    @RequestMapping(value = "/updCarAll" , method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(logTitle = "修改一个漫画典故", logLevel = "2")
    public ResponseData updateCartoonAllusions(@RequestBody ChineseCulturalDO chineseCulturalDO) {
        iCartoonAllusionsService.updateCartoonAllusions(chineseCulturalDO);
        return new ResponseData(EmBusinessError.success);
    }

    //修改一个漫画典故状态 （逻辑删除，但是是将状态改成下架状态,也可以是处长页面 通过->上架， 未通过->下架）
    @RequestMapping(value = "/cgCarAllSta/{itemID}/{itemCode}" , method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(logTitle = "修改一个漫画典故状态", logLevel = "2")
    public ResponseData changeStatus(@RequestParam("chineseCulturalStatus") String chineseCulturalStatus , @PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        ChineseCulturalDOKey chineseCulturalDOKey = new ChineseCulturalDOKey();
        chineseCulturalDOKey.setItemid(itemID);
        chineseCulturalDOKey.setItemcode(itemCode);
        iCartoonAllusionsService.changeCartoonAllusionsStatus(chineseCulturalDOKey,chineseCulturalStatus);
        return new ResponseData(EmBusinessError.success);
    }
}
