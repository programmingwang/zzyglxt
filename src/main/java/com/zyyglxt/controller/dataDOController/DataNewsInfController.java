package com.zyyglxt.controller.dataDOController;

import com.zyyglxt.dataobject.DataDO;
import com.zyyglxt.dataobject.DataDOKey;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IDataNewsService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
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

    /**
     * 查看新闻管理的所有数据
     * @return
     */
    @RequestMapping(value = "/selectAll", method = RequestMethod.GET)
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
    public ResponseData insertNewsInf(@RequestBody DataDO record) {
        dataDOService.insertNewsInf(record);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 更新新闻数据记录
     * @param record
     */
    @RequestMapping(value = "updateNewsInf", method = RequestMethod.PUT)
    @ResponseBody
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
