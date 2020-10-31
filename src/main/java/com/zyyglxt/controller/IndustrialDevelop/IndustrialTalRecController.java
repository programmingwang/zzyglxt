package com.zyyglxt.controller.IndustrialDevelop;

import com.zyyglxt.dataobject.IndustrialDevelopTalRecDOKey;
import com.zyyglxt.dataobject.IndustrialDevelopTalRecDOWithBLOBs;
import com.zyyglxt.service.IIndustrialDevelopTalRecService;
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
public class IndustrialTalRecController {
    @Resource
    IIndustrialDevelopTalRecService talRecService;

    @RequestMapping(value = "/talrec", method = RequestMethod.POST)
    public void addTalRec(@RequestBody IndustrialDevelopTalRecDOWithBLOBs record) {
        talRecService.addTalRec(record);
    }

    @RequestMapping(value = "/talrec", method = RequestMethod.PUT)
    public void updTalRec(@RequestBody IndustrialDevelopTalRecDOWithBLOBs record) {
        talRecService.updTalRec(record);
    }

    @RequestMapping(value = "/talrec", method = RequestMethod.DELETE)
    public void delTalRec(@RequestBody IndustrialDevelopTalRecDOKey key) {
        talRecService.delTalRec(key);
    }
}
