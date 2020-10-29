package com.zyyglxt.controller.dataDO;

import com.zyyglxt.dao.DataDOMapper;
import com.zyyglxt.dataobject.DataDO;
import com.zyyglxt.dataobject.DataDOKey;
import com.zyyglxt.service.IDataDOService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

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
    @GetMapping("selectByPrimaryKey")
    public DataDO selectByPrimaryKey(DataDOKey key){
        return dataDOService.selectByPrimaryKey(key);
    }

    /**
     * 删除新闻数据记录
     * @param key
     */
    @ResponseBody
    @DeleteMapping("deleteByPrimaryKey")
    public void deleteByPrimaryKey(@RequestBody DataDOKey key){
        dataDOService.deleteByPrimaryKey(key);
    }

    /**
     * 增加新闻数据记录
     * @param record
     */
    @ResponseBody
    @PostMapping("insertSelective")
    public void insertSelective(@RequestBody DataDO record){
        dataDOService.insertSelective(record);
    }

    /**
     * 更新新闻数据记录
     * @param record
     */
    @ResponseBody
    @PutMapping("updateByPrimaryKeySelective")
    public void updateByPrimaryKeySelective(@RequestBody DataDO record){
        dataDOService.updateByPrimaryKeySelective(record);
    }

}
