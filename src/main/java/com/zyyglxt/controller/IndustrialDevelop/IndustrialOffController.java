package com.zyyglxt.controller.IndustrialDevelop;

import com.zyyglxt.dataobject.IndustrialDevelopOffDO;
import com.zyyglxt.dataobject.IndustrialDevelopOffDOKey;
import com.zyyglxt.service.IIndustrialDevelopOff;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @Author lrt
 * @Date 2020/10/29 12:00
 * @Version 1.0
 **/
@RestController
@RequestMapping(value = "industrialdevelop")
public class IndustrialOffController {
    @Resource
    IIndustrialDevelopOff developOffService;

    @RequestMapping(value = "/Off", method = RequestMethod.POST)
    public void addOff(@RequestBody IndustrialDevelopOffDO record) {
        developOffService.addOff(record);
    }

    @RequestMapping(value = "/Off", method = RequestMethod.PUT)
    public void updOff(@RequestBody IndustrialDevelopOffDO record) {
        developOffService.updOff(record);
    }

    @RequestMapping(value = "/Off", method = RequestMethod.DELETE)
    public void delOff(@RequestBody IndustrialDevelopOffDOKey key) {
        developOffService.delOff(key);
    }
}
