package com.zyyglxt.controller.industrialDevelop;

import com.zyyglxt.dataobject.IndustrialDevelopOffDO;
import com.zyyglxt.dataobject.IndustrialDevelopOffDOKey;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IIndustrialDevelopOffService;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @Author lrt
 * @Date 2020/10/29 12:00
 * @Version 1.0
 **/
@Api(tags = "产业发展-填报时间记录")
@RestController
@RequestMapping(value = "industrialdevelop")
public class OffController {
    @Resource
    IIndustrialDevelopOffService developOffService;

    @RequestMapping(value = "/Off", method = RequestMethod.POST)
    @ResponseBody
    public ResponseData addOff(@RequestBody IndustrialDevelopOffDO record) {
        developOffService.addOff(record);
        return new ResponseData(EmBusinessError.success);
    }

    @RequestMapping(value = "/Off", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseData updOff(@RequestBody IndustrialDevelopOffDO record) {
        developOffService.updOff(record);
        return new ResponseData(EmBusinessError.success);
    }

    @RequestMapping(value = "/Off", method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseData delOff(@RequestBody IndustrialDevelopOffDOKey key) {
        developOffService.delOff(key);
        return new ResponseData(EmBusinessError.success);
    }

    @GetMapping
    @ResponseBody
    public ResponseData getOff(){
        return new ResponseData(EmBusinessError.success,developOffService.getOff());
    }
}
