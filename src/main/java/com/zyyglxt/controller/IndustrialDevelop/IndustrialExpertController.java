package com.zyyglxt.controller.IndustrialDevelop;

import com.zyyglxt.dataobject.IndustrialDevelopExpertDO;
import com.zyyglxt.dataobject.IndustrialDevelopExpertDOKey;
import com.zyyglxt.dataobject.IndustrialDevelopExpertRefDO;
import com.zyyglxt.dataobject.IndustrialDevelopExpertRefDOKey;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IIndustrialDevelopExpertService;
import org.springframework.web.bind.annotation.*;

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
    IIndustrialDevelopExpertService industrialExpertService;

    @RequestMapping(value = "/expert", method = RequestMethod.POST)
    @ResponseBody
    public ResponseData addExpert(@RequestBody IndustrialDevelopExpertDO developExpertDO){
        industrialExpertService.addExpert(developExpertDO);
        return new ResponseData(EmBusinessError.success);
    }

    @RequestMapping(value = "/expert", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseData updExpert(@RequestBody IndustrialDevelopExpertDO developExpertDO) {
        industrialExpertService.updExpert(developExpertDO);
        return new ResponseData(EmBusinessError.success);
    }

    @RequestMapping(value = "/expert", method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseData delExpert(@RequestBody IndustrialDevelopExpertDOKey key) {
        industrialExpertService.delExpert(key);
        return new ResponseData(EmBusinessError.success);
    }

    @RequestMapping(value = "/expert-ref", method = RequestMethod.POST)
    @ResponseBody
    public ResponseData addExpertRef(@RequestBody IndustrialDevelopExpertRefDO record) {
        industrialExpertService.addExpertRef(record);
        return new ResponseData(EmBusinessError.success);
    }

    @RequestMapping(value = "/expert-ref", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseData updExpertRef(@RequestBody IndustrialDevelopExpertRefDO record) {
        industrialExpertService.updExpertRef(record);
        return new ResponseData(EmBusinessError.success);
    }

    @RequestMapping(value = "/expert-ref", method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseData delExpertRef(@RequestBody IndustrialDevelopExpertRefDOKey key) {
        industrialExpertService.delExpertRef(key);
        return new ResponseData(EmBusinessError.success);
    }
}
