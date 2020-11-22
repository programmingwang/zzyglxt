package com.zyyglxt.controller.industrialDevelop;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.IndustrialDevelopSchool;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IndustrialDevelopSchoolService;
import io.swagger.annotations.Api;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @Author lrt
 * @Date 2020/11/6 21:13
 * @Version 1.0
 **/
@Api(tags = "产业发展-高等学院记录")
@RestController
@RequestMapping(value = "industrialdevelop")
public class SchoolController {

    @Resource
    IndustrialDevelopSchoolService schoolService;

    @ResponseBody
    @RequestMapping(value = "/school", method = RequestMethod.POST)
    @LogAnnotation(appCode ="",logTitle ="添加产业发展-高等学院记录",logLevel ="3",creater ="",updater = "")
    public ResponseData addSchool(@RequestBody IndustrialDevelopSchool record){
        int res = schoolService.insertSelective(record);
        if (res == -1){
            return new ResponseData(EmBusinessError.ORG_NAME_ERROR);
        }else {
            return new ResponseData(EmBusinessError.success);
        }
    }

    @ResponseBody
    @RequestMapping(value = "/school", method = RequestMethod.PUT)
    @LogAnnotation(appCode ="",logTitle ="更新产业发展-高等学院记录",logLevel ="2",creater ="",updater = "")
    public ResponseData updSchool(@RequestBody IndustrialDevelopSchool record){
        schoolService.updateByPrimaryKeySelective(record);
        return new ResponseData(EmBusinessError.success);
    }

    @ResponseBody
    @RequestMapping(value = "/school", method = RequestMethod.DELETE)
    @LogAnnotation(appCode ="",logTitle ="删除产业发展-高等学院记录",logLevel ="4",creater ="",updater = "")
    public ResponseData delSchool(@RequestBody IndustrialDevelopSchool record){
        schoolService.deleteByPrimaryKey(record.getItemid(), record.getItemcode());
        return new ResponseData(EmBusinessError.success);
    }

    @ResponseBody
    @GetMapping(value = "/school")
    public ResponseData getSchool(){
        return new ResponseData(EmBusinessError.success, schoolService.selectAll());
    }

    @ResponseBody
    @GetMapping(value = "/schoolmsg")
    public ResponseData getSchoolByorgcode(){
        return new ResponseData(EmBusinessError.success, schoolService.selectByorgcode());
    }
}
