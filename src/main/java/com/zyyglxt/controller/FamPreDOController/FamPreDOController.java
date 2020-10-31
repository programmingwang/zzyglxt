package com.zyyglxt.controller.FamPreDOController;

import com.zyyglxt.common.Result;
import com.zyyglxt.dataobject.FamPreDO;
import com.zyyglxt.dataobject.FamPreDOKey;
import com.zyyglxt.service.FamPreDOService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/10/31 12:22
 */
@RestController
public class FamPreDOController {
    /*
          历史名方控制器类
    */
    @Resource
    FamPreDOService famPreDOService;
  /*历史名方数据添加*/
  @RequestMapping(value = "insertfampredo",method = RequestMethod.POST)
    public Result insertFamPreDOMapper(@RequestBody FamPreDO key){
      try {
          System.out.println("历史名方名称: " + key.getName());
          famPreDOService.insertSelective(key);
          return Result.succ(key);
      } catch (Exception e) {
          e.printStackTrace();
          return Result.fail("添加数据失败");
      }
  }
  /*历史名方数据删除*/
    @RequestMapping(value ="deletefamprerdo",method = RequestMethod.POST )
    public Result deleteFamPreDOMapper(@RequestBody FamPreDOKey key){
        famPreDOService.deleteByPrimaryKey(key);
        System.out.println("要删除历史名方编号为："+key.getItemid());
        return Result.succ("删除成功");
    }
    /*历史名方数据修改*/
    @RequestMapping(value ="updatefampredo",method = RequestMethod.POST )
    public Result updateFamPreDOMapper(@RequestBody FamPreDO key){
        famPreDOService.updateByPrimaryKeySelective(key);
        System.out.println("要修改历史名方编号为："+key.getItemid());
        return Result.succ("修改数据成功");
    }
    /*历史名方数据查询*/
    @RequestMapping(value ="selectfampredo",method = RequestMethod.POST )
    public Result selectFamPreDOMapper(@RequestBody FamPreDOKey key){
        famPreDOService.selectByPrimaryKey(key);
        return Result.succ( famPreDOService.selectByPrimaryKey(key));
    }
}
