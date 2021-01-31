package com.zyyglxt.controller.HealthSciKnowDOController;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.HealthCareFamPreDOKey;
import com.zyyglxt.dataobject.HealthSciKnowDO;
import com.zyyglxt.dataobject.HealthSciKnowDOKey;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.HealthSciKnowDOService;
import com.zyyglxt.service.IFileService;
import io.swagger.annotations.Api;
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
@Api(tags="养生保健-科普知识")
@RestController
public class HealthSciKnowDOController {
    @Resource
     private HealthSciKnowDOService healthSciKnowDOService;

    /*
    科普知识相关数据插入
    */
    @RequestMapping(value = "inserthealthsciknowdo",method = RequestMethod.POST)
    @LogAnnotation(appCode ="",logTitle ="科普知识数据的添加",logLevel ="3",creater ="huangwj",updater = "huangwj")
    public ResponseData insertHealthSciKnowDOMapper(@RequestBody HealthSciKnowDO key)  {
            System.out.println("科普知识名称: " + key.getScienceKnowledgeName());
            healthSciKnowDOService.insertSelective(key);
            return new ResponseData(EmBusinessError.success);
    }
    /*
    科普知识相关数据的删除
    */
    @RequestMapping(value ="deletehealthsciknowdo/{itemID}/{itemCode}",method = RequestMethod.DELETE)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="删除科普知识数据",logLevel ="4",creater ="huangwj",updater = "huangwj")
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
    @LogAnnotation(appCode ="",logTitle ="修改科普知识数据",logLevel ="2",creater ="huangwj",updater = "huangwj")
    public ResponseData updateHealthSciKnowDOMapper(@RequestBody HealthSciKnowDO key)  {
        healthSciKnowDOService.updateByPrimaryKeySelective(key);
        System.out.println("要修改科普知识编号为："+key.getItemid());
        return new ResponseData(EmBusinessError.success);
    }
    /*
     科普知识相关数据的查询
   */
    @RequestMapping(value ="selecthealthsciknowdo",method = RequestMethod.POST )
    @LogAnnotation(appCode ="",logTitle ="通过id及编号查询科普知识数据",logLevel ="1",creater ="huangwj",updater = "huangwj")
    public ResponseData selectHealthSciKnowDOMapper(@RequestBody HealthSciKnowDOKey key){
        healthSciKnowDOService.selectByPrimaryKey(key);
        return new ResponseData(EmBusinessError.success);
    }
    /*查询所有科普知识所有数据*/
    @RequestMapping(value ="selectallhealthsciknowdo",method = RequestMethod.GET)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="查询所有科普知识数据",logLevel ="1",creater ="huangwj",updater = "huangwj")
    public ResponseData selectAllHealthSciKnowDOMapper(@RequestParam(value = "scienceKnowledgeStatus")List scienceKnowledgeStatus){
        List<HealthSciKnowDO> healthSciKnowDOSList = healthSciKnowDOService.selectAllHealthSciKnow(scienceKnowledgeStatus);
        return new ResponseData(EmBusinessError.success,healthSciKnowDOSList);
    }

    /*科普知识数据状态*/
    @RequestMapping(value = "/changestatustosciknow/{itemID}/{itemCode}" , method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(logTitle = "修改科普知识数据状态", logLevel = "2")
    public ResponseData changeStatusToSciKnow(@RequestParam("scienceKnowledgeStatus") String scienceKnowledgeStatus , @PathVariable("itemID") Integer itemID , @PathVariable("itemCode")String itemCode){
        HealthSciKnowDOKey healthCareFamPreDOKey=new HealthSciKnowDOKey();
        healthCareFamPreDOKey.setItemid(itemID);
        healthCareFamPreDOKey.setItemcode(itemCode);
        healthSciKnowDOService.changeStatusToSciKnow(healthCareFamPreDOKey,scienceKnowledgeStatus);
        return new ResponseData(EmBusinessError.success);
    }
    /**
     * 增加点击数
     * @param key
     */
    @RequestMapping(value = "visitnumhealthSciKnowdo", method = RequestMethod.POST)
    @LogAnnotation(appCode ="",logTitle ="科普知识数据的点击浏览数",logLevel ="2",creater ="huangwj",updater = "huangwj")
    public void increaseVisitNum(@RequestBody HealthSciKnowDOKey key) {
       healthSciKnowDOService.updateVisitNumHealthSciKnow(key);
    }

}

