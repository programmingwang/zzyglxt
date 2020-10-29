package com.zyyglxt.controller.IndustrialDevelop;

import com.zyyglxt.dataobject.IndustrialDevelopCooExcDO;
import com.zyyglxt.dataobject.IndustrialDevelopCooExcDOKey;
import com.zyyglxt.service.IIndustrialDevelopCoo;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @Author lrt
 * @Date 2020/10/29 12:00
 * @Version 1.0
 **/
@RestController
@RequestMapping(value = "industrialdevelop")
public class IndustrialCooController {

    @Resource
    IIndustrialDevelopCoo developCooService;

    @RequestMapping(value = "/coorecord", method = RequestMethod.POST)
    public void addCooRecord(@RequestBody IndustrialDevelopCooExcDO developCooExcDO) {
        developCooService.addCooRecord(developCooExcDO);
    }

    @RequestMapping(value = "/coorecord", method = RequestMethod.DELETE)
    public void delCooRecord(@RequestBody IndustrialDevelopCooExcDOKey key) {
        developCooService.delCooRecord(key);
    }

    @RequestMapping(value = "/coorecord", method = RequestMethod.PUT)
    public void updCooRecord(@RequestBody IndustrialDevelopCooExcDO developCooExcDO) {
        developCooService.updCooRecord(developCooExcDO);
    }
}
