package com.zyyglxt.controller;

import com.zyyglxt.dto.ExmaineDto;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IExmaineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

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

    //获取所有的打分课题
    @RequestMapping(value = "/exmain" , method = RequestMethod.GET)
    @ResponseBody
    public ResponseData getAllExmainTopic(){
        List<ExmaineDto> exmaineDtos = exmaineService.selectAll();
        return new ResponseData(EmBusinessError.success,exmaineDtos);
    }

}
