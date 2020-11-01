package com.zyyglxt.controller.HealthCareFamPreDOController;

import com.zyyglxt.common.Result;
import com.zyyglxt.dataobject.HealthCareFamPreDO;
import com.zyyglxt.dataobject.HealthCareFamPreDOKey;
import com.zyyglxt.service.HealthCareFamPreDOService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/10/30 15:11
 */
@RestController
public class HealthCareFamPreDOController {
    @Resource
    HealthCareFamPreDOService healthCareFamPreDOService;
    /*
     历史名方、国医话健康相关数据插入
   */
    @RequestMapping(value ="inserthealthcarefampredo",method = RequestMethod.POST )
    public Result insertHealthCareFamPreDOMapper(@RequestBody HealthCareFamPreDO key) {
        try {
            System.out.println("标题名称: " + key.getName());
            healthCareFamPreDOService.insertSelective(key);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Result.succ("添加数据成功");
    }
    /*
      历史名方、国医话健康相关数据的删除
    */
    @RequestMapping(value ="deletehealthcarefampredo",method = RequestMethod.POST )
    public Result deleteHealthCareFamPreDOMapper(@RequestBody HealthCareFamPreDOKey key){
       healthCareFamPreDOService.deleteByPrimaryKey(key);
        return Result.succ("删除成功");
    }
    /*
     历史名方、国医话健康相关数据的修改
   */
    @RequestMapping(value ="updatehealthcarefampredo",method = RequestMethod.POST )
    public Result updateHealthCareFamPreDOMapper(@RequestBody HealthCareFamPreDO key){
      healthCareFamPreDOService.updateByPrimaryKeySelective(key);
        System.out.println("要修改标题名称编号为："+key.getItemid());
        return Result.succ("修改数据成功");
    }
    /*
     历史名方、国医话健康相关数据的查询
   */
    @RequestMapping(value ="selecthealthcarefampredo",method = RequestMethod.POST )
    public Result selectHealthCareFamPreDOMapper(@RequestBody HealthCareFamPreDOKey key){
       healthCareFamPreDOService.selectByPrimaryKey(key);
        return Result.succ( healthCareFamPreDOService.selectByPrimaryKey(key));
    }
    /*查询所有国医话健康所有数据*/
    @RequestMapping(value ="selectallhealthcarefampredo",method = RequestMethod.POST )
    public List<HealthCareFamPreDO> selectAllHealthCareFamPreDOMapper(){
        return healthCareFamPreDOService.selectAllHealthCareFamPre();
    }
}
