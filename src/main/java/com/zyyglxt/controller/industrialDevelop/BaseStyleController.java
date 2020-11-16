package com.zyyglxt.controller.IndustrialDevelop;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.IndustrialDevelopBasestyle;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IndustrialDevelopBasestyleService;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @Author lrt
 * @Date 2020/11/6 20:54
 * @Version 1.0
 **/
@Api(tags = "产业发展-基地风采记录")
@RestController
@RequestMapping(value = "industrialdevelop")
public class BaseStyleController {

    @Resource
    IndustrialDevelopBasestyleService basestyleService;

    @ResponseBody
    @PostMapping(value = "/base-style")
    @LogAnnotation(appCode ="",logTitle ="添加产业发展-基地风采记录",logLevel ="3",creater ="",updater = "")
    public ResponseData addBaseStyle(@RequestBody IndustrialDevelopBasestyle record) {
        basestyleService.insertSelective(record);
        return new ResponseData(EmBusinessError.success);
    }

    @ResponseBody
    @DeleteMapping(value = "/base-style")
    @LogAnnotation(appCode ="",logTitle ="删除产业发展-基地风采记录",logLevel ="4",creater ="",updater = "")
    public ResponseData delBaseStyle(@RequestBody IndustrialDevelopBasestyle record) {
        basestyleService.deleteByPrimaryKey(record.getItemid(), record.getItemcode());
        return new ResponseData(EmBusinessError.success);
    }

    @ResponseBody
    @PutMapping(value = "/base-style")
    @LogAnnotation(appCode ="",logTitle ="更新产业发展-基地风采记录",logLevel ="2",creater ="",updater = "")
    public ResponseData updBaseStyle(@RequestBody IndustrialDevelopBasestyle record) {
        basestyleService.updateByPrimaryKeySelective(record);
        return new ResponseData(EmBusinessError.success);
    }

    @GetMapping(value = "/base-style")
    public ResponseData getBaseStyle(){
        return new ResponseData(EmBusinessError.success,basestyleService.selectAll());
    }
}
