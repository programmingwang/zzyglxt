package com.zyyglxt.controller.ExpertExmainController;

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
        List<ExmaineDto> exmaineDtos = exmaineService.selectAll();
        return new ResponseData(EmBusinessError.success,exmaineDtos);
    }

    //通过专家获得的课题
    @RequestMapping(value = "/getByExpertCode" , method = RequestMethod.GET)
    @ResponseBody
    public ResponseData getAllExmainTopic(@RequestParam("expertUserCode") String expertUserCode){
        List<ExmaineDto> exmaineDtos = exmaineService.selectByExpertCode(industrialExpertService.selectByUserCode(expertUserCode));
        return new ResponseData(EmBusinessError.success,exmaineDtos);
    }

    @RequestMapping(value = "/exmain" , method = RequestMethod.PUT)
    @ResponseBody
    public ResponseData updExmain(@RequestBody IndustrialDevelopExpertRefDO developExpertRefDO){
        //打分，updateByPrimaryKeySelective不再是根据itemid和itemcode修改数据了，请注意
        exmaineService.updateByPrimaryKeySelective(developExpertRefDO);
        return new ResponseData(EmBusinessError.success);
    }

    @DeleteMapping("/exmain")
    @ResponseBody
    public ResponseData deleteByTopicCode(String topicCode){
        exmaineService.deleteByTopicCode(topicCode);
        return new ResponseData(EmBusinessError.success);
    }

    @PostMapping("/exmain")
    @ResponseBody
    public ResponseData insert(@RequestBody IndustrialDevelopExpertRefDO expertRefDO){
        exmaineService.insertSelective(expertRefDO);
        return new ResponseData(EmBusinessError.success);
    }

    @PostMapping("/selExpertCode")
    @ResponseBody
    public ResponseData selExpertCode(@RequestParam("expertUserCode") String expertUserCode){
        return new ResponseData(EmBusinessError.success,industrialExpertService.selectByUserCode(expertUserCode));
    }

}
