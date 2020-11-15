package com.zyyglxt.controller.IndustrialDevelop;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.IndustrialDevelopExpertDO;
import com.zyyglxt.dataobject.IndustrialDevelopExpertDOKey;
import com.zyyglxt.dataobject.IndustrialDevelopExpertRefDO;
import com.zyyglxt.dataobject.IndustrialDevelopExpertRefDOKey;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IIndustrialDevelopExpertService;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @Author lrt
 * @Date 2020/10/29 12:00
 * @Version 1.0
 **/
@Api(tags = "产业发展-专家信息")
@RestController
@RequestMapping(value = "industrialdevelop")
public class ExpertController {
    @Resource
    IIndustrialDevelopExpertService industrialExpertService;

    @RequestMapping(value = "/expert", method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="添加产业发展-专家信息",logLevel ="3",creater ="",updater = "")
    public ResponseData addExpert(@RequestBody IndustrialDevelopExpertDO developExpertDO) {
        industrialExpertService.addExpert(developExpertDO);
        return new ResponseData(EmBusinessError.success);
    }

    @RequestMapping(value = "/expert", method = RequestMethod.PUT)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="更新产业发展-专家信息",logLevel ="2",creater ="",updater = "")
    public ResponseData updExpert(@RequestBody IndustrialDevelopExpertDO developExpertDO) {
        industrialExpertService.updExpert(developExpertDO);
        return new ResponseData(EmBusinessError.success);
    }

    @RequestMapping(value = "/expert", method = RequestMethod.DELETE)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="删除产业发展-专家信息",logLevel ="4",creater ="",updater = "")
    public ResponseData delExpert(@RequestBody IndustrialDevelopExpertDOKey key) {
        industrialExpertService.delExpert(key);
        return new ResponseData(EmBusinessError.success);
    }

    @RequestMapping(value = "/expert-ref", method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="添加产业发展专家信息",logLevel ="3",creater ="",updater = "")
    public ResponseData addExpertRef(@RequestBody IndustrialDevelopExpertRefDO record) {
        industrialExpertService.addExpertRef(record);
        return new ResponseData(EmBusinessError.success);
    }

    @RequestMapping(value = "/expert-ref", method = RequestMethod.PUT)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="更新产业发展专家信息",logLevel ="2",creater ="",updater = "")
    public ResponseData updExpertRef(@RequestBody IndustrialDevelopExpertRefDO record) {
        industrialExpertService.updExpertRef(record);
        return new ResponseData(EmBusinessError.success);
    }

    @RequestMapping(value = "/expert-ref", method = RequestMethod.DELETE)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="删除产业发展专家信息",logLevel ="4",creater ="",updater = "")
    public ResponseData delExpertRef(@RequestBody IndustrialDevelopExpertRefDOKey key) {
        industrialExpertService.delExpertRef(key);
        return new ResponseData(EmBusinessError.success);
    }

    @GetMapping(value = "/expert")
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="查看产业发展-专家信息",logLevel ="1",creater ="",updater = "")
    public ResponseData getExpert() {
        return new ResponseData(EmBusinessError.success,industrialExpertService.getExperts());
    }
}
