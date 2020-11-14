package com.zyyglxt.controller.dataDOController;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.DataDO;
import com.zyyglxt.dataobject.DataDOKey;
import com.zyyglxt.dataobject.FileDO;
import com.zyyglxt.dto.DataDto;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IDataNewsService;
import com.zyyglxt.service.IDataProcessService;
import com.zyyglxt.service.IFileService;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * @Author huangtao
 * @Date 2020/10/29 10:00
 * @Version 1.0
 */

@RestController
@RequestMapping("/datado/process")
public class DataProcessController {

    @Resource
    IDataProcessService dataProcessService;

    @Resource
    private IFileService fileService;

    /*查看一条办事流程*/
    /*@RequestMapping(value = "/selectByPrimaryKey/{itemID}/{itemCode}", method = RequestMethod.GET)
    @LogAnnotation(appCode ="",logTitle ="查看一条办事流程",logLevel ="1",creater ="",updater = "")
    public ResponseData selectByPrimaryKey(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        DataDOKey dataDOKey = new DataDOKey();
        dataDOKey.setItemid(itemID);
        dataDOKey.setItemcode(itemCode);
        DataDO data = dataProcessService.selectProcess(dataDOKey);
        return new ResponseData(EmBusinessError.success, data);
    }*/


    /**
     * 查看办事流程的所有数据
     * @return
     */
    @RequestMapping(value = "/selectAll", method = RequestMethod.GET)
    @LogAnnotation(appCode ="",logTitle ="查看所有办事流程数据",logLevel ="1",creater ="",updater = "")
    public ResponseData selectProcessList(@RequestParam(value = "dataStatus")List dataStatus){
        List<DataDO> dataDOList = dataProcessService.selectProcessList(dataStatus);
        return new ResponseData(EmBusinessError.success,DoToDto(dataDOList));
    }

    /**
     * 删除办事流程记录
     * @param itemID
     * @param itemCode
     */
    @RequestMapping(value = "/deleteByPrimaryKey/{itemID}/{itemCode}", method = RequestMethod.DELETE)
    @LogAnnotation(appCode ="",logTitle ="删除办事流程记录",logLevel ="4",creater ="",updater = "")
    public ResponseData deleteByPrimaryKey(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        DataDOKey dataDOKey = new DataDOKey();
        dataDOKey.setItemid(itemID);
        dataDOKey.setItemcode(itemCode);
        dataProcessService.deleteProcess(dataDOKey);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 增加办事流程记录
     * @param record
     */
    @RequestMapping(value = "/insertProcess", method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="增加办事流程记录",logLevel ="3",creater ="",updater = "")
    public ResponseData insertProcess(@RequestBody DataDO record) {
        dataProcessService.insertProcess(record);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 更新办事流程记录
     * @param record
     */
    @RequestMapping(value = "updateProcess", method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="更新办事流程记录",logLevel ="2",creater ="",updater = "")
    public ResponseData updateProcess(@RequestBody DataDO record) {
        dataProcessService.updateProcess(record);
        return new ResponseData(EmBusinessError.success);
    }

    //修改展示状态
    @RequestMapping(value = "changeProcessStatus/{itemID}/{itemCode}", method = RequestMethod.PUT)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="修改展示状态",logLevel ="2",creater ="",updater = "")
    public ResponseData changeStatus(@RequestParam("dataStatus") String dataStatus, @PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        DataDOKey dataDOKey = new DataDOKey();
        dataDOKey.setItemid(itemID);
        dataDOKey.setItemcode(itemCode);
        dataProcessService.changeStatus(dataDOKey,dataStatus);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 关键字搜索
     * @param keyWord
     * @return
     */
    @GetMapping("/searchDataDO/{keyWord}")
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="关键字搜索",logLevel ="1",creater ="",updater = "")
    public ResponseData searchDataDO(@PathVariable("keyWord") String keyWord) {
        List<DataDO> dataDOList = dataProcessService.searchDataDO(keyWord);
        return new ResponseData(EmBusinessError.success,dataDOList);
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
