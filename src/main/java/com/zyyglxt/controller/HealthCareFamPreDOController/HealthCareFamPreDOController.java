package com.zyyglxt.controller.HealthCareFamPreDOController;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.FamPreDOKey;
import com.zyyglxt.dataobject.FileDO;
import com.zyyglxt.dataobject.HealthCareFamPreDO;
import com.zyyglxt.dataobject.HealthCareFamPreDOKey;
import com.zyyglxt.dto.HealthCareFamPreDto;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.HealthCareFamPreDOService;
import com.zyyglxt.service.IFileService;
import com.zyyglxt.util.ConvertDOToCareFamPre;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/10/30 15:11
 */
@Api(tags="养生保健-国医话健康")
@RestController
public class
HealthCareFamPreDOController {
    @Resource
     private HealthCareFamPreDOService healthCareFamPreDOService;

    @Resource
    private IFileService iFileService;
    /*
     国医话健康相关数据插入
   */
    @RequestMapping(value ="inserthealthcarefampredo",method = RequestMethod.POST )
    @LogAnnotation(appCode ="",logTitle ="国医话健康数据的添加",logLevel ="3",creater ="huangwj",updater = "huangwj")
    public ResponseData insertHealthCareFamPreDOMapper(@RequestBody HealthCareFamPreDO key)  {

        System.out.println("国医话健康标题名称: " + key.getName());
        healthCareFamPreDOService.insertSelective(key);
        return new ResponseData(EmBusinessError.success);
    }
    /*
      国医话健康相关数据的删除
    */
    @RequestMapping(value ="deletehealthcarefampredo/{itemID}/{itemCode}",method = RequestMethod.DELETE )
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="删除国医话健康数据",logLevel ="4",creater ="huangwj",updater = "huangwj")
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
    @LogAnnotation(appCode ="",logTitle ="国医话健康数据的修改",logLevel ="2",creater ="huangwj",updater = "huangwj")
    public ResponseData updateHealthCareFamPreDOMapper(@RequestBody HealthCareFamPreDO key)  {
      healthCareFamPreDOService.updateByPrimaryKeySelective(key);
        System.out.println("要修改标题名称编号为："+key.getItemid());
        return new ResponseData(EmBusinessError.success);
    }
    /*
     国医话健康相关数据的查询
   */
    @RequestMapping(value ="selecthealthcarefampredo",method = RequestMethod.POST )
    @LogAnnotation(appCode ="",logTitle ="通过id及编号查询国医话健康数据",logLevel ="1",creater ="huangwj",updater = "huangwj")
    public ResponseData selectHealthCareFamPreDOMapper(@RequestBody HealthCareFamPreDOKey key){
       healthCareFamPreDOService.selectByPrimaryKey(key);
        return new ResponseData(EmBusinessError.success);
    }
    /*查询所有国医话健康所有数据*/
    @RequestMapping(value ="selectallhealthcarefampredo",method = RequestMethod.GET )
    @LogAnnotation(appCode ="",logTitle ="查询所有国医话健康数据",logLevel ="1",creater ="huangwj",updater = "huangwj")
    /*public ResponseData selectAllHealthCareFamPreDOMapper(){
        List<HealthCareFamPreDO> healthCareFamPreDOSList = healthCareFamPreDOService.selectAllHealthCareFamPre();
        return new ResponseData(EmBusinessError.success,healthCareFamPreDOSList);
    }*/
    public ResponseData selectAllHealthCareFamPreDOMapper(@RequestParam(value = "status")List status){
        List<HealthCareFamPreDO> healthCareFamPreDOSList = healthCareFamPreDOService.selectAllHealthCareFamPre(status);
        List<HealthCareFamPreDto> healthCareFamPreDtoList = new ArrayList<>();
        for (HealthCareFamPreDO healthCareFamPreDO : healthCareFamPreDOSList) {
            FileDO fileDO = iFileService.selectFileByDataCode(healthCareFamPreDO.getItemcode());
            healthCareFamPreDtoList.add(
                    ConvertDOToCareFamPre.convertFromCareFamPre(
                            healthCareFamPreDO,fileDO.getFilePath(),fileDO.getFileName()));
        }
        return new ResponseData(EmBusinessError.success,healthCareFamPreDtoList);
    }

    /*国医话健康数据状态*/
    @RequestMapping(value = "changestatustocarefam/{itemID}/{itemCode}" , method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(logTitle = "修改国医话健康数据状态", logLevel = "2")
    public ResponseData changeStatusToCareFam(@RequestParam("status") String status , @PathVariable("itemID") Integer itemID , @PathVariable("itemCode")String itemCode){
       HealthCareFamPreDOKey healthCareFamPreDOKey=new HealthCareFamPreDOKey();
        healthCareFamPreDOKey.setItemid(itemID);
        healthCareFamPreDOKey.setItemcode(itemCode);
        healthCareFamPreDOService.changeStatusToCareFam(healthCareFamPreDOKey,status);
        return new ResponseData(EmBusinessError.success);
    }
    /**
     * 增加点击数
     * @param key
     */
    @RequestMapping(value = "visitnumhealthcarefampredo", method = RequestMethod.POST)
    @LogAnnotation(appCode ="",logTitle ="国医话健康点击浏览数",logLevel ="2",creater ="huangwj",updater = "huangwj")
    public void increaseVisitNum(@RequestBody HealthCareFamPreDOKey key) {
        healthCareFamPreDOService.updateVisitNumHealthCareFamPre(key);
    }
}

