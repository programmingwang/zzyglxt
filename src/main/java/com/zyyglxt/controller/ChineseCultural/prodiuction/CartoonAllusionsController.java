package com.zyyglxt.controller.ChineseCultural.prodiuction;

import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;
import com.zyyglxt.dataobject.FileDO;
import com.zyyglxt.dto.ChineseCulturalDto;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.ICartoonAllusionsService;
import com.zyyglxt.service.IFileService;
import org.springframework.beans.BeanUtils;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    private ChineseCulturalDto convertFromDOToDTO(ChineseCulturalDO chineseCulturalDO,String filePath){
        ChineseCulturalDto chineseCulturalDto = new ChineseCulturalDto();
        BeanUtils.copyProperties(chineseCulturalDO,chineseCulturalDto);
        chineseCulturalDto.setFilePath(filePath);
        return chineseCulturalDto;
    }

    //获取所有的漫画典故
    @RequestMapping(value = "/getAll" , method = RequestMethod.GET)
    @ResponseBody
    public ResponseData getAllCartoonAllusions(){
        List<ChineseCulturalDO> cartoonAllusionsList = iCartoonAllusionsService.getCartoonAllusionsList();
        List<ChineseCulturalDto> chineseCulturalDtoList = new ArrayList<>();
        for (ChineseCulturalDO chineseCulturalDO : cartoonAllusionsList) {
            chineseCulturalDtoList.add(
                    this.convertFromDOToDTO(
                            chineseCulturalDO,iFileService.selectFileByDataCode(
                                    chineseCulturalDO.getItemcode()).getFilePath()));
        }
        return new ResponseData(EmBusinessError.success,chineseCulturalDtoList);
    }

//    //查询一个漫画典故
//
//    //去增加页面,这个是为了跳转到增加的页面
//    @RequestMapping(value = "/toAddPage" , method = RequestMethod.GET)
//    public ResponseData toAddPage(){
//        return "to add page";
//    }

    //增加一个漫画典故
    @RequestMapping(value = "/addCarAll" , method = RequestMethod.POST)
    @ResponseBody
    public ResponseData addCartoonAllusions(@RequestBody ChineseCulturalDO chineseCulturalDO) {
        iCartoonAllusionsService.addCartoonAllusions(chineseCulturalDO);
        return new ResponseData(EmBusinessError.success);
    }

    //删除一个漫画典故（真正的数据库中删除）
    @RequestMapping(value = "/delCarAll/{itemID}/{itemCode}" , method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseData deleteCartoonAllusions(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        ChineseCulturalDOKey chineseCulturalDOKey = new ChineseCulturalDOKey();
        chineseCulturalDOKey.setItemid(itemID);
        chineseCulturalDOKey.setItemcode(itemCode);
        iCartoonAllusionsService.removeCartoonAllusions(chineseCulturalDOKey);
        return new ResponseData(EmBusinessError.success);
    }

    //去修改的页面
    @RequestMapping(value = "/toUpdCarAll/{itemID}/{itemCode}" , method = RequestMethod.GET)
    @ResponseBody
    public ResponseData toUpdatePage(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        ChineseCulturalDOKey chineseCulturalDOKey = new ChineseCulturalDOKey();
        chineseCulturalDOKey.setItemid(itemID);
        chineseCulturalDOKey.setItemcode(itemCode);
        ChineseCulturalDO chineseCultural = iCartoonAllusionsService.getCartoonAllusions(chineseCulturalDOKey);
        return new ResponseData(EmBusinessError.success,chineseCultural);
    }

    //修改一个漫画典故
    @RequestMapping(value = "/updCarAll" , method = RequestMethod.POST)
    @ResponseBody
    public ResponseData updateCartoonAllusions(@RequestBody ChineseCulturalDO chineseCulturalDO) {
        iCartoonAllusionsService.updateCartoonAllusions(chineseCulturalDO);
        return new ResponseData(EmBusinessError.success);
    }

    //修改一个漫画典故状态 （逻辑删除，但是是将状态改成下架状态,也可以是处长页面 通过->上架， 未通过->下架）
    @RequestMapping(value = "/cgCarAllSta/{itemID}/{itemCode}" , method = RequestMethod.POST)
    @ResponseBody
    public ResponseData changeStatus(@RequestParam("chineseCulturalStatus") String chineseCulturalStatus , @PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        ChineseCulturalDOKey chineseCulturalDOKey = new ChineseCulturalDOKey();
        chineseCulturalDOKey.setItemid(itemID);
        chineseCulturalDOKey.setItemcode(itemCode);
        iCartoonAllusionsService.changeCartoonAllusionsStatus(chineseCulturalDOKey,chineseCulturalStatus);
        return new ResponseData(EmBusinessError.success);
    }
}
