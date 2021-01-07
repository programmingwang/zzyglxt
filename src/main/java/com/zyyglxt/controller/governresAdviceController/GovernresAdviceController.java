package com.zyyglxt.controller.governresAdviceController;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.GovernresAdvice;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IGovernresAdviceService;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

    @Api(tags = "政务办公-部门意见")
    @RestController
    @RequestMapping(value = "governresAdvice")
    public class GovernresAdviceController {

        @Resource
        IGovernresAdviceService governresAdviceService;

        @RequestMapping(value = "/insert", method = RequestMethod.POST)
        @ResponseBody
        @LogAnnotation(appCode ="",logTitle ="政务办公-部门意见-新增",logLevel ="3",creater ="",updater = "")
        public ResponseData insertSelective(@RequestBody GovernresAdvice governresAdvice) {
            governresAdviceService.insertSelective(governresAdvice);
            return new ResponseData(EmBusinessError.success);
        }

        @RequestMapping(value = "/{itemCode}", method = RequestMethod.DELETE)
        @ResponseBody
        @LogAnnotation(appCode ="",logTitle ="政务办公-部门意见-删除",logLevel ="4",creater ="",updater = "")
        public ResponseData deleteByPrimaryKey(@PathVariable("itemID") Integer itemID,@PathVariable("itemCode") String itemCode) {
            governresAdviceService.deleteByPrimaryKey(itemID,itemCode);
            return new ResponseData(EmBusinessError.success);
        }

        @GetMapping(value = "/selectAll")
        @ResponseBody
        @LogAnnotation(appCode ="",logTitle ="政务办公-部门意见-显示所有意见",logLevel ="1",creater ="",updater = "")
        public ResponseData selectAll() {
            return new ResponseData(EmBusinessError.success,governresAdviceService.selectAll());
        }

        @RequestMapping(value = "/update", method = RequestMethod.PUT)
        @ResponseBody
        @LogAnnotation(appCode ="",logTitle ="政务办公-部门意见-修改",logLevel ="2",creater ="",updater = "")
        public ResponseData updateByPrimaryKeySelective(@RequestBody GovernresAdvice record) {
            governresAdviceService.updateByPrimaryKeySelective(record);
            return new ResponseData(EmBusinessError.success);
        }

        @RequestMapping(value = "/select/{itemCode}",method = RequestMethod.GET)
        @ResponseBody
        @LogAnnotation(appCode ="",logTitle ="政务办公-部门意见-查看",logLevel ="1",creater ="",updater = "")
        public ResponseData selectByPrimaryKey( @PathVariable("itemID") Integer itemID,@PathVariable("itemCode") String itemCode){
            GovernresAdvice governresAdvice= governresAdviceService.selectByPrimaryKey(itemID,itemCode);
            return new ResponseData(EmBusinessError.success,governresAdviceService);
        }
    }

