package com.zyyglxt.controller.industrialDevelop;

import com.zyyglxt.dataobject.IndustrialDevelopSaleDrug;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IndustrialDevelopSaleDrugService;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @Author lrt
 * @Date 2020/11/6 21:10
 * @Version 1.0
 **/
@Api(tags = "产业发展-销售企业、制药企业在售药品")
@RestController
@RequestMapping(value = "industrialdevelop")
public class SaleDrugController {

    @Resource
    IndustrialDevelopSaleDrugService saleDrugService;

    @ResponseBody
    @RequestMapping(value = "sale-drug", method = RequestMethod.POST)
    public ResponseData addSaleDrug(@RequestBody IndustrialDevelopSaleDrug record){
        saleDrugService.insertSelective(record);
        return new ResponseData(EmBusinessError.success);
    }

    @ResponseBody
    @RequestMapping(value = "sale-drug", method = RequestMethod.PUT)
    public ResponseData updSaleDrug(@RequestBody IndustrialDevelopSaleDrug record){
        saleDrugService.updateByPrimaryKeySelective(record);
        return new ResponseData(EmBusinessError.success);
    }

    @ResponseBody
    @RequestMapping(value = "sale-drug", method = RequestMethod.DELETE)
    public ResponseData delSaleDrug(@RequestBody IndustrialDevelopSaleDrug record){
        saleDrugService.deleteByPrimaryKey(record.getItemid(),record.getItemcode());
        return new ResponseData(EmBusinessError.success);
    }
}
