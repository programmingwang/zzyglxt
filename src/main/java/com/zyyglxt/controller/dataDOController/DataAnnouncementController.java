package com.zyyglxt.controller.dataDOController;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.DataDO;
import com.zyyglxt.dataobject.DataDOKey;
import com.zyyglxt.dto.DataDto;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IDataAnnouncementService;
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
@RequestMapping("/datado/announcement")
public class DataAnnouncementController {

    @Resource
    IDataAnnouncementService dataAnnouncementService;

    @Resource
    private IFileService fileService;

    /**
     * 查看一条通知公告
     * @param itemID
     * @param itemCode
     * @return
     */
    @RequestMapping(value = "/selectByPrimaryKey/{itemID}/{itemCode}", method = RequestMethod.GET)
    @LogAnnotation(appCode ="",logTitle ="查看一条通知公告",logLevel ="1",creater ="",updater = "")
    public ResponseData selectByPrimaryKey(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        DataDOKey dataDOKey = new DataDOKey();
        dataDOKey.setItemid(itemID);
        dataDOKey.setItemcode(itemCode);
        DataDO data = dataAnnouncementService.selectAnnouncement(dataDOKey);
        return new ResponseData(EmBusinessError.success, data);
    }

    private DataDto convertFromDOToDTO(DataDO dataDo, String filePath) {
        DataDto dataDto = new DataDto();
        BeanUtils.copyProperties(dataDo,dataDto);
        dataDto.setFilePath(filePath);
        return dataDto;
    }

    /**
     * 查看通知公告的所有数据
     * @return
     */
    @RequestMapping(value = "/selectAll", method = RequestMethod.GET)
    @LogAnnotation(appCode ="",logTitle ="查看所有通知公告",logLevel ="1",creater ="",updater = "")
    public ResponseData selectAnnouncementList(){
        List<DataDO> dataDOList = dataAnnouncementService.selectAnnouncementList();
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
     * 删除通知公告记录
     * @param itemID
     * @param itemCode
     */
    @RequestMapping(value = "/deleteByPrimaryKey/{itemID}/{itemCode}", method = RequestMethod.DELETE)
    @LogAnnotation(appCode ="",logTitle ="删除通知公告",logLevel ="4",creater ="",updater = "")
    public ResponseData deleteByPrimaryKey(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        DataDOKey dataDOKey = new DataDOKey();
        dataDOKey.setItemid(itemID);
        dataDOKey.setItemcode(itemCode);
        dataAnnouncementService.deleteAnnouncement(dataDOKey);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 增加通知公告记录
     * @param record
     */
    @RequestMapping(value = "/insertAnn", method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="增加通知公告",logLevel ="3",creater ="",updater = "")
    public ResponseData insertNewsInf(@RequestBody DataDO record) {
        dataAnnouncementService.insertAnnouncement(record);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 更新通知公告记录
     * @param record
     */
    @RequestMapping(value = "updateAnn", method = RequestMethod.PUT)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="更新公告通知",logLevel ="2",creater ="",updater = "")
    public ResponseData updateAnnouncement(@RequestBody DataDO record) {
        dataAnnouncementService.updateAnnouncement(record);
        return new ResponseData(EmBusinessError.success);
    }

    //修改展示状态
    @RequestMapping(value = "changeStatus/{itemID}/{itemCode}", method = RequestMethod.PUT)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="修改展示状态",logLevel ="2",creater ="",updater = "")
    public ResponseData changeStatus(@RequestParam("dataStatus") String dataStatus, @PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        DataDOKey dataDOKey = new DataDOKey();
        dataDOKey.setItemid(itemID);
        dataDOKey.setItemcode(itemCode);
        dataAnnouncementService.changeStatus(dataDOKey,dataStatus);
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
        List<DataDO> dataDOList = dataAnnouncementService.searchDataDO(keyWord);
        return new ResponseData(EmBusinessError.success,dataDOList);
    }

}
