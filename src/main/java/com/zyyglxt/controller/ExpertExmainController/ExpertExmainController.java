package com.zyyglxt.controller.ExpertExmainController;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.IndustrialDevelopExpertRefDO;
import com.zyyglxt.dto.ExmaineDto;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IExmaineService;
import com.zyyglxt.service.IIndustrialDevelopExpertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/11/21 15:04
 * Version: 1.0
 */
@RestController
@RequestMapping("/exmain")
public class ExpertExmainController {

    @Autowired
    private IExmaineService exmaineService;

    @Autowired
    IIndustrialDevelopExpertService industrialExpertService;

    //获取所有的打分课题
    @RequestMapping(value = "/exmain" , method = RequestMethod.GET)
    @ResponseBody
    public ResponseData getAllExmainTopic(){
        return new ResponseData(EmBusinessError.success,exmaineService.selectAll());
    }

    //通过专家获得的课题
    @RequestMapping(value = "/getByExpertCode" , method = RequestMethod.GET)
    @ResponseBody
    public ResponseData getAllExmainTopic(@RequestParam("expertUserCode") String expertUserCode){
        expertUserCode = industrialExpertService.selectByUserCode(expertUserCode);
        return new ResponseData(EmBusinessError.success,exmaineService.selectByExpertCode(expertUserCode));
    }

    //打分
    @RequestMapping(value = "/exmain" , method = RequestMethod.PUT)
    @ResponseBody
    public ResponseData updExmain(@RequestBody IndustrialDevelopExpertRefDO developExpertRefDO){
        //打分，updateByPrimaryKeySelective不再是根据itemid和itemcode修改数据了，请注意
        exmaineService.updateByPrimaryKeySelective(developExpertRefDO);
        return new ResponseData(EmBusinessError.success);
    }

    //更改课题状态，重新打分
    @RequestMapping(value = "/ReExmain" , method = RequestMethod.POST)
    @ResponseBody
    public ResponseData ReExmain(@RequestBody IndustrialDevelopExpertRefDO developExpertRefDO){
        developExpertRefDO.setOpinion("");
        developExpertRefDO.setScore("");
        //打分，updateByPrimaryKeySelective不再是根据itemid和itemcode修改数据了，请注意
        exmaineService.updateByPrimaryKeySelective(developExpertRefDO);
        return new ResponseData(EmBusinessError.success);
    }

    //批量删除分配专家
    @DeleteMapping("/exmain")
    @ResponseBody
    public ResponseData deleteByTopicCode(@RequestBody List<IndustrialDevelopExpertRefDO> topicCodeList){
        for (IndustrialDevelopExpertRefDO topicCode:topicCodeList){
            exmaineService.deleteByTopicCode(topicCode.getTopicCode());
        }
        return new ResponseData(EmBusinessError.success);
    }

    //删除单个课题的专家
    @DeleteMapping("/delExpertTopic")
    @ResponseBody
    public ResponseData delExpertTopic(@RequestBody List<IndustrialDevelopExpertRefDO> expertRefDOList){
        for (IndustrialDevelopExpertRefDO expertRefDO:expertRefDOList){
            exmaineService.delExpertTopic(expertRefDO);
        }
        return new ResponseData(EmBusinessError.success);
    }

    //分配专家
    @PostMapping("/exmain")
    @ResponseBody
    public ResponseData insert(@RequestBody List<IndustrialDevelopExpertRefDO> expertRefDOList){
        for (IndustrialDevelopExpertRefDO expertRefDO:expertRefDOList){
            exmaineService.insertSelective(expertRefDO);
        }
        return new ResponseData(EmBusinessError.success);
    }

    @PostMapping("/selExpertCode")
    @ResponseBody
    public ResponseData selExpertCode(@RequestParam("expertUserCode") String expertUserCode){
        return new ResponseData(EmBusinessError.success,industrialExpertService.selectByUserCode(expertUserCode));
    }

    //分配专家列表查询
    @GetMapping("/topicAndExpertStatus")
    @ResponseBody
    @LogAnnotation(logTitle = "查看课题数据和分配专家状态")
    public ResponseData selectTopic(){
        return new ResponseData(EmBusinessError.success, exmaineService.topicAndExpertStatus());
    }
}
