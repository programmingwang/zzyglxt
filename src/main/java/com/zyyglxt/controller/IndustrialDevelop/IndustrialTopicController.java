package com.zyyglxt.controller.IndustrialDevelop;

import com.zyyglxt.dataobject.IndustrialDevelopTopicDO;
import com.zyyglxt.dataobject.IndustrialDevelopTopicDOKey;
import com.zyyglxt.service.IIndustrialDevelopTopicService;
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
public class IndustrialTopicController {
    @Resource
    IIndustrialDevelopTopicService developTopicService;

    @RequestMapping(value = "/topic", method = RequestMethod.POST)
    public void addTopic(@RequestBody IndustrialDevelopTopicDO developTopicDO){
        
        developTopicService.addTopic(developTopicDO);
    }

    @RequestMapping(value = "/topic", method = RequestMethod.PUT)
    public void updTopic(@RequestBody IndustrialDevelopTopicDO developTopicDO) {
        developTopicService.updTopic(developTopicDO);
    }

    @RequestMapping(value = "/topic", method = RequestMethod.DELETE)
    public void delTopic(IndustrialDevelopTopicDOKey key) {
        developTopicService.delTopic(key);
    }
}
