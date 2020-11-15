package com.zyyglxt.controller.IndustrialDevelop;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.IndustrialDevelopCooExcDO;
import com.zyyglxt.dataobject.IndustrialDevelopCooExcDOKey;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IIndustrialDevelopCooService;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

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
    @LogAnnotation(appCode ="",logTitle ="添加产业发展-合作交流",logLevel ="3",creater ="",updater = "")
    public ResponseData addCooRecord(@RequestBody IndustrialDevelopCooExcDO developCooExcDO) {
        developCooService.addCooRecord(developCooExcDO);
        return new ResponseData(EmBusinessError.success);
    }

    @RequestMapping(value = "/coorecord", method = RequestMethod.DELETE)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="删除产业发展-合作交流",logLevel ="4",creater ="",updater = "")
    public ResponseData delCooRecord(@RequestBody IndustrialDevelopCooExcDOKey key) {
        developCooService.delCooRecord(key);
        return new ResponseData(EmBusinessError.success);
    }

    @RequestMapping(value = "/coorecord", method = RequestMethod.PUT)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="更新产业发展-合作交流",logLevel ="2",creater ="",updater = "")
    public ResponseData updCooRecord(@RequestBody IndustrialDevelopCooExcDO developCooExcDO) {
        developCooService.updCooRecord(developCooExcDO);
        return new ResponseData(EmBusinessError.success);
    }

    @RequestMapping(value = "/coorecord", method = RequestMethod.GET)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="查看产业发展-合作交流",logLevel ="1",creater ="",updater = "")
    public ResponseData getCooRecord(){
        return new ResponseData(EmBusinessError.success,developCooService.getCooRecord());
    }


}
