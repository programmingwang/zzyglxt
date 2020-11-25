package com.zyyglxt.controller.industrialDevelop;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.IndustrialDevelopExpertRefDO;
import com.zyyglxt.dataobject.IndustrialDevelopTopicDO;
import com.zyyglxt.dataobject.IndustrialDevelopTopicDOKey;
import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopTopicDODto;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IExmaineService;
import com.zyyglxt.service.IFileService;
import com.zyyglxt.service.IIndustrialDevelopTopicService;
import io.swagger.annotations.Api;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

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

    @Autowired
    IExmaineService exmaineService;

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

    @GetMapping("/topicAndExpert")
    @ResponseBody
    @LogAnnotation(logTitle = "查看课题数据和分配专家状态")
    public ResponseData getTopicAndExpert(){
        List<IndustrialDevelopTopicDO> topicDOList = developTopicService.getTopics();
        List<IndustrialDevelopTopicDODto> DtoList = new ArrayList<>();
        for (IndustrialDevelopTopicDO DO:topicDOList){
            IndustrialDevelopTopicDODto Dto = new IndustrialDevelopTopicDODto();
            BeanUtils.copyProperties(DO,Dto);
            List<IndustrialDevelopExpertRefDO> expertRefDOList = exmaineService.selectByTopicCode(Dto.getItemcode());
            if (expertRefDOList.size() == 0 || expertRefDOList == null){
                Dto.setExpertCode(null);
            }
            else{
                for (IndustrialDevelopExpertRefDO expertRefDO : expertRefDOList){
                    String expertCode = expertRefDO.getExpertCode();
                    if (expertCode != null && expertCode != "" && expertCode.length() != 0){
                        Dto.setExpertCode(expertCode);
                        break;
                    }
                }

            }
            DtoList.add(Dto);
        }
        return new ResponseData(EmBusinessError.success,DtoList);
    }
}
