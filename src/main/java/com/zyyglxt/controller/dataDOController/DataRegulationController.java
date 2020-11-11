package com.zyyglxt.controller.dataDOController;

import com.zyyglxt.dataobject.DataDO;
import com.zyyglxt.dataobject.DataDOKey;
import com.zyyglxt.dto.DataDto;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IDataNewsService;
import com.zyyglxt.service.IDataRegulationService;
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
@RequestMapping("/datado/regulation")
public class DataRegulationController {

    @Resource
    IDataRegulationService dataRegulationService;

    @Resource
    private IFileService fileService;

    /**
     * 查看一条政策法规
     * @param itemID
     * @param itemCode
     * @return
     */
    @RequestMapping(value = "/selectByPrimaryKey/{itemID}/{itemCode}", method = RequestMethod.GET)
    public ResponseData selectByPrimaryKey(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        DataDOKey dataDOKey = new DataDOKey();
        dataDOKey.setItemid(itemID);
        dataDOKey.setItemcode(itemCode);
        DataDO data = dataRegulationService.selectRegulation(dataDOKey);
        return new ResponseData(EmBusinessError.success, data);
    }

    private DataDto convertFromDOToDTO(DataDO dataDo, String filePath) {
        DataDto dataDto = new DataDto();
        BeanUtils.copyProperties(dataDo,dataDto);
        dataDto.setFilePath(filePath);
        return dataDto;
    }

    /**
     * 查看政策法规的所有数据
     * @return
     */
    @RequestMapping(value = "/selectAll", method = RequestMethod.GET)
    public ResponseData selectRegulationList(){
        List<DataDO> dataDOList = dataRegulationService.selectRegulationList();
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
     * 删除政策法规记录
     * @param itemID
     * @param itemCode
     */
    @RequestMapping(value = "/deleteByPrimaryKey/{itemID}/{itemCode}", method = RequestMethod.DELETE)
    public ResponseData deleteByPrimaryKey(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        DataDOKey dataDOKey = new DataDOKey();
        dataDOKey.setItemid(itemID);
        dataDOKey.setItemcode(itemCode);
        dataRegulationService.deleteRegulation(dataDOKey);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 增加政策法规记录
     * @param record
     */
    @RequestMapping(value = "/insertRegulation", method = RequestMethod.POST)
    @ResponseBody
    public ResponseData insertRegulation(@RequestBody DataDO record) {
        dataRegulationService.insertRegulation(record);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 更新政策法规记录
     * @param record
     */
    @RequestMapping(value = "updateRegulation", method = RequestMethod.POST)
    @ResponseBody
    public ResponseData updateRegulation(@RequestBody DataDO record) {
        dataRegulationService.updateRegulation(record);
        return new ResponseData(EmBusinessError.success);
    }

    //修改展示状态
    @RequestMapping(value = "changeStatus/{itemID}/{itemCode}", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseData changeStatus(@RequestParam("dataStatus") String dataStatus, @PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        DataDOKey dataDOKey = new DataDOKey();
        dataDOKey.setItemid(itemID);
        dataDOKey.setItemcode(itemCode);
        dataRegulationService.changeStatus(dataDOKey,dataStatus);
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
        List<DataDO> dataDOList = dataRegulationService.searchDataDO(keyWord);
        return new ResponseData(EmBusinessError.success,dataDOList);
    }

}
