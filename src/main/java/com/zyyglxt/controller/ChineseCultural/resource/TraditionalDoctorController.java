package com.zyyglxt.controller.ChineseCultural.resource;

import com.zyyglxt.dataobject.CulturalResourcesDO;
import com.zyyglxt.dataobject.CulturalResourcesDOKey;
import com.zyyglxt.dto.CulturalResourcesDto;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IFileService;
import com.zyyglxt.service.ITraditionalDoctorService;
import com.zyyglxt.util.ConvertDOToDTOUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
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

    @Resource
    private IFileService iFileService;

    //获取所有的历代名家
    @RequestMapping(value = "/getAll" , method = RequestMethod.GET)
    @ResponseBody
    public ResponseData getAllTraditionalDoctor(){
        List<CulturalResourcesDO> traditionalDoctorList = iTraditionalDoctorService.getTraditionalDoctorList();
        List<CulturalResourcesDto> chineseCulturalDtoList = new ArrayList<>();
        for (CulturalResourcesDO culturalResourcesDO : traditionalDoctorList) {
            chineseCulturalDtoList.add(
                    ConvertDOToDTOUtil.convertFromDOToDTO(
                            culturalResourcesDO,iFileService.selectFileByDataCode(
                                    culturalResourcesDO.getItemcode()).getFilePath()));
        }
        return new ResponseData(EmBusinessError.success,chineseCulturalDtoList);
    }

    //查询一个历代名家

//    //去增加页面,这个是为了跳转到增加的页面
//    @RequestMapping(value = "/toAddPage" , method = RequestMethod.GET)
//    public String toAddPage(){
//        return "to add page";
//    }

    //增加一个中医医史
    @RequestMapping(value = "/addTraDoc" , method = RequestMethod.POST)
    @ResponseBody
    public ResponseData addTraditionalDoctor(@RequestBody CulturalResourcesDO culturalResourcesDO){
        iTraditionalDoctorService.addTraditionalDoctor(culturalResourcesDO);
        return new ResponseData(EmBusinessError.success);
    }

    //删除一个历代名家（真正的数据库中删除）
    @RequestMapping(value = "/delTraDoc/{itemID}/{itemCode}" , method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseData deleteTraditionalDoctor(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        CulturalResourcesDOKey culturalResourcesDOKey = new CulturalResourcesDOKey();
        culturalResourcesDOKey.setItemid(itemID);
        culturalResourcesDOKey.setItemcode(itemCode);
        iTraditionalDoctorService.removeTraditionalDoctor(culturalResourcesDOKey);
        return new ResponseData(EmBusinessError.success);
    }

    //去修改的页面
    @RequestMapping(value = "/toUpdTraDoc/{itemID}/{itemCode}" , method = RequestMethod.GET)
    @ResponseBody
    public ResponseData toUpdatePage(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        CulturalResourcesDOKey culturalResourcesDOKey = new CulturalResourcesDOKey();
        culturalResourcesDOKey.setItemid(itemID);
        culturalResourcesDOKey.setItemcode(itemCode);
        CulturalResourcesDO culturalResources = iTraditionalDoctorService.getTraditionalDoctor(culturalResourcesDOKey);
        return new ResponseData(EmBusinessError.success,culturalResources);
    }

    //修改一个历代名家
    @RequestMapping(value = "/updTraDoc" , method = RequestMethod.POST)
    @ResponseBody
    public ResponseData updateTraditionalDoctor(@RequestBody CulturalResourcesDO culturalResourcesDO) {
        iTraditionalDoctorService.updateTraditionalDoctor(culturalResourcesDO);
        return new ResponseData(EmBusinessError.success);
    }

    //修改一个历代名家状态 （逻辑删除，但是是将状态改成下架状态,也可以是处长页面 通过->上架， 未通过->下架）
    @RequestMapping(value = "/cgTraDocSta/{itemID}/{itemCode}" , method = RequestMethod.POST)
    @ResponseBody
    public ResponseData changeStatus(@RequestParam("chineseCulturalStatus") String chineseCulturalStatus , @PathVariable("itemID") Integer itemID , @PathVariable("itemCode")String itemCode){
        CulturalResourcesDOKey culturalResourcesDOKey = new CulturalResourcesDOKey();
        culturalResourcesDOKey.setItemid(itemID);
        culturalResourcesDOKey.setItemcode(itemCode);
        iTraditionalDoctorService.changeTraditionalDoctorStatus(culturalResourcesDOKey,chineseCulturalStatus);
        return new ResponseData(EmBusinessError.success);
    }


}
