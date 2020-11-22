package com.zyyglxt.controller.industrialDevelop;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.HospDO;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.HospService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @Author nongcn
 * @Date 2020/11/22 18:33
 * @Version 1.0
 */
@RestController
@RequestMapping(value = "/industrialDevelop")
public class hospitalController {
    @Resource
    private HospService hospService;

    @PostMapping(value = "/hosp_add")
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="添加医院数据",logLevel ="3",creater ="",updater = "")
    public ResponseData addHosp(@RequestBody HospDO hospDO){
        hospService.addHosp(hospDO);
        return new ResponseData(EmBusinessError.success);
    }
}

