package com.zyyglxt.controller.IndustrialDevelop;

import com.zyyglxt.dataobject.IndustrialDevelopCooExcDO;
import com.zyyglxt.dataobject.IndustrialDevelopCooExcDOKey;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IIndustrialDevelopCooService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.*;

/**
 * @Author lrt
 * @Date 2020/10/29 12:00
 * @Version 1.0
 **/
@RestController
@RequestMapping(value = "industrialdevelop")
public class IndustrialCooController {

    @Resource
    IIndustrialDevelopCooService developCooService;

    @RequestMapping(value = "/coorecord", method = RequestMethod.POST)
    @ResponseBody
    public ResponseData addCooRecord(@RequestBody @Valid IndustrialDevelopCooExcDO developCooExcDO) {
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
        developCooService.getCooRecord();
        return new ResponseData(EmBusinessError.success);
    }

//    @GetMapping(value = "/coorecord")
//    public String cooView(ModelMap map) {
//
//        List<IndustrialDevelopCooExcDO> list = developCooService.getCooRecord(1, 10);
////        map.put("dataList", list);
////        map.put("page", page);
////        map.put("pagesize", pagesize);
//        return "industrial_develop/cooperation";
//    }

}
