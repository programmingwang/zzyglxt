package com.zyyglxt.controller.HealthCareChineseMedicineDOController;

import com.zyyglxt.dataobject.HealthCareChineseMedicineDO;
import com.zyyglxt.dataobject.HealthCareChineseMedicineDOKey;

import com.zyyglxt.dto.HealthCareChineseMedicineDto;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.HealthCareChineseMedicineDOService;
import com.zyyglxt.service.IFileService;
import org.springframework.beans.BeanUtils;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/10/28 22:45
 */
@RestController
                /*（控制器类实现数据交互）*/
public class HealthCareChineseMedicineDOController {
   @Resource
   private HealthCareChineseMedicineDOService healthCareChineseMedicineDOService;

   @Resource
   private IFileService iFileService;
   /*
     中医药名称相关数据插入
   */
   @RequestMapping(value ="inserthealthcarechinesemedicinedo",method = RequestMethod.POST )
   public ResponseData insertHealthCareChineseMedicineDOMapper(@RequestBody HealthCareChineseMedicineDO key) throws BusinessException {

           System.out.println("中医药名称: " + key.getChineseMedicineName());
           healthCareChineseMedicineDOService.insert(key);
           return new ResponseData(EmBusinessError.success);
   }
    /*
      中医药名称相关数据的删除
    */
    @RequestMapping(value ="deletehealthcarechinesemedicinedo",method = RequestMethod.POST )
    public ResponseData deleteHealthCareChineseMedicineDOMapper(@RequestBody HealthCareChineseMedicineDOKey key){
        healthCareChineseMedicineDOService.deleteByPrimaryKey(key);
        System.out.println("要删除中医药编号为："+key.getItemid());
        return new ResponseData(EmBusinessError.success);
    }
    /*
     中医药名称相关数据的修改
   */
    @RequestMapping(value ="updatehealthcarechinesemedicinedo",method = RequestMethod.POST )
    public ResponseData updateHealthCareChineseMedicineDOMapper(@RequestBody HealthCareChineseMedicineDO key) throws BusinessException {
            healthCareChineseMedicineDOService.updateByPrimaryKeySelective(key);
            System.out.println("要修改中医药编号为："+key.getItemid());
            return new ResponseData(EmBusinessError.success);
    }
    /*
     中医药名称相关数据的查询(通过id和编号)
   */
    @RequestMapping(value ="selecthealthcarechinesemedicinedo",method = RequestMethod.POST )
    public ResponseData selectHealthCareChineseMedicineDOMapper(@RequestBody HealthCareChineseMedicineDOKey key){
        healthCareChineseMedicineDOService.selectByPrimaryKey(key);
        return new ResponseData(EmBusinessError.success);
    }
    /*中医药常识数据所有查询*/
    @RequestMapping(value ="selectallhealthcarechinesemedicinedo",method = RequestMethod.GET )
    /*public List<HealthCareChineseMedicineDO> selectAllHealthCareChineseMedicineDOMapper(){
        return healthCareChineseMedicineDOService.selectAllHealthCareChineseMedicine();
    }*/
    public ResponseData selectAllHealthCareChineseMedicineDOMapper(){
        List<HealthCareChineseMedicineDO> healthCareChineseMedicineDOSList = healthCareChineseMedicineDOService.selectAllHealthCareChineseMedicine();
        List<HealthCareChineseMedicineDto> healthCareChineseMedicineDtoList = new ArrayList<>();
        for (HealthCareChineseMedicineDO healthCareChineseMedicineDO : healthCareChineseMedicineDOSList) {
            healthCareChineseMedicineDtoList.add(
                    this.convertDtoFromDo(
                            healthCareChineseMedicineDO,iFileService.selectFileByDataCode(
                                    healthCareChineseMedicineDO.getItemcode()).getFilePath()));
        }
        return new ResponseData(EmBusinessError.success,healthCareChineseMedicineDtoList);
    }

    private HealthCareChineseMedicineDto convertDtoFromDo(HealthCareChineseMedicineDO healthCareChineseMedicineDO, String filePath){
        HealthCareChineseMedicineDto healthCareChineseMedicineDto = new HealthCareChineseMedicineDto();
        BeanUtils.copyProperties(healthCareChineseMedicineDO,healthCareChineseMedicineDto);
        healthCareChineseMedicineDto.setFilePath(filePath);
        return healthCareChineseMedicineDto;
    }
}

