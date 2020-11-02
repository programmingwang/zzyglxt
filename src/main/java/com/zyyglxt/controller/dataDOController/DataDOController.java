package com.zyyglxt.controller.dataDOController;

import com.zyyglxt.dataobject.DataDO;
import com.zyyglxt.dataobject.DataDOKey;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IDataDOService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * @Author huangtao
 * @Date 2020/10/29 10:00
 * @Version 1.0
 */

@RestController
@RequestMapping("/datado")
public class DataDOController {

    @Resource
    IDataDOService dataDOService;

    /**
     *查看新闻数据记录
     * @param key
     * @return
     */
    @RequestMapping(value = "/selectByPrimaryKey/{itemID}", method = RequestMethod.GET)
    public ResponseData selectByPrimaryKey(@PathVariable("itemID") DataDOKey key){
        DataDO dataDO = dataDOService.selectNewsInf(key);
        return new ResponseData(EmBusinessError.success,dataDO);
    }

    /**
     * 查看相应类型的所有数据
     * @return
     */
    @RequestMapping(value = "/selectAllNewsInf/{dataType}", method = RequestMethod.GET)
    public ResponseData selectAllNewsInf(@PathVariable("dataType") String dataType){
        List<DataDO> dataDOList = dataDOService.selectAllNewsInf(dataType);
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
    public ResponseData insertNewsInf(@RequestBody DataDO record) throws BusinessException {
        dataDOService.insertNewsInf(record);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 更新新闻数据记录
     * @param record
     */
    @RequestMapping(value = "updateNewsInf", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseData updateNewsInf(@RequestBody DataDO record) throws BusinessException {
        dataDOService.updateNewsInf(record);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 关键字搜索
     * @param keyWord
     * @return
     */
    @GetMapping("searchDataDO")
    @ResponseBody
    public List<DataDO> searchDataDO(@RequestBody String keyWord) {
        return dataDOService.searchDataDO(keyWord);
    }

}
