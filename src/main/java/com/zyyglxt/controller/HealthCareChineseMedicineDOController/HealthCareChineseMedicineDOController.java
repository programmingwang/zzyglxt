package com.zyyglxt.controller.HealthCareChineseMedicineDOController;

import com.zyyglxt.common.Result;
import com.zyyglxt.dataobject.HealthCareChineseMedicineDO;
import com.zyyglxt.dataobject.HealthSciKnowDO;
import com.zyyglxt.dataobject.HealthSciKnowDOKey;
import com.zyyglxt.service.HealthCareChineseMedicineDOService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/10/28 22:45
 */
@RestController
public class HealthCareChineseMedicineDOController {
   @Resource
    HealthCareChineseMedicineDOService healthCareChineseMedicineDOService;
   /*
     科普知识名称相关数据的插入（控制器类实现数据交互）
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
    /*@RequestMapping(value ="deletehealthcarechinesemedicinedo",method = RequestMethod.POST )
    public Result deleteHealthCareChineseMedicineDOMapper(@RequestBody HealthSciKnowDOKey key){
       //HealthSciKnowDOKey hkd=new HealthSciKnowDOKey();
      // hkd.setItemid(3);
       //Integer id=hkd.getItemid();
       healthCareChineseMedicineDOService.deleteByPrimaryKey();
        return Result.succ("删除成功");
    }*/
    /*@RequestMapping(value ="updatehealthcarechinesemedicinedo",method = RequestMethod.POST )
    public Result updateHealthCareChineseMedicineDOMapper(@RequestBody HealthSciKnowDO key){
            healthCareChineseMedicineDOService.updateByPrimaryKey(key);
            return Result.succ("修改数据成功");
    }*/
}

