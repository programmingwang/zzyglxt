package com.zyyglxt.controller.govres;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.*;
import com.zyyglxt.dto.RequestReportDto;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IFileService;
import com.zyyglxt.service.IRequestReportDOService;
import com.zyyglxt.util.ConvertDOToCareFamPre;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/12/19 22:38
 * Version: 1.0
 * 请示报告
 */
@Api(tags="请示报告")
@RestController
public class ReportController {
    @Resource
    private IRequestReportDOService iRequestReportDOService;
    @Resource
    private IFileService iFileService;

    /*请示报告数据的添加*/
    @RequestMapping(value ="insertrequestreport",method = RequestMethod.POST )
    @LogAnnotation(appCode ="",logTitle ="请示报告数据的添加",logLevel ="3")
    public ResponseData insertRequestReport(@RequestBody RequestReportDO key)  {
        iRequestReportDOService.insertSelective(key);
        return new ResponseData(EmBusinessError.success);
    }
    /*
    请示报告数据的删除
  */
    @RequestMapping(value ="deleterequestreport/{itemID}/{itemCode}",method = RequestMethod.DELETE )
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="删除请示报告数据",logLevel ="4")
    public ResponseData deleteRequestReport(@PathVariable("itemID")Integer itemID,@PathVariable("itemCode")String itemCode){
        RequestReportDOKey requestReportDOKey=new RequestReportDOKey();
        requestReportDOKey.setItemid(itemID);
       requestReportDOKey.setItemcode(itemCode);
        iRequestReportDOService.deleteByPrimaryKey(requestReportDOKey);
        return new ResponseData(EmBusinessError.success);
    }
    /*
     请示报告相关数据的修改
   */
    @RequestMapping(value ="updaterequestreport",method = RequestMethod.POST )
    @LogAnnotation(appCode ="",logTitle ="请示报告数据的修改",logLevel ="2")
    public ResponseData updateRequestReport(@RequestBody RequestReportDO key)  {
        iRequestReportDOService.updateByPrimaryKeySelective(key);
        return new ResponseData(EmBusinessError.success);
    }
    /*查询所有请示报告数据*/
    @RequestMapping(value ="selectallrequestreport",method = RequestMethod.GET )
    @LogAnnotation(appCode ="",logTitle ="查询所有请示报告数据",logLevel ="1")
    public ResponseData selectAllRequestReport(@RequestParam(value = "reportDataStatus") String  reportDataStatus){
        return new ResponseData(EmBusinessError.success,iRequestReportDOService.selectAllReport(reportDataStatus));
    }

    /*请示报告数据状态*/
    @RequestMapping(value = "changestatustorequestreport/{itemID}/{itemCode}" , method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(logTitle = "修改请示报告数据状态", logLevel = "2")
    public ResponseData changeStatusToRequestReport(@RequestParam("reportDataStatus") String reportDataStatus , @PathVariable("itemID") Integer itemID , @PathVariable("itemCode")String itemCode){
       RequestReportDOKey requestReportDOKey=new  RequestReportDOKey();
        requestReportDOKey.setItemid(itemID);
        requestReportDOKey.setItemcode(itemCode);
       iRequestReportDOService.changeStatusToReport(requestReportDOKey,reportDataStatus);
        return new ResponseData(EmBusinessError.success);
    }
}
