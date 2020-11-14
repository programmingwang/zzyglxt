package com.zyyglxt.controller.industrialDevelop;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.FamPreDO;
import com.zyyglxt.dataobject.HealthSciKnowDOKey;
import com.zyyglxt.dataobject.IndustrialDevelopCooExcDO;
import com.zyyglxt.dataobject.IndustrialDevelopCooExcDOKey;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IIndustrialDevelopCooService;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * @Author lrt
 * @Date 2020/10/29 12:00
 * @Version 1.0
 **/
@Api(tags = "产业发展-合作交流")
@RestController
@RequestMapping(value = "industrialdevelop")
public class CooController {

    @Resource
    IIndustrialDevelopCooService developCooService;

    @RequestMapping(value = "/coorecord", method = RequestMethod.POST)
    @ResponseBody
    public ResponseData addCooRecord(@RequestBody IndustrialDevelopCooExcDO developCooExcDO) {
        developCooService.addCooRecord(developCooExcDO);
        return new ResponseData(EmBusinessError.success);
    }

    @RequestMapping(value = "/coorecord", method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseData delCooRecord(@RequestBody IndustrialDevelopCooExcDOKey key) {
        developCooService.delCooRecord(key);
        return new ResponseData(EmBusinessError.success);
    }

    @RequestMapping(value = "/coorecord", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseData updCooRecord(@RequestBody IndustrialDevelopCooExcDO developCooExcDO) {
        developCooService.updCooRecord(developCooExcDO);
        return new ResponseData(EmBusinessError.success);
    }
  /*  查询所有合作交流数据*/
    @RequestMapping(value = "/coorecord", method = RequestMethod.GET)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="查询所有合作交流数据",logLevel ="1",creater ="",updater = "")
    public ResponseData getCooRecord(@RequestParam(value = "status") List status){
        List<IndustrialDevelopCooExcDO> industrialDevelopCooExcDOList = developCooService.getCooRecord(status);
        return new ResponseData(EmBusinessError.success,industrialDevelopCooExcDOList);
    }

    /*合作交流数据状态*/
    @RequestMapping(value = "/changestatustocooexc/{itemID}/{itemCode}" , method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(logTitle = "修改合作交流数据状态", logLevel = "2")
    public ResponseData changeStatusToCooExc(@RequestParam("status") String status , @PathVariable("itemID") Integer itemID , @PathVariable("itemCode")String itemCode){
        IndustrialDevelopCooExcDOKey industrialDevelopCooExcDOKey=new IndustrialDevelopCooExcDOKey();
        industrialDevelopCooExcDOKey.setItemid(itemID);
        industrialDevelopCooExcDOKey.setItemcode(itemCode);
        developCooService.changeStatusToCooExc(industrialDevelopCooExcDOKey,status);
        return new ResponseData(EmBusinessError.success);
    }


}
