package com.zyyglxt.controller.IndustrialDevelop;

import com.zyyglxt.dataobject.IndustrialDevelopExpertDO;
import com.zyyglxt.dataobject.IndustrialDevelopExpertDOKey;
import com.zyyglxt.service.IIndustrialExpert;
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
public class IndustrialExpertController {
    @Resource
    IIndustrialExpert industrialExpertService;

    @RequestMapping(value = "/expert", method = RequestMethod.POST)
    public void addExpert(@RequestBody IndustrialDevelopExpertDO developExpertDO){
        industrialExpertService.addExpert(developExpertDO);
    }

    @RequestMapping(value = "/expert", method = RequestMethod.PUT)
    public void updExpert(@RequestBody IndustrialDevelopExpertDO developExpertDO) {
        industrialExpertService.updExpert(developExpertDO);
    }

    @RequestMapping(value = "/expert", method = RequestMethod.DELETE)
    public void delExpert(@RequestBody IndustrialDevelopExpertDOKey key) {
        industrialExpertService.delExpert(key);
    }
}
