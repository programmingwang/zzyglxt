package com.zyyglxt.controller.HealthCareChineseMedicineDOController;

import com.zyyglxt.common.Result;
import com.zyyglxt.dataobject.HealthCareChineseMedicineDO;
import com.zyyglxt.dataobject.HealthCareChineseMedicineDOKey;

import com.zyyglxt.service.HealthCareChineseMedicineDOService;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/10/28 22:45
 */
@RestController
                /*（控制器类实现数据交互）*/
public class HealthCareChineseMedicineDOController {
   @Resource
    HealthCareChineseMedicineDOService healthCareChineseMedicineDOService;
   /*
     中医药名称相关数据的插入
   */
   @RequestMapping(value ="inserthealthcarechinesemedicinedo",method = RequestMethod.POST )
   public Result insertHealthCareChineseMedicineDOMapper(@RequestBody HealthCareChineseMedicineDO key) {
       try {
           System.out.println("中医药名称: " + key.getChineseMedicineName());
           healthCareChineseMedicineDOService.insert(key);
       } catch (Exception e) {
           e.printStackTrace();
       }
       return Result.succ("添加数据成功");
   }
    /*
      中医药名称相关数据的删除
    */
    @RequestMapping(value ="deletehealthcarechinesemedicinedo",method = RequestMethod.POST )
    public Result deleteHealthCareChineseMedicineDOMapper(@RequestBody HealthCareChineseMedicineDOKey key){
        healthCareChineseMedicineDOService.deleteByPrimaryKey(key);
        System.out.println("要删除中医药编号为："+key.getItemid());
        return Result.succ("删除成功");
    }
    /*
     中医药名称相关数据的修改
   */
    @RequestMapping(value ="updatehealthcarechinesemedicinedo",method = RequestMethod.POST )
    public Result updateHealthCareChineseMedicineDOMapper(@RequestBody HealthCareChineseMedicineDO key){
            healthCareChineseMedicineDOService.updateByPrimaryKeySelective(key);
            System.out.println("要修改中医药编号为："+key.getItemid());
            return Result.succ("修改数据成功");
    }
    /*
     中医药名称相关数据的查询
   */
    @RequestMapping(value ="selecthealthcarechinesemedicinedo",method = RequestMethod.POST )
    public Result selectHealthCareChineseMedicineDOMapper(@RequestBody HealthCareChineseMedicineDOKey key){
        healthCareChineseMedicineDOService.selectByPrimaryKey(key);
        /*System.out.println("要修改中医药编号为："+key.getItemid());*/
        return Result.succ("查询数据成功");
    }
}

