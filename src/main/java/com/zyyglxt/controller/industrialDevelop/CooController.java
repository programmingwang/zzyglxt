package com.zyyglxt.controller.industrialDevelop;

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

    @RequestMapping(value = "/coorecord", method = RequestMethod.GET)
    @ResponseBody
    public ResponseData getCooRecord(){
        return new ResponseData(EmBusinessError.success,developCooService.getCooRecord());
    }


}
