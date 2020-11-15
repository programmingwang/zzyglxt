package com.zyyglxt.controller.IndustrialDevelop;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.IndustrialDevelopTalRecDO;
import com.zyyglxt.dataobject.IndustrialDevelopTalRecDOKey;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IIndustrialDevelopTalRecService;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @Author lrt
 * @Date 2020/10/29 12:00
 * @Version 1.0
 **/
@Api(tags = "产业发展-人才招募")
@RestController
@RequestMapping(value = "industrialdevelop")
public class TalRecController {
    @Resource
    IIndustrialDevelopTalRecService talRecService;

    @RequestMapping(value = "/talrec", method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="添加产业发展-人才招募",logLevel ="3",creater ="",updater = "")
    public ResponseData addTalRec(@RequestBody IndustrialDevelopTalRecDO record) {
        talRecService.addTalRec(record);
        return new ResponseData(EmBusinessError.success);
    }

    @RequestMapping(value = "/talrec", method = RequestMethod.PUT)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="更新产业发展-人才招募",logLevel ="2",creater ="",updater = "")
    public ResponseData updTalRec(@RequestBody IndustrialDevelopTalRecDO record) {
        talRecService.updTalRec(record);
        return new ResponseData(EmBusinessError.success);
    }

    @RequestMapping(value = "/talrec", method = RequestMethod.DELETE)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="删除产业发展-人才招募",logLevel ="4",creater ="",updater = "")
    public ResponseData delTalRec(@RequestBody IndustrialDevelopTalRecDOKey key) {
        talRecService.delTalRec(key);
        return new ResponseData(EmBusinessError.success);
    }

    @GetMapping(value = "/talrec")
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="查看产业发展-人才招募",logLevel ="1",creater ="",updater = "")
    public ResponseData getTalRec(){
        return new ResponseData(EmBusinessError.success, talRecService.getTalRecs());
    }
}
