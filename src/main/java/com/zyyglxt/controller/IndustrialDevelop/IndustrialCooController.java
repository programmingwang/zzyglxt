package com.zyyglxt.controller.IndustrialDevelop;

import com.zyyglxt.dataobject.IndustrialDevelopCooExcDO;
import com.zyyglxt.dataobject.IndustrialDevelopCooExcDOKey;
import com.zyyglxt.service.IIndustrialDevelopCooService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * @Author lrt
 * @Date 2020/10/29 12:00
 * @Version 1.0
 **/
@Controller
@RequestMapping(value = "industrialdevelop")
public class IndustrialCooController {

    @Resource
    IIndustrialDevelopCooService developCooService;

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

    @GetMapping(value = "/coorecord")
    public String cooView(HttpServletRequest request) {
        return "industrial_develop/cooperation";
    }
}
