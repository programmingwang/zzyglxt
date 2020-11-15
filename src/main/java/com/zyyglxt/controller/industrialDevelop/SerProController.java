package com.zyyglxt.controller.industrialDevelop;

import com.zyyglxt.dataobject.IndustrialDevelopSerPro;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IndustrialDevelopSerProService;
import io.swagger.annotations.Api;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @Author lrt
 * @Date 2020/11/6 21:15
 * @Version 1.0
 **/
@Api(tags = "产业发展-服务项目")
@RestController
@RequestMapping(value = "industrialdevelop")
public class SerProController {
    @Resource
    IndustrialDevelopSerProService serProService;

    @ResponseBody
    @RequestMapping(value = "/ser-pro",method = RequestMethod.POST)
    public ResponseData addSerPro(@RequestBody IndustrialDevelopSerPro record){
        serProService.insertSelective(record);
        return new ResponseData(EmBusinessError.success);
    }

    @ResponseBody
    @RequestMapping(value = "/ser-pro",method = RequestMethod.PUT)
    public ResponseData updSerPro(@RequestBody IndustrialDevelopSerPro record){
        serProService.updateByPrimaryKeySelective(record);
        return new ResponseData(EmBusinessError.success);
    }

    @ResponseBody
    @RequestMapping(value = "/ser-pro",method = RequestMethod.DELETE)
    public ResponseData delSerPro(@RequestBody IndustrialDevelopSerPro record){
        serProService.deleteByPrimaryKey(record.getItemid(),record.getItemcode());
        return new ResponseData(EmBusinessError.success);
    }

    @ResponseBody
    @GetMapping(value = "/ser-pro")
    public ResponseData getSerPro(){
        return new ResponseData(EmBusinessError.success,serProService.selectByorgcode());
    }

    /*@ResponseBody
    @GetMapping(value = "/cg-ser-pro-sts")
    public ResponseData changeStatus(@RequestBody IndustrialDevelopSerPro record){
        return new ResponseData(EmBusinessError.success,serProService.changeStatus(record.getItemcode(), record.getStatus()));
    }*/
}
