package com.zyyglxt.controller.industrialDevelop;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.IndustrialDevelopTecSerOrg;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IndustrialDevelopTecSerOrgService;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @Author lrt
 * @Date 2020/11/6 21:18
 * @Version 1.0
 **/
@Api(tags = "产业发展-技术服务机构、科研院所、旅游养生机构信息记录表")
@RestController
@RequestMapping(value = "industrialdevelop")
public class TecSerOrgController {

    @Resource
    IndustrialDevelopTecSerOrgService tecSerOrgService;

    @ResponseBody
    @RequestMapping(value = "/tec-ser-org", method = RequestMethod.POST)
    @LogAnnotation(appCode ="",logTitle ="添加产业发展-服务项目",logLevel ="3",creater ="",updater = "")
    public ResponseData addTec(@RequestBody IndustrialDevelopTecSerOrg record){
        int res = tecSerOrgService.insertSelective(record);
        if (res == -1){
            return new ResponseData(EmBusinessError.ORG_NAME_ERROR);
        }else {
            return new ResponseData(EmBusinessError.success);
        }
    }

    @ResponseBody
    @RequestMapping(value = "/tec-ser-org", method = RequestMethod.PUT)
    @LogAnnotation(appCode ="",logTitle ="更新产业发展-服务项目",logLevel ="2",creater ="",updater = "")
    public ResponseData updTec(@RequestBody IndustrialDevelopTecSerOrg record){
        tecSerOrgService.updateByPrimaryKeySelective(record);
        return new ResponseData(EmBusinessError.success);
    }

    @ResponseBody
    @RequestMapping(value = "/tec-ser-org", method = RequestMethod.DELETE)
    @LogAnnotation(appCode ="",logTitle ="删除产业发展-服务项目",logLevel ="4",creater ="",updater = "")
    public ResponseData delTec(@RequestBody IndustrialDevelopTecSerOrg record){
        tecSerOrgService.deleteByPrimaryKey(record.getItemid(),record.getItemcode());
        return new ResponseData(EmBusinessError.success);
    }

    @ResponseBody
    @GetMapping(value = "/tec-ser-org/{type}")
    public ResponseData getTec(@PathVariable String type){
        return new ResponseData(EmBusinessError.success,tecSerOrgService.selectAll(type));
    }

    @ResponseBody
    @GetMapping(value = "/tec-ser-org/selectbyorgcode")
    public ResponseData getTecByOrgcode(){
        return new ResponseData(EmBusinessError.success,tecSerOrgService.selectByOrgcode());
    }
}
