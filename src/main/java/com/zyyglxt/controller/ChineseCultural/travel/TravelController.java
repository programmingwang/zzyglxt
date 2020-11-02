package com.zyyglxt.controller.ChineseCultural.travel;

import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.ITravelService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
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
public class TravelController {

    @Resource
    private ITravelService iTravelService;

    //获取所有的健康旅游
    @RequestMapping(value = "/getAll" , method = RequestMethod.GET)
    public ResponseData getAllTraditionalCultural(Model model){
        List<ChineseCulturalDO> travelList = iTravelService.getTravelList();
        model.addAttribute("travelList",travelList);
        return new ResponseData(EmBusinessError.success,travelList);
    }

    //查询一个健康旅游

    //去增加页面,这个是为了跳转到增加的页面
//    @RequestMapping(value = "/toAddPage" , method = RequestMethod.GET)
//    public ResponseData toAddPage(){
//        return "to add page";
//    }

    //增加一个健康旅游
    @RequestMapping(value = "/addTrav" , method = RequestMethod.POST)
    public ResponseData addTraditionalCultural(ChineseCulturalDO chineseCulturalDO) throws BusinessException {
        chineseCulturalDO.setChineseCulturalType("健康旅游");
        chineseCulturalDO.setChineseCulturalStatus("待上架");
        iTravelService.addTravelSchool(chineseCulturalDO);
        return new ResponseData(EmBusinessError.success);
    }

    //删除一个健康旅游（真正的数据库中删除）
    @RequestMapping(value = "/delTrav/{itemID}/{itemCode}" , method = RequestMethod.DELETE)
    public ResponseData deleteTraditionalCultural(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        ChineseCulturalDOKey chineseCulturalDOKey = new ChineseCulturalDOKey();
        chineseCulturalDOKey.setItemid(itemID);
        chineseCulturalDOKey.setItemcode(itemCode);
        iTravelService.removeTravel(chineseCulturalDOKey);
        return new ResponseData(EmBusinessError.success);
    }

    //去修改的页面
    @RequestMapping(value = "/toUpdTrav/{itemID}/{itemCode}" , method = RequestMethod.GET)
    public ResponseData toUpdatePage(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode,Model model){
        ChineseCulturalDOKey chineseCulturalDOKey = new ChineseCulturalDOKey();
        chineseCulturalDOKey.setItemid(itemID);
        chineseCulturalDOKey.setItemcode(itemCode);
        ChineseCulturalDO chineseCultural = iTravelService.getTravel(chineseCulturalDOKey);
        //在update的页面就可以拿到对应的数据了
//        model.addAttribute("chineseCultural",chineseCultural);
        //点击修改按钮，先调用这个接口？获得对应的实体类，然后前端跳转页面
        return new ResponseData(EmBusinessError.success,chineseCultural);
    }

    //修改一个健康旅游
    @RequestMapping(value = "/updTrav" , method = RequestMethod.POST)
    public ResponseData updateTraditionalCultural(ChineseCulturalDO chineseCulturalDO) throws BusinessException {
        iTravelService.updateTravel(chineseCulturalDO);
        return new ResponseData(EmBusinessError.success);
    }

    //修改一个健康旅游状态 （逻辑删除，但是是将状态改成下架状态,也可以是处长页面 通过->上架， 未通过->下架）
    @RequestMapping(value = "/cgTravSta/{itemID}/{itemCode}" , method = RequestMethod.POST)
    public ResponseData changeStatus(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode, String status){
        ChineseCulturalDOKey chineseCulturalDOKey = new ChineseCulturalDOKey();
        chineseCulturalDOKey.setItemid(itemID);
        chineseCulturalDOKey.setItemcode(itemCode);
        iTravelService.changeTravelStatus(chineseCulturalDOKey,status);
        return new ResponseData(EmBusinessError.success);
    }
}
