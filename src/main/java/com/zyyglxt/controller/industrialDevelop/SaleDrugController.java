package com.zyyglxt.controller.industrialDevelop;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.HealthCareChineseMedicineDO;
import com.zyyglxt.dataobject.IndustrialDevelopSaleDrug;
import com.zyyglxt.dto.HealthCareChineseMedicineDto;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IFileService;
import com.zyyglxt.service.IndustrialDevelopSaleDrugService;
import com.zyyglxt.util.UsernameUtil;
import io.swagger.annotations.Api;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * @Author lrt
 * @Date 2020/11/6 21:10
 * @Version 1.0
 **/
@Api(tags = "产业发展-销售企业、制药企业在售药品")
@RestController
@RequestMapping(value = "industrialdevelop")
public class SaleDrugController {

    @Resource
    IndustrialDevelopSaleDrugService saleDrugService;
    @Resource
    private IFileService iFileService;
    @Resource
    UsernameUtil usernameUtil;

    @ResponseBody
    @RequestMapping(value = "sale-drug-add", method = RequestMethod.POST)
    public ResponseData addSaleDrug(@RequestBody IndustrialDevelopSaleDrug record){
        saleDrugService.insertSelective(record);
        return new ResponseData(EmBusinessError.success);
    }

    @ResponseBody
    @RequestMapping(value = "sale-drug-update", method = RequestMethod.PUT)
    public ResponseData updSaleDrug(@RequestBody IndustrialDevelopSaleDrug record){
        saleDrugService.updateByPrimaryKeySelective(record);
        return new ResponseData(EmBusinessError.success);
    }

    @ResponseBody
    @RequestMapping(value = "sale-drug-del", method = RequestMethod.DELETE)
    public ResponseData delSaleDrug(@RequestBody IndustrialDevelopSaleDrug record){
        saleDrugService.deleteByPrimaryKey(record.getItemid(),record.getItemcode());
        return new ResponseData(EmBusinessError.success);
    }

    /*售药数据所有查询*/
    @RequestMapping(value ="selecallsaledrug",method = RequestMethod.GET )
    @LogAnnotation(appCode ="",logTitle ="查寻所有售药数据",logLevel ="1",creater ="",updater = "")
    @ResponseBody
    public ResponseData selectAllSaleDrug(){
        List<IndustrialDevelopSaleDrug> industrialDevelopSaleDrug = saleDrugService.selectAllSaleDrug(usernameUtil.getOrgCode());
        return new ResponseData(EmBusinessError.success,industrialDevelopSaleDrug);
    }

    private IndustrialDevelopSaleDrug convertDtoFromDo(IndustrialDevelopSaleDrug industrialDevelopSaleDrug, String filePath){
        if(StringUtils.isEmpty(filePath)){
            filePath = "已经损坏了";
        }
        IndustrialDevelopSaleDrug industrialDevelopSaleDrug1 = new IndustrialDevelopSaleDrug();
        BeanUtils.copyProperties(industrialDevelopSaleDrug,industrialDevelopSaleDrug1);
        industrialDevelopSaleDrug1.setFilePath(filePath);
        return industrialDevelopSaleDrug1;
    }
}
