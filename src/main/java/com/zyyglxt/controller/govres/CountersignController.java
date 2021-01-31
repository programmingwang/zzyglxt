package com.zyyglxt.controller.govres;

import com.zyyglxt.dataobject.CountersignDO;
import com.zyyglxt.dataobject.adviceDO;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.ICountersignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Author:wangzh
 * Date: 2020/12/19 22:38
 * Version: 1.0
 * 内部会签
 */
@RestController
@RequestMapping("/Countersign")
public class CountersignController {
    @Autowired
    ICountersignService countersignService;

    @RequestMapping(value = "/getByDataCode", method = RequestMethod.GET)
    @ResponseBody
    public ResponseData getByDataCode(@RequestParam String itemcode){
        CountersignDO countersignDO = countersignService.selectByItemcode(itemcode);
        return new ResponseData(EmBusinessError.success,countersignDO);
    }
}
