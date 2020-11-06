package com.zyyglxt.controller.industrialDevelop;

import com.zyyglxt.dataobject.IndustrialDevelopTopicDO;
import com.zyyglxt.dataobject.IndustrialDevelopTopicDOKey;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IIndustrialDevelopTopicService;
import io.swagger.annotations.Api;
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
public class IndustrialTopicController {
    @Resource
    IIndustrialDevelopTopicService developTopicService;

    @RequestMapping(value = "/topic", method = RequestMethod.POST)
    @ResponseBody
    public ResponseData addTopic(@RequestBody IndustrialDevelopTopicDO developTopicDO){
        developTopicService.addTopic(developTopicDO);
        return new ResponseData(EmBusinessError.success);
    }

    @RequestMapping(value = "/topic", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseData updTopic(@RequestBody IndustrialDevelopTopicDO developTopicDO) {
        developTopicService.updTopic(developTopicDO);
        return new ResponseData(EmBusinessError.success);
    }

    @RequestMapping(value = "/topic", method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseData delTopic(IndustrialDevelopTopicDOKey key) {
        developTopicService.delTopic(key);
        return new ResponseData(EmBusinessError.success);
    }

    @GetMapping(value = "/topic")
    @ResponseBody
    public ResponseData getTopic(){
        return new ResponseData(EmBusinessError.success,developTopicService.getTopics());
    }
}
