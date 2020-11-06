package com.zyyglxt.controller.dictitemDO;


import com.zyyglxt.dataobject.DictitemDO;
import com.zyyglxt.dataobject.DictitemDOKey;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IDictitemDOService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping("/dictitemdo")
public class DictitemDOController {

    @Resource
    private IDictitemDOService iDictitemDOService;

    /**
     * 查看数据字典项
     */
    @RequestMapping(value = "/selectDictitemDO/{itemID}/{itemCode}",method = RequestMethod.GET)
    @ResponseBody
    public ResponseData selectByPrimaryKey(@PathVariable("itemID") Integer itemid, @PathVariable("itemCode") String itemCode){
        DictitemDOKey key = new DictitemDOKey();
        key.setItemcode(itemCode);
        key.setItemid(itemid);
        DictitemDO dictitemDO = iDictitemDOService.selectByPrimaryKey(key);
        return new ResponseData(EmBusinessError.success,dictitemDO);
    }

    /**
     * 删除数据字典项
     */
    @RequestMapping(value = "/deleteDictitemDO/{itemID}/{itemCode}",method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseData deleteByPrimaryKey(@PathVariable("itemID") Integer itemid, @PathVariable("itemCode") String itemCode){
        DictitemDOKey key = new DictitemDOKey();
        key.setItemcode(itemCode);
        key.setItemid(itemid);
        iDictitemDOService.deleteByPrimaryKey(key);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 增加数据字典项
     */
    @RequestMapping(value = "/insertDictDO", method = RequestMethod.POST)
    @ResponseBody
    public ResponseData insertSelective(@RequestBody DictitemDO record) throws BusinessException {
        iDictitemDOService.insertSelective(record);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 更新数据字典项
     */
    @RequestMapping(value = "updateDictitemDO", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseData updateByPrimaryKeySelective(@RequestBody DictitemDO record) throws BusinessException {
        iDictitemDOService.updateByPrimaryKeySelective(record);
        return new ResponseData(EmBusinessError.success);
    }
}
