package com.zyyglxt.controller.dataDOController;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.DataDO;
import com.zyyglxt.dataobject.DataDOKey;
import com.zyyglxt.dto.DataDto;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IDataNewsService;
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
@RequestMapping("/datado/newsInf")
public class DataNewsInfController {

    @Resource
    IDataNewsService dataDOService;

    @Resource
    private IFileService fileService;

    /**
     * 查看一条记录
     * @param itemID
     * @param itemCode
     * @return
     */
    @RequestMapping(value = "/selectByPrimaryKey/{itemID}/{itemCode}", method = RequestMethod.GET)
    public ResponseData selectByPrimaryKey(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        DataDOKey dataDOKey = new DataDOKey();
        dataDOKey.setItemid(itemID);
        dataDOKey.setItemcode(itemCode);
        DataDO data = dataDOService.selectNewsInf(dataDOKey);
        return new ResponseData(EmBusinessError.success, data);
    }

    private DataDto convertFromDOToDTO(DataDO dataDo,String filePath) {
        DataDto dataDto = new DataDto();
        BeanUtils.copyProperties(dataDo,dataDto);
        dataDto.setFilePath(filePath);
        return dataDto;
    }

    /**
     * 查看新闻轮播图的所有数据
     * @return
     */
    @RequestMapping(value = "/selectAllNewsRot", method = RequestMethod.GET)
    @LogAnnotation(appCode ="",logTitle ="查看所有新闻轮播图",logLevel ="1",creater ="",updater = "")
    public ResponseData selectNewsRotList(){
        List<DataDO> dataDOList = dataDOService.selectNewsRotList();
        List<DataDto> dataDtoList = new ArrayList<>();
        for (DataDO dataDO:dataDOList) {
            dataDtoList.add(
                    this.convertFromDOToDTO(
                            dataDO,fileService.selectFileByDataCode(
                                    dataDO.getItemcode()).getFilePath()));
        }
        return new ResponseData(EmBusinessError.success,dataDtoList);
    }

    /**
     * 查看新闻管理的所有数据
     * @return
     */
    @RequestMapping(value = "/selectAllNewsInf", method = RequestMethod.GET)
    @LogAnnotation(appCode ="",logTitle ="查看所有新闻信息",logLevel ="1",creater ="",updater = "")
    public ResponseData selectNewsInfList(){
        List<DataDO> dataDOList = dataDOService.selectNewsInfList();
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
    @RequestMapping(value = "changeStatus/{itemID}/{itemCode}", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseData changeStatus(@RequestParam("dataStatus") String dataStatus, @PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        DataDOKey dataDOKey = new DataDOKey();
        dataDOKey.setItemid(itemID);
        dataDOKey.setItemcode(itemCode);
        dataDOService.changeStatus(dataDOKey,dataStatus);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 关键字搜索
     * @param keyWord
     * @return
     */
    @GetMapping("/searchDataDO/{keyWord}")
    @ResponseBody
    public ResponseData searchDataDO(@PathVariable("keyWord") String keyWord) {
        List<DataDO> dataDOList = dataDOService.searchDataDO(keyWord);
        return new ResponseData(EmBusinessError.success,dataDOList);
    }

}
