package com.zyyglxt.controller.IndustrialDevelop;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.IndustrialDevelopTopicDO;
import com.zyyglxt.dataobject.IndustrialDevelopTopicDOKey;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IFileService;
import com.zyyglxt.service.IIndustrialDevelopTopicService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @Author lrt
 * @Date 2020/10/29 12:00
 * @Version 1.0
 **/
@RestController
@RequestMapping(value = "industrialdevelop")
@Api(tags = "产业发展-课题数据")
public class TopicController {
    @Resource
    IIndustrialDevelopTopicService developTopicService;

    @Autowired
    IFileService iFileService;

    //增加课题数据
    @RequestMapping(value = "/topic", method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="添加产业发展-课题数据",logLevel ="3",creater ="",updater = "")
    public ResponseData addTopic(@RequestBody IndustrialDevelopTopicDO developTopicDO){
        developTopicService.addTopic(developTopicDO);
        return new ResponseData(EmBusinessError.success);
    }

    //修改课题数据
    @RequestMapping(value = "/topic", method = RequestMethod.PUT)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="更新产业发展-课题数据",logLevel ="2",creater ="",updater = "")
    public ResponseData updTopic(@RequestBody IndustrialDevelopTopicDO developTopicDO) {
        developTopicService.updTopic(developTopicDO);
        return new ResponseData(EmBusinessError.success);
    }

    //删除课题数据
    @RequestMapping(value = "/topic", method = RequestMethod.DELETE)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="删除产业发展-课题数据",logLevel ="4",creater ="",updater = "")
    public ResponseData delTopic(IndustrialDevelopTopicDOKey key) {
        developTopicService.delTopic(key);
        return new ResponseData(EmBusinessError.success);
    }

    //查询所有课题数据
    @GetMapping(value = "/topic")
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="查看产业发展-课题数据",logLevel ="1",creater ="",updater = "")
    public ResponseData getTopic(){
        return new ResponseData(EmBusinessError.success,developTopicService.getTopics());
    }
}
