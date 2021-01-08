package com.zyyglxt.controller.govres;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.adviceDO;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IAdviceService;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * @Author huangtao
 * @Date 2021/1/3 18:10
 * @Version 1.0
 */
@RestController
@RequestMapping(value = "advice")
@Api(tags = "意见表")
public class AdviceController {
    @Resource
    IAdviceService adviceService;

    //添加意见
    @RequestMapping(value = "/createAdvice", method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="添加意见",logLevel ="3",creater ="",updater = "")
    public ResponseData insertSelective(@RequestBody adviceDO record){
        adviceService.insertSelective(record);
        return new ResponseData(EmBusinessError.success);
    }

    //删除意见
    @RequestMapping(value = "/delAdvice", method = RequestMethod.DELETE)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="删除意见",logLevel ="4",creater ="",updater = "")
    public ResponseData delByDataCode(@RequestParam(value = "dataCode") String dataCode) {
        adviceService.delByDataCode(dataCode);
        return new ResponseData(EmBusinessError.success);
    }

    //修改意见
    @RequestMapping(value = "/updAdvice", method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="修改意见",logLevel ="2",creater ="",updater = "")
    public ResponseData updAdvice(@RequestBody adviceDO advice) {
        adviceService.updAdvice(advice);
        return new ResponseData(EmBusinessError.success);
    }

    //查询dataCode对应的意见
    @RequestMapping(value = "/getByDataCode", method = RequestMethod.GET)
    @ResponseBody
    public ResponseData getByDataCode(@RequestParam(value = "dataCode") String dataCode){
        adviceDO adviceDOList = adviceService.getByDataCode(dataCode);
        return new ResponseData(EmBusinessError.success,adviceDOList);
    }

}
