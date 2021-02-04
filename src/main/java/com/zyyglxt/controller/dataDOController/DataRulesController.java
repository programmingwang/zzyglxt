package com.zyyglxt.controller.dataDOController;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.DataDO;
import com.zyyglxt.dataobject.DataDOKey;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IDataRulesService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @author qjc
 * @version 1.0
 * @date 2021/2/4 14:00
 */
@RestController
@RequestMapping(value = "/datado/rules")
public class DataRulesController {

    @Resource
    private IDataRulesService dataRulesService;

    @PostMapping("/rules")
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="增加规章制度记录",logLevel ="3",creater ="",updater = "")
    public ResponseData insert(@RequestBody DataDO record) {
        dataRulesService.insert(record);
        return new ResponseData(EmBusinessError.success);
    }

    @DeleteMapping("/rules")
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="删除规章制度记录",logLevel ="4",creater ="",updater = "")
    public ResponseData deleteHosp(@RequestBody DataDOKey dataDOKey){
        dataRulesService.delete(dataDOKey);
        return new ResponseData(EmBusinessError.success);
    }

    @PutMapping("/rules")
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="更新规章制度记录",logLevel ="2",creater ="",updater = "")
    public ResponseData update(@RequestBody DataDO record) {
        dataRulesService.update(record);
        return new ResponseData(EmBusinessError.success);
    }

    @GetMapping("/selectAll")
    @LogAnnotation(appCode ="",logTitle ="查询所有规章制度的数据",logLevel ="1",creater ="",updater = "")
    public ResponseData selectRules(@RequestParam(value = "dataStatus")String dataStatus){
        return new ResponseData(EmBusinessError.success, dataRulesService.selectRules(dataStatus));
    }

    @GetMapping(value = "/selectRulesMain")
    @LogAnnotation(appCode ="",logTitle ="查询首页前五条规章制度的数据",logLevel ="1",creater ="",updater = "")
    public ResponseData selectRegulationForMain(){
        return new ResponseData(EmBusinessError.success,dataRulesService.selectForMainPage());
    }



}
