package com.zyyglxt.controller.HealthSciKnowDOController;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.HealthSciKnowDO;
import com.zyyglxt.dataobject.HealthSciKnowDOKey;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.HealthSciKnowDOService;
import com.zyyglxt.service.IFileService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/10/30 15:30
 */
@RestController
public class HealthSciKnowDOController {
    @Resource
     private HealthSciKnowDOService healthSciKnowDOService;

    @Resource
    private IFileService iFileService;
    /*
    科普知识相关数据插入
    */
    @RequestMapping(value = "inserthealthsciknowdo",method = RequestMethod.POST)
    @LogAnnotation(appCode ="",logTitle ="科普知识数据的添加",logLevel ="3",creater ="",updater = "")
    public ResponseData insertHealthSciKnowDOMapper(@RequestBody HealthSciKnowDO key) throws BusinessException {
            System.out.println("科普知识名称: " + key.getScienceKnowledgeName());
            healthSciKnowDOService.insertSelective(key);
            return new ResponseData(EmBusinessError.success);
    }
    /*
    科普知识相关数据的删除
    */
    @RequestMapping(value ="deletehealthsciknowdo/{itemID}/{itemCode}",method = RequestMethod.DELETE)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="删除科普知识数据",logLevel ="4",creater ="",updater = "")
    public ResponseData deleteHealthSciKnowDOMapper(@PathVariable("itemID") Integer itemID,@PathVariable("itemCode")String itemCode){
        HealthSciKnowDOKey healthSciKnowDOKey=new HealthSciKnowDOKey();
        healthSciKnowDOKey.setItemid(itemID);
        healthSciKnowDOKey.setItemcode(itemCode);
        healthSciKnowDOService.deleteByPrimaryKey(healthSciKnowDOKey);
        System.out.println("要删除科普知识编号为："+healthSciKnowDOKey.getItemid());
        return new ResponseData(EmBusinessError.success);
    }
    /*
    科普知识相关数据的修改
    */
    @RequestMapping(value ="updatehealthsciknowdo",method = RequestMethod.POST )
    @LogAnnotation(appCode ="",logTitle ="修改科普知识数据",logLevel ="2",creater ="",updater = "")
    public ResponseData updateHealthSciKnowDOMapper(@RequestBody HealthSciKnowDO key) throws BusinessException {
        healthSciKnowDOService.updateByPrimaryKeySelective(key);
        System.out.println("要修改科普知识编号为："+key.getItemid());
        return new ResponseData(EmBusinessError.success);
    }
    /*
     科普知识相关数据的查询
   */
    @RequestMapping(value ="selecthealthsciknowdo",method = RequestMethod.POST )
    @LogAnnotation(appCode ="",logTitle ="通过id及编号查询科普知识数据",logLevel ="1",creater ="",updater = "")
    public ResponseData selectHealthSciKnowDOMapper(@RequestBody HealthSciKnowDOKey key){
        healthSciKnowDOService.selectByPrimaryKey(key);
        return new ResponseData(EmBusinessError.success);
    }
    /*查询所有科普知识所有数据*/
    @RequestMapping(value ="selectallhealthsciknowdo",method = RequestMethod.GET)
    @LogAnnotation(appCode ="",logTitle ="查询所有科普知识数据",logLevel ="1",creater ="",updater = "")
    public ResponseData selectAllHealthSciKnowDOMapper(){
        List<HealthSciKnowDO> healthSciKnowDOSList = healthSciKnowDOService.selectAllHealthSciKnow();
        return new ResponseData(EmBusinessError.success,healthSciKnowDOSList);
    }
    /**
     * 增加点击数
     * @param key
     */
    @RequestMapping(value = "visitnumhealthSciKnowdo", method = RequestMethod.POST)
    @LogAnnotation(appCode ="",logTitle ="科普知识数据的点击浏览数",logLevel ="2",creater ="",updater = "")
    public void increaseVisitNum(@RequestBody HealthSciKnowDOKey key) {
       healthSciKnowDOService.updateVisitNumHealthSciKnow(key);
    }

}

