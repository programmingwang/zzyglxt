package com.zyyglxt.controller.IndustrialDevelop;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.IndustrialDevelopSerPro;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IndustrialDevelopSerProService;
import io.swagger.annotations.Api;
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
    @LogAnnotation(appCode ="",logTitle ="添加产业发展-服务项目",logLevel ="3",creater ="",updater = "")
    public ResponseData addSerPro(@RequestBody IndustrialDevelopSerPro record){
        serProService.insertSelective(record);
        return new ResponseData(EmBusinessError.success);
    }

    @ResponseBody
    @RequestMapping(value = "/ser-pro",method = RequestMethod.PUT)
    @LogAnnotation(appCode ="",logTitle ="更新产业发展-服务项目",logLevel ="2",creater ="",updater = "")
    public ResponseData updSerPro(@RequestBody IndustrialDevelopSerPro record){
        serProService.updateByPrimaryKeySelective(record);
        return new ResponseData(EmBusinessError.success);
    }

    @ResponseBody
    @RequestMapping(value = "/ser-pro",method = RequestMethod.DELETE)
    @LogAnnotation(appCode ="",logTitle ="删除产业发展-服务项目",logLevel ="4",creater ="",updater = "")
    public ResponseData delSerPro(@RequestBody IndustrialDevelopSerPro record){
        serProService.deleteByPrimaryKey(record.getItemid(),record.getItemcode());
        return new ResponseData(EmBusinessError.success);
    }

    @ResponseBody
    @GetMapping(value = "/ser-pro")
    public ResponseData getSerPro(){
        return new ResponseData(EmBusinessError.success,serProService.selectAll());
    }
}
