package com.zyyglxt.controller.HealthCareFamPreDOController;

import com.zyyglxt.dataobject.HealthCareFamPreDO;
import com.zyyglxt.dataobject.HealthCareFamPreDOKey;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.HealthCareFamPreDOService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/10/30 15:11
 */
@RestController
public class
HealthCareFamPreDOController {
    @Resource
     private HealthCareFamPreDOService healthCareFamPreDOService;
    /*
     国医话健康相关数据插入
   */
    @RequestMapping(value ="inserthealthcarefampredo",method = RequestMethod.POST )
    public ResponseData insertHealthCareFamPreDOMapper(@RequestBody HealthCareFamPreDO key) throws BusinessException {

        System.out.println("国医话健康标题名称: " + key.getName());
        healthCareFamPreDOService.insertSelective(key);
        return new ResponseData(EmBusinessError.success);
    }
    /*
      国医话健康相关数据的删除
    */
    @RequestMapping(value ="deletehealthcarefampredo/{itemID}/{itemCode}",method = RequestMethod.DELETE )
    @ResponseBody
    public ResponseData deleteHealthCareFamPreDOMapper(@PathVariable("itemID")Integer itemID,@PathVariable("itemCode")String itemCode){
        HealthCareFamPreDOKey healthCareFamPreDOKey=new HealthCareFamPreDOKey();
        healthCareFamPreDOKey.setItemid(itemID);
        healthCareFamPreDOKey.setItemcode(itemCode);
        healthCareFamPreDOService.deleteByPrimaryKey(healthCareFamPreDOKey);
        return new ResponseData(EmBusinessError.success);
    }
    /*
     国医话健康相关数据的修改
   */
    @RequestMapping(value ="updatehealthcarefampredo",method = RequestMethod.POST )
    public ResponseData updateHealthCareFamPreDOMapper(@RequestBody HealthCareFamPreDO key) throws BusinessException {
      healthCareFamPreDOService.updateByPrimaryKeySelective(key);
        System.out.println("要修改标题名称编号为："+key.getItemid());
        return new ResponseData(EmBusinessError.success);
    }
    /*
     国医话健康相关数据的查询
   */
    @RequestMapping(value ="selecthealthcarefampredo",method = RequestMethod.POST )
    public ResponseData selectHealthCareFamPreDOMapper(@RequestBody HealthCareFamPreDOKey key){
       healthCareFamPreDOService.selectByPrimaryKey(key);
        return new ResponseData(EmBusinessError.success);
    }
    /*查询所有国医话健康所有数据*/
    @RequestMapping(value ="selectallhealthcarefampredo",method = RequestMethod.GET )
    /*public List<HealthCareFamPreDO> selectAllHealthCareFamPreDOMapper(){
        return healthCareFamPreDOService.selectAllHealthCareFamPre();
    }*/
    public ResponseData selectAllHealthCareFamPreDOMapper(){
        List<HealthCareFamPreDO> healthCareFamPreDOSList = healthCareFamPreDOService.selectAllHealthCareFamPre();
        return new ResponseData(EmBusinessError.success,healthCareFamPreDOSList);
    }
    /**
     * 增加点击数
     * @param key
     */
    @RequestMapping(value = "visitnumhealthcarefampredo", method = RequestMethod.POST)
    public void increaseVisitNum(@RequestBody HealthCareFamPreDOKey key) {
        healthCareFamPreDOService.updateVisitNumHealthCareFamPre(key);
    }
}

