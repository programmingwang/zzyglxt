package com.zyyglxt.controller.ChineseCultural.resource;

import com.zyyglxt.dataobject.CulturalResourcesDO;
import com.zyyglxt.dataobject.CulturalResourcesDOKey;
import com.zyyglxt.dto.CulturalResourcesDto;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IFileService;
import com.zyyglxt.service.ITraditionalCulturalService;
import com.zyyglxt.util.ConvertDOToDTOUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/10/30 9:19
 * Version: 1.0
 * 中医医史控制器
 */
//@Controller
@Controller
@RequestMapping("/cul/res/traCul")
public class TraditionalCulturalController {

    @Resource
    private ITraditionalCulturalService traditionalCulturalService;

    //获取所有的中医医史
    @RequestMapping(value = "/getAll" , method = RequestMethod.GET)
    @ResponseBody
    public ResponseData getAllTraditionalCultural(){
        List<CulturalResourcesDO> traditionalCulturalList = traditionalCulturalService.getTraditionalCulturalList();
        return new ResponseData(EmBusinessError.success,traditionalCulturalList);
    }



    //增加一个中医医史
    @RequestMapping(value = "/addTraCul" , method = RequestMethod.POST)
    @ResponseBody
    public ResponseData addTraditionalCultural(@RequestBody CulturalResourcesDO culturalResourcesDO)  {
        traditionalCulturalService.addTraditionalCultural(culturalResourcesDO);
        return new ResponseData(EmBusinessError.success);
    }

    //删除一个中医医史（真正的数据库中删除）
    @RequestMapping(value = "/delTraCul/{itemID}/{itemCode}" , method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseData deleteTraditionalCultural(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        CulturalResourcesDOKey culturalResourcesDOKey = new CulturalResourcesDOKey();
        culturalResourcesDOKey.setItemid(itemID);
        culturalResourcesDOKey.setItemcode(itemCode);
        traditionalCulturalService.removeTraditionalCultural(culturalResourcesDOKey);
        return new ResponseData(EmBusinessError.success);
    }


    //修改一个中医医史
    @RequestMapping(value = "/updTraCul" , method = RequestMethod.POST)
    @ResponseBody
    public ResponseData updateTraditionalCultural(@RequestBody CulturalResourcesDO culturalResourcesDO) {
        traditionalCulturalService.updateTraditionalCultural(culturalResourcesDO);
        return new ResponseData(EmBusinessError.success);
    }

    //修改一个中医医史状态 （逻辑删除，但是是将状态改成下架状态,也可以是处长页面 通过->上架， 未通过->下架）
    @RequestMapping(value = "/cgTraCulSta/{itemID}/{itemCode}" , method = RequestMethod.POST)
    @ResponseBody
    public ResponseData changeStatus(@RequestParam("chineseCulturalStatus") String chineseCulturalStatus , @PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        CulturalResourcesDOKey culturalResourcesDOKey = new CulturalResourcesDOKey();
        culturalResourcesDOKey.setItemid(itemID);
        culturalResourcesDOKey.setItemcode(itemCode);
        traditionalCulturalService.changeTraditionalCulturalStatus(culturalResourcesDOKey,chineseCulturalStatus);
        return new ResponseData(EmBusinessError.success);
    }

}
