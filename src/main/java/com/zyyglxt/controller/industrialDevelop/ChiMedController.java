package com.zyyglxt.controller.industrialDevelop;

import com.zyyglxt.dataobject.IndustrialDevelopChiMed;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IndustrialDevelopChiMedService;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @Author lrt
 * @Date 2020/11/6 21:01
 * @Version 1.0
 **/
@Api(tags = "产业发展-中药材加工企业、中药材销售企业、中药材制药企业信息、种植园记录")
@RestController
@RequestMapping(value = "industrialdevelop")
public class ChiMedController {

    @Resource
    IndustrialDevelopChiMedService chiMedService;

    @GetMapping(value = "chi-med/{type}")
    public ResponseData getChiMed(@PathVariable String type){
        return new ResponseData(EmBusinessError.success,chiMedService.selectAll(type));
    }

    @ResponseBody
    @PostMapping(value = "/chi-med")
    public ResponseData addChiMed(@RequestBody IndustrialDevelopChiMed record){
        chiMedService.insertSelective(record);
        return new ResponseData(EmBusinessError.success);
    }

    @ResponseBody
    @RequestMapping(value = "/chi-med", method = RequestMethod.PUT)
    public ResponseData updChiMed(@RequestBody IndustrialDevelopChiMed record){
        chiMedService.updateByPrimaryKeySelective(record);
        return new ResponseData(EmBusinessError.success);
    }

    @ResponseBody
    @RequestMapping(value = "/chi-med", method = RequestMethod.DELETE)
    public ResponseData delChiMed(@RequestBody IndustrialDevelopChiMed record){
        chiMedService.deleteByPrimaryKey(record.getItemid(),record.getItemcode());
        return new ResponseData(EmBusinessError.success);
    }
}
