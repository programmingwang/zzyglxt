package com.zyyglxt.controller.dictDO;


import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.DictDO;
import com.zyyglxt.dataobject.DictDOKey;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IDictDOService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping("/dictdo")
public class DictDOController {

    @Resource
    private IDictDOService iDictDOService;

    /**
     * 查看数据字典
     */
    @RequestMapping(value = "/selectDictDO/{itemID}/{itemCode}",method = RequestMethod.GET)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="查看数据字典",logLevel ="1",creater ="",updater = "")
    public ResponseData selectByPrimaryKey(@PathVariable("itemID") Integer itemid, @PathVariable("itemCode") String itemCode){
        DictDOKey key = new DictDOKey();
        key.setItemcode(itemCode);
        key.setItemid(itemid);
        DictDO dictDO = iDictDOService.selectByPrimaryKey(key);
        return new ResponseData(EmBusinessError.success,dictDO);
    }

    /**
     * 删除数据字典
     */
    @RequestMapping(value = "/deleteDictDO/{itemID}/{itemCode}",method = RequestMethod.DELETE)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="删除数据字典",logLevel ="4",creater ="",updater = "")
    public ResponseData deleteByPrimaryKey(@PathVariable("itemID") Integer itemid, @PathVariable("itemCode") String itemCode){
        DictDOKey key = new DictDOKey();
        key.setItemcode(itemCode);
        key.setItemid(itemid);
        iDictDOService.deleteByPrimaryKey(key);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 增加数据字典
     */
    @RequestMapping(value = "/insertDictDO", method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="新增数据字典",logLevel ="3",creater ="",updater = "")
    public ResponseData insertSelective(@RequestBody DictDO record)  {
        iDictDOService.insertSelective(record);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 更新数据字典
     */
    @RequestMapping(value = "/updateDictDO", method = RequestMethod.PUT)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="更新数据字典",logLevel ="2",creater ="",updater = "")
    public ResponseData updateByPrimaryKeySelective(@RequestBody DictDO record)  {
        iDictDOService.updateByPrimaryKeySelective(record);
        return new ResponseData(EmBusinessError.success);
    }


}
