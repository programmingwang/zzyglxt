package com.zyyglxt.controller.govres;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.*;
import com.zyyglxt.dto.ReceiptDto;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IFileService;
import com.zyyglxt.service.IReceiptDOService;
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
 * 收文管理
 */
@Api(tags="收文管理")
@RestController
public class ReceiptController {
    @Resource
    private IReceiptDOService iReceiptDOService;
    @Resource
    private IFileService iFileService;

    /*收文管理数据的添加*/
    @RequestMapping(value ="insertreceipt",method = RequestMethod.POST )
    @LogAnnotation(appCode ="",logTitle ="收文管理数据的添加",logLevel ="3")
    public ResponseData insertReceipt(@RequestBody ReceiptDO key)  {
        iReceiptDOService.insertSelective(key);
        return new ResponseData(EmBusinessError.success);
    }
    /*
    收文管理相关数据的删除
  */
    @RequestMapping(value ="deletereceipt/{itemID}/{itemCode}",method = RequestMethod.DELETE )
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="删除收文管理数据",logLevel ="4")
    public ResponseData deleteReceipt(@PathVariable("itemID")Integer itemID,@PathVariable("itemCode")String itemCode){
        ReceiptDOKey receiptDOKey=new ReceiptDOKey();
        receiptDOKey.setItemid(itemID);
        receiptDOKey.setItemcode(itemCode);
        iReceiptDOService.deleteByPrimaryKey(receiptDOKey);
        return new ResponseData(EmBusinessError.success);
    }
    /*
     收文管理相关数据的修改
   */
    @RequestMapping(value ="updatereceipt",method = RequestMethod.POST )
    @LogAnnotation(appCode ="",logTitle ="收文管理数据的修改",logLevel ="2")
    public ResponseData updateReceipt(@RequestBody ReceiptDO key)  {
        iReceiptDOService.updateByPrimaryKeySelective(key);
        return new ResponseData(EmBusinessError.success);
    }
    /*查询所有收文管理数据*/
    @RequestMapping(value ="selectallreceipt",method = RequestMethod.GET )
    @LogAnnotation(appCode ="",logTitle ="查询所有收文管理数据",logLevel ="1")
    public ResponseData selectAllReceipt(@RequestParam(value = "receivingDataStatus") String receivingDataStatus){
        return new ResponseData(EmBusinessError.success,iReceiptDOService.selectAllReceipt(receivingDataStatus));
    }

    //查询当前分管局长
    @RequestMapping(value ="getDeputyDirector",method = RequestMethod.GET )
    @LogAnnotation(appCode ="",logTitle ="查询当前分管局长",logLevel ="1",creater ="",updater = "")
    public ResponseData getDeputyDirector(@RequestParam(value = "receiptReasonl") String receiptReasonl){
        return new ResponseData(EmBusinessError.success,iReceiptDOService.getDeputyDirector(receiptReasonl));
    }

    /*查询首页收文管理数据*/
    @RequestMapping(value ="/receipt/selectForMain",method = RequestMethod.GET )
    @LogAnnotation(appCode ="",logTitle ="查询首页收文管理数据",logLevel ="1")
    public ResponseData selectForMain(){
        return new ResponseData(EmBusinessError.success,iReceiptDOService.selectForMain());
    }

    /*查询一个带文件的收文管理数据*/
    @RequestMapping(value ="/receipt/selectOne/{itemid}/{itemcode}",method = RequestMethod.GET )
    @LogAnnotation(appCode ="",logTitle ="查询一个带文件的收文管理数据",logLevel ="1")
    public ResponseData selectOne(@PathVariable Integer itemid, @PathVariable String itemcode){
        return new ResponseData(EmBusinessError.success,iReceiptDOService.selectOneWithFile(itemid,itemcode));
    }

    @GetMapping(value = "/receipt/getReceiptFileForMain")
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="查询所有公开收文附件信息",logLevel ="1",creater ="",updater = "")
    public ResponseData getPostFileForMain(){
        return new ResponseData(EmBusinessError.success,iReceiptDOService.getReceiptFileForMain());
    }

    /*收文管理数据状态*/
    @RequestMapping(value = "changestatustoreceipt/{itemID}/{itemCode}" , method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(logTitle = "修改收文管理数据状态", logLevel = "2")
    public ResponseData changeStatusToReceipt(@RequestParam(value="receivingDataStatus") String receivingDataStatus , @PathVariable("itemID") Integer itemID , @PathVariable("itemCode")String itemCode){
        ReceiptDOKey receiptDOKey=new ReceiptDOKey();
        receiptDOKey.setItemid(itemID);
        receiptDOKey.setItemcode(itemCode);
        iReceiptDOService.changeStatusToReceipt(receiptDOKey,receivingDataStatus);
        return new ResponseData(EmBusinessError.success);
    }
}
