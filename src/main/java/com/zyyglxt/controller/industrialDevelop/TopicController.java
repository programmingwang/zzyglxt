package com.zyyglxt.controller.industrialDevelop;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.FileDO;
import com.zyyglxt.dataobject.IndustrialDevelopExpertRefDO;
import com.zyyglxt.dataobject.IndustrialDevelopTopicDO;
import com.zyyglxt.dataobject.IndustrialDevelopTopicDOKey;
import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopTopicDODto;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IExmaineService;
import com.zyyglxt.service.IFileService;
import com.zyyglxt.service.IIndustrialDevelopTopicService;
import com.zyyglxt.util.ConvertDOToDTOUtil;
import io.swagger.annotations.Api;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * @Author lrt
 * @Date 2020/10/29 12:00
 * @Version 1.0
 **/
@RestController
@RequestMapping(value = "industrialdevelop")
@Api(tags = "产业发展-课题数据")
@SuppressWarnings("all")
public class TopicController {
    @Resource
    IIndustrialDevelopTopicService developTopicService;

    @Autowired
    IFileService iFileService;

    @Autowired
    IExmaineService exmaineService;

    //增加课题数据
    @RequestMapping(value = "/addTopic", method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="添加产业发展-课题数据",logLevel ="3",creater ="",updater = "")
    public ResponseData addTopic(@RequestBody IndustrialDevelopTopicDO developTopicDO){
        developTopicService.addTopic(developTopicDO);
        return new ResponseData(EmBusinessError.success);
    }

    //修改课题数据
    @RequestMapping(value = "/updTopic", method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="更新产业发展-课题数据",logLevel ="2",creater ="",updater = "")
    public ResponseData updTopic(@RequestBody IndustrialDevelopTopicDO developTopicDO) {
        developTopicService.updTopic(developTopicDO);
        return new ResponseData(EmBusinessError.success);
    }

    //删除课题数据
    @RequestMapping(value = "/delTopic", method = RequestMethod.DELETE)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="删除产业发展-课题数据",logLevel ="4",creater ="",updater = "")
    public ResponseData delTopic(IndustrialDevelopTopicDOKey key) {
        developTopicService.delTopic(key);
        return new ResponseData(EmBusinessError.success);
    }

    //查询所有课题数据
    @GetMapping(value = "/getTopic")
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="查看产业发展-课题数据",logLevel ="1",creater ="",updater = "")
    public ResponseData getTopic(@RequestParam(value = "examineStatus") List examineStatus){
        List<IndustrialDevelopTopicDO> topics = developTopicService.getTopics(examineStatus);
        List<IndustrialDevelopTopicDODto> topicDODtoList = new ArrayList<>();
        for (IndustrialDevelopTopicDO topicDO : topics) {
            FileDO fileDO = iFileService.selectFileByDataCode(topicDO.getItemcode());
            topicDODtoList.add(
                    ConvertDOToDTOUtil.convertFromDOToDTO(topicDO, fileDO.getFilePath(), fileDO.getFileName()));
        }
        return new ResponseData(EmBusinessError.success,topicDODtoList);
    }

    //查询用户对应的课题的状态
    @GetMapping(value = "/getStatus")
    @ResponseBody
    public ResponseData getStatus(@RequestParam(value = "userCode") String code){
        List<IndustrialDevelopTopicDO> topicDOList = developTopicService.getStatus(code);
        return new ResponseData(EmBusinessError.success,topicDOList);
    }

    //通过itemcode查询课题
    @GetMapping(value = "/getOneTopic")
    @ResponseBody
    public ResponseData getOneTopic(@RequestParam(value = "itemCode") String itemCode){
        IndustrialDevelopTopicDO topicDO = developTopicService.getTopic(itemCode);

        return new ResponseData(EmBusinessError.success,topicDO);
    }

    //修改项目状态
    @RequestMapping(value = "/projectStatus/{itemID}/{itemCode}", method = RequestMethod.POST)
    @ResponseBody
    //@LogAnnotation(appCode ="",logTitle ="修改项目展示状态",logLevel ="2",creater ="",updater = "")
    public ResponseData changeStatus(@RequestParam("status") String status, @PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        IndustrialDevelopTopicDOKey topicDOKey = new IndustrialDevelopTopicDOKey();
        topicDOKey.setItemid(itemID);
        topicDOKey.setItemcode(itemCode);
        developTopicService.changeStatus(topicDOKey,status);
        return new ResponseData(EmBusinessError.success);
    }

    //修改审核状态
    @RequestMapping(value = "/examineStatus/{itemID}/{itemCode}", method = RequestMethod.POST)
    @ResponseBody
    //@LogAnnotation(appCode ="",logTitle ="修改项目展示状态",logLevel ="2",creater ="",updater = "")
    public ResponseData changeExamineStatus(@RequestParam("examineStatus") String examineStatus, @PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        IndustrialDevelopTopicDOKey topicDOKey = new IndustrialDevelopTopicDOKey();
        topicDOKey.setItemid(itemID);
        topicDOKey.setItemcode(itemCode);
        developTopicService.changeExamineStatus(topicDOKey,examineStatus);
        return new ResponseData(EmBusinessError.success);
    }

    //查询相应用户对应的所有课题
    @GetMapping(value = "/getUserCode")
    @ResponseBody
    public ResponseData getUserCode(@RequestParam(value = "userCode") String userCode){
        List<IndustrialDevelopTopicDO> topicDOList = developTopicService.selectByUserCode(userCode);
        List<IndustrialDevelopTopicDODto> topicDODtoList = new ArrayList<>();
        for (IndustrialDevelopTopicDO topicDO : topicDOList) {
            FileDO fileDO = iFileService.selectFileByDataCode(topicDO.getItemcode());
            topicDODtoList.add(
                    ConvertDOToDTOUtil.convertFromDOToDTO(topicDO, fileDO.getFilePath(), fileDO.getFileName()));
        }
        return new ResponseData(EmBusinessError.success,topicDODtoList);
    }

    //查询相应用户对应的所有课题
    @GetMapping(value = "/getByCompany")
    @ResponseBody
    public ResponseData getByCompany(@RequestParam(value = "company") String company){
        List<IndustrialDevelopTopicDO> topicDOList = developTopicService.selectByCompany(company);
        List<IndustrialDevelopTopicDODto> topicDODtoList = new ArrayList<>();
        for (IndustrialDevelopTopicDO topicDO : topicDOList) {
            FileDO fileDO = iFileService.selectFileByDataCode(topicDO.getItemcode());
            topicDODtoList.add(
                    ConvertDOToDTOUtil.convertFromDOToDTO(topicDO, fileDO.getFilePath(), fileDO.getFileName()));
        }
        return new ResponseData(EmBusinessError.success,topicDODtoList);
    }

    //查询数据库中的最大编号
    @GetMapping(value = "/maxProjectNO")
    @ResponseBody
    public ResponseData maxProjectNO(){
        IndustrialDevelopTopicDO max = developTopicService.maxProjectNO();
        return new ResponseData(EmBusinessError.success,max);
    }

    @GetMapping("/topicAndExpert")
    @ResponseBody
    @LogAnnotation(logTitle = "查看课题数据和分配专家状态")
    public ResponseData getTopicAndExpert(){
        List<String> status = Arrays.asList("0","1","2","3","4","5","6","7");
        List<IndustrialDevelopTopicDO> topicDOList = developTopicService.getTopics(status);
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
