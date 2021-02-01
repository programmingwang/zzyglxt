package com.zyyglxt.controller.medicalService;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dao.SpecialtyDOMapper;
import com.zyyglxt.dataobject.*;
import com.zyyglxt.dto.ChineseMedicineDto;
import com.zyyglxt.dto.StatusDto;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IChineseMedicineService;
import com.zyyglxt.service.IFileService;
import com.zyyglxt.service.IHospService;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/11/1 9:43
 */
@RestController
@RequestMapping(value = "/medicalService/chineseMedicine")
public class ChineseMedicineController {
    @Resource
    private IChineseMedicineService chineseMedicineService;
    @Resource
    private IFileService fileService;
    @Resource
    private IHospService hospService;
    @Resource
    private SpecialtyDOMapper specialtyDOMapper;

    @PostMapping(value = "add")
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="添加名老中医数据",logLevel ="3",creater ="",updater = "")
    public ResponseData addChineseMedicine(@RequestBody ChineseMedicineDO chineseMedicineDO){
        chineseMedicineService.addChineseMedicine(chineseMedicineDO);
        return new ResponseData(EmBusinessError.success);
    }

    @PostMapping(value = "update")
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="更新名老中医数据",logLevel ="2",creater ="",updater = "")
    public ResponseData updateChineseMedicine(@RequestBody ChineseMedicineDO chineseMedicineDO){
        chineseMedicineService.updateChineseMedicine(chineseMedicineDO);
        return new ResponseData(EmBusinessError.success);
    }

    @DeleteMapping(value = "delete")
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="删除名老中医数据",logLevel ="4",creater ="",updater = "")
    public ResponseData deleteChineseMedicine(@RequestBody ChineseMedicineDOKey chineseMedicineDOKey){
        chineseMedicineService.deleteChineseMedicine(chineseMedicineDOKey);
        return new ResponseData(EmBusinessError.success);
    }

    @GetMapping(value = "selectAll")
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="查看所有名老中医数据",logLevel ="1",creater ="",updater = "")
    public ResponseData selectAllChineseMedicine(@RequestParam(value = "chineseMedicineStatus")List chineseMedicineStatus){
        return new ResponseData(EmBusinessError.success,chineseMedicineService.selectAllChineseMedicine(chineseMedicineStatus));
    }

    @GetMapping(value = "search")
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="搜索名老中医数据",logLevel ="1",creater ="",updater = "")
    public ResponseData searchChineseMedicine(String keyWord){
        return new ResponseData(EmBusinessError.success,chineseMedicineService.searchChineseMedicine(keyWord));
    }

    @ResponseBody
    @PostMapping("updateStatus")
    @LogAnnotation(logTitle = "改变数据状态",logLevel = "2")
    public ResponseData updateStatus(StatusDto statusDto){
        chineseMedicineService.updateStatus(statusDto);
        return new ResponseData(EmBusinessError.success);
    }
}
