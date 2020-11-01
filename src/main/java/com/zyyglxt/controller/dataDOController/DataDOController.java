package com.zyyglxt.controller.dataDOController;

import com.zyyglxt.dataobject.DataDO;
import com.zyyglxt.dataobject.DataDOKey;
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
    @RequestMapping(value = "/selectByPrimaryKey", method = RequestMethod.GET)
    public DataDO selectByPrimaryKey(DataDOKey key){
        return dataDOService.selectNewsInf(key);
    }

    /**
     * 查看所有数据
     * @return
     */
    @RequestMapping(value = "/selectAllNewsInf/{dataType}", method = RequestMethod.GET)
    public List<DataDO> selectAllNewsInf(@PathVariable("dataType") String dataType){
        return dataDOService.selectAllNewsInf(dataType);
    }

    /**
     * 删除新闻数据记录
     * @param itemID
     * @param itemCode
     */
    @RequestMapping(value = "/deleteByPrimaryKey/{itemID}/{itemCode}", method = RequestMethod.DELETE)
    public int deleteByPrimaryKey(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        DataDOKey dataDOKey = new DataDOKey();
        dataDOKey.setItemid(itemID);
        dataDOKey.setItemcode(itemCode);
        return dataDOService.deleteNewsInf(dataDOKey);
    }

    /**
     * 增加新闻数据记录
     * @param record
     */
    @RequestMapping(value = "/insertNewsInf", method = RequestMethod.POST)
    public int insertNewsInf(DataDO record){
        record.setDataType("新闻管理");
        record.setDataStatus("待上架");
        return dataDOService.insertNewsInf(record);
    }

    /**
     * 更新新闻数据记录
     * @param record
     */
    @RequestMapping(value = "/updateNewsInf", method = RequestMethod.PUT)
    public int updateNewsInf(DataDO record){
        return dataDOService.updateNewsInf(record);
    }

    /**
     * 关键字搜索
     * @param keyWord
     * @return
     */
    @GetMapping("searchDataDO")
    public List<DataDO> searchDataDO(@RequestBody String keyWord) {
        return dataDOService.searchDataDO(keyWord);
    }

}
