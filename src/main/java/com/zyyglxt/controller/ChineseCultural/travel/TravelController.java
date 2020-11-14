package com.zyyglxt.controller.ChineseCultural.travel;


import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;
import com.zyyglxt.dto.ChineseCulturalDto;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IFileService;
import com.zyyglxt.service.ITravelService;
import com.zyyglxt.util.ConvertDOToDTOUtil;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/10/30 12:20
 * Version: 1.0
 * 健康旅游控制器
 */
//@Controller
@RestController
@RequestMapping("/cul/trav/trav")
@SuppressWarnings("unchecked")
public class TravelController {

    @Resource
    private ITravelService iTravelService;

    @Resource
    private IFileService iFileService;

    //获取所有的健康旅游
    @RequestMapping(value = "/getAll" , method = RequestMethod.GET)
    @ResponseBody
    @LogAnnotation(logTitle = "查询所有健康旅游", logLevel = "1")
    public ResponseData getAllTravel(@RequestParam(value = "chineseCulturalStatus")List chineseCulturalStatus){

        List<ChineseCulturalDO> cartoonAllusionsList = iTravelService.getTravelList(chineseCulturalStatus);
        List<ChineseCulturalDto> chineseCulturalDtoList = new ArrayList<>();
        for (ChineseCulturalDO chineseCulturalDO : cartoonAllusionsList) {
            chineseCulturalDtoList.add(
                    ConvertDOToDTOUtil.convertFromDOToDTO(
                            chineseCulturalDO,iFileService.selectFileByDataCode(
                                    chineseCulturalDO.getItemcode()).getFilePath()));
        }
        return new ResponseData(EmBusinessError.success,chineseCulturalDtoList);

    }

    //查询一个健康旅游



    //增加一个健康旅游
    @RequestMapping(value = "/addTrav" , method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(logTitle = "增加一个健康旅游", logLevel = "3")
//    public ResponseData addTravel(@RequestBody ChineseCulturalDO chineseCulturalDO , @RequestBody(required = false) FileDO fileDO) throws BusinessException {
    public ResponseData addTravel(@RequestBody ChineseCulturalDO chineseCulturalDO) {
        iTravelService.addTravel(chineseCulturalDO);
        return new ResponseData(EmBusinessError.success);
    }

    //删除一个健康旅游（真正的数据库中删除）
    @RequestMapping(value = "/delTrav/{itemID}/{itemCode}" , method = RequestMethod.DELETE)
    @ResponseBody
    @LogAnnotation(logTitle = "删除一个健康旅游", logLevel = "4")
    public ResponseData deleteTravel(@PathVariable("itemID") Integer itemID,@PathVariable("itemCode")String itemCode){
        ChineseCulturalDOKey chineseCulturalDOKey = new ChineseCulturalDOKey();
        chineseCulturalDOKey.setItemid(itemID);
        chineseCulturalDOKey.setItemcode(itemCode);
        iTravelService.removeTravel(chineseCulturalDOKey);
        return new ResponseData(EmBusinessError.success);
    }



    //修改一个健康旅游
    @RequestMapping(value = "/updTrav" , method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(logTitle = "修改一个健康旅游", logLevel = "2")
    public ResponseData updateTravel(@RequestBody ChineseCulturalDO chineseCulturalDO) {
        iTravelService.updateTravel(chineseCulturalDO);
        return new ResponseData(EmBusinessError.success);
    }

    //修改一个健康旅游状态 （逻辑删除，但是是将状态改成下架状态,也可以是处长页面 通过->上架， 未通过->下架）
    //@RequestParam只能接收到form-data和x-www-form-urlencoded类型的数据
    @RequestMapping(value = "/cgTravSta/{itemID}/{itemCode}" , method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(logTitle = "修改一个健康旅游状态", logLevel = "2")
    public ResponseData changeStatus(@RequestParam("chineseCulturalStatus") String chineseCulturalStatus , @PathVariable("itemID") Integer itemID , @PathVariable("itemCode")String itemCode){
        ChineseCulturalDOKey chineseCulturalDOKey = new ChineseCulturalDOKey();
        chineseCulturalDOKey.setItemid(itemID);
        chineseCulturalDOKey.setItemcode(itemCode);
        iTravelService.changeTravelStatus(chineseCulturalDOKey,chineseCulturalStatus);
        return new ResponseData(EmBusinessError.success);
    }
}
