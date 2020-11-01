package com.zyyglxt.controller.HealthSciKnowDOController;

import com.zyyglxt.common.Result;
import com.zyyglxt.dataobject.HealthSciKnowDO;
import com.zyyglxt.dataobject.HealthSciKnowDOKey;
import com.zyyglxt.service.HealthSciKnowDOService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/10/30 15:30
 */
@RestController
public class HealthSciKnowDOController {
    @Resource
    HealthSciKnowDOService healthSciKnowDOService;
    /*
    科普知识相关数据插入
    */
    @RequestMapping(value = "inserthealthsciknowdo",method = RequestMethod.POST)
    public Result insertHealthSciKnowDOMapper(@RequestBody HealthSciKnowDO key){
        try {
            System.out.println("科普知识名称: " + key.getScienceKnowledgeName());
            healthSciKnowDOService.insertSelective(key);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Result.succ("添加数据成功");
    }
    /*
    科普知识相关数据的删除
    */
    @RequestMapping(value ="deletehealthsciknowdo",method = RequestMethod.POST )
    public Result deleteHealthSciKnowDOMapper(@RequestBody HealthSciKnowDOKey key){
        healthSciKnowDOService.deleteByPrimaryKey(key);
        System.out.println("要删除科普知识编号为："+key.getItemid());
        return Result.succ("删除成功");
    }
    /*
    科普知识相关数据的修改
    */
    @RequestMapping(value ="updatehealthsciknowdo",method = RequestMethod.POST )
    public Result updateHealthCareChineseMedicineDOMapper(@RequestBody HealthSciKnowDO key){
        healthSciKnowDOService.updateByPrimaryKeySelective(key);
        System.out.println("要修改科普知识编号为："+key.getItemid());
        return Result.succ("修改数据成功");
    }
    /*
     中医药名称相关数据的查询
   */
    @RequestMapping(value ="selecthealthsciknowdo",method = RequestMethod.POST )
    public Result selectHealthCareChineseMedicineDOMapper(@RequestBody HealthSciKnowDOKey key){
        healthSciKnowDOService.selectByPrimaryKey(key);
        return Result.succ( healthSciKnowDOService.selectByPrimaryKey(key));
    }
}
