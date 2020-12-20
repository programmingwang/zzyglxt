package com.zyyglxt.controller.dataDOController;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.DataDO;
import com.zyyglxt.dataobject.DataDOKey;
import com.zyyglxt.dataobject.FileDO;
import com.zyyglxt.dto.DataDto;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IDataNewsService;
import com.zyyglxt.service.IFileService;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

/**
 * @Author huangtao
 * @Date 2020/10/29 10:00
 * @Version 1.0
 */

@RestController
@RequestMapping("/datado/newsInf")
public class DataNewsInfController {

    @Resource
    IDataNewsService dataDOService;

    @Resource
    private IFileService fileService;

    /*查看一条记录*/
    /*@RequestMapping(value = "/selectByPrimaryKey/{itemID}/{itemCode}", method = RequestMethod.GET)
    public ResponseData selectByPrimaryKey(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        DataDOKey dataDOKey = new DataDOKey();
        dataDOKey.setItemid(itemID);
        dataDOKey.setItemcode(itemCode);
        DataDO data = dataDOService.selectNewsInf(dataDOKey);
        return new ResponseData(EmBusinessError.success, data);
    }*/


    /**
     * 查看新闻轮播图的所有数据
     * @return
     */
    @RequestMapping(value = "/selectAllNewsRot", method = RequestMethod.GET)
    @LogAnnotation(appCode ="",logTitle ="查看所有新闻轮播图",logLevel ="1",creater ="",updater = "")
    public ResponseData selectNewsRotList(@RequestParam(value = "dataStatus")List dataStatus){
        List dataDOList = dataDOService.selectNewsRotList(dataStatus);
        return new ResponseData(EmBusinessError.success,DoToDto(dataDOList));
    }


    /**
     * 查看新闻管理的所有数据
     * @return
     */
    @RequestMapping(value = "/selectAllNewsInf", method = RequestMethod.GET)
    @LogAnnotation(appCode ="",logTitle ="查看所有新闻信息",logLevel ="1",creater ="",updater = "")
    public ResponseData selectNewsInfList(@RequestParam(value = "dataStatus")List dataStatus){
        List<DataDO> dataDOList = dataDOService.selectNewsInfList(dataStatus);
        return new ResponseData(EmBusinessError.success,dataDOList);
    }

    /**
     * 删除新闻数据记录
     * @param itemID
     * @param itemCode
     */
    @RequestMapping(value = "/deleteByPrimaryKey/{itemID}/{itemCode}", method = RequestMethod.DELETE)
    @LogAnnotation(appCode ="",logTitle ="删除新闻",logLevel ="4",creater ="",updater = "")
    public ResponseData deleteByPrimaryKey(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        DataDOKey dataDOKey = new DataDOKey();
        dataDOKey.setItemid(itemID);
        dataDOKey.setItemcode(itemCode);
        dataDOService.deleteNewsInf(dataDOKey);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 增加新闻数据记录
     * @param record
     */
    @RequestMapping(value = "/insertNewsInf", method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="增加新闻",logLevel ="3",creater ="",updater = "")
    public ResponseData insertNewsInf(@RequestBody DataDO record) {
        dataDOService.insertNewsInf(record);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 更新新闻数据记录
     * @param record
     */
    @RequestMapping(value = "updateNewsInf", method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="更新新闻",logLevel ="2",creater ="",updater = "")
    public ResponseData updateNewsInf(@RequestBody DataDO record) {
        dataDOService.updateNewsInf(record);
        return new ResponseData(EmBusinessError.success);
    }

    //修改展示状态
    @RequestMapping(value = "changeNewsStatus/{itemID}/{itemCode}", method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="修改展示状态",logLevel ="2",creater ="",updater = "")
    public ResponseData changeStatus(@RequestParam(value = "dataDelayedRelease",required = false) String dataDelayedRelease, @RequestParam("dataStatus") String dataStatus, @PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        DataDOKey dataDOKey = new DataDOKey();
        dataDOKey.setItemid(itemID);
        dataDOKey.setItemcode(itemCode);
        dataDOService.changeStatus(dataDOKey,dataDelayedRelease,dataStatus);
        return new ResponseData(EmBusinessError.success);
    }


    private List<DataDto> DoToDto(List<DataDO> DOList){
        List<DataDto> DtoList = new ArrayList<>();
        if (!DOList.isEmpty()){
            for (DataDO DO:DOList){
                DataDto Dto = new DataDto();
                BeanUtils.copyProperties(DO,Dto);
                FileDO fileDO= fileService.selectFileByDataCode(Dto.getItemcode());
                Dto.setFileName(fileDO == null ? null:fileDO.getFileName());
                Dto.setFilePath(fileDO == null ? null:fileDO.getFilePath());
                DtoList.add(Dto);
            }
        }
        return DtoList;
    }

}
