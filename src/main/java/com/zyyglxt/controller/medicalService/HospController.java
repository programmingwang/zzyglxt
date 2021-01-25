package com.zyyglxt.controller.medicalService;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.FileDO;
import com.zyyglxt.dataobject.HospDO;
import com.zyyglxt.dataobject.HospDOKey;
import com.zyyglxt.dto.HospDto;
import com.zyyglxt.dto.StatusDto;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IFileService;
import com.zyyglxt.service.IHospService;
import com.zyyglxt.util.UsernameUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/11/1 9:20
 */
@RestController
@RequestMapping(value = "/medicalService/hosp")
public class HospController {
    @Resource
    private IHospService hospService;
    @Resource
    private IFileService fileService;
    @Resource
    private UsernameUtil usernameUtil;

    @PostMapping(value = "add")
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="添加医院数据",logLevel ="3",creater ="",updater = "")
    public ResponseData addHosp(@RequestBody HospDO hospDO){
        hospService.addHosp(hospDO);
        return new ResponseData(EmBusinessError.success);
    }

    @PostMapping(value = "update")
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="更新医院数据",logLevel ="2",creater ="",updater = "")
    public ResponseData updateHosp(@RequestBody HospDO hospDO){
        hospService.updateHosp(hospDO);
        return new ResponseData(EmBusinessError.success);
    }

    @DeleteMapping(value = "/delete")
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="删除医院数据",logLevel ="4",creater ="",updater = "")
    public ResponseData deleteHosp(@RequestBody HospDOKey hospDOKey){
        hospService.deleteHosp(hospDOKey);
        return new ResponseData(EmBusinessError.success);
    }

    @GetMapping(value = "/selectByOrgCode")
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="根据机构数据查看医院数据",logLevel ="1",creater ="",updater = "")
    public ResponseData selectByOrgCode(){
        HospDO hospDO = hospService.selectByOrgCode(usernameUtil.getOrgCode());
        HospDto dto = new HospDto();
        BeanUtils.copyProperties(hospDO,dto);
        FileDO fileDO = fileService.selectFileByDataCode(hospDO.getItemcode());
        String filePath = (fileDO==null) ? "损坏了" : fileDO.getFilePath();
        dto.setFilePath(filePath);
        return new ResponseData(EmBusinessError.success,dto);
    }
    @GetMapping(value = "/selectAll")
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="根据身份查看医院数据",logLevel ="1",creater ="",updater = "")
    public ResponseData selectAllHosp(@RequestParam(value = "hospitalStatus")List hospitalStatus){
        return new ResponseData(EmBusinessError.success,hospService.selectAllHosp(hospitalStatus));
    }

    @GetMapping(value = "selectAllHosp")
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="查看所有医院数据",logLevel ="1",creater ="",updater = "")
    public ResponseData selectAllNoStatus(){
        return new ResponseData(EmBusinessError.success,hospService.selectAllNoStatus());
    }

    @ResponseBody
    @GetMapping(value = "search")
    @LogAnnotation(appCode ="",logTitle ="搜索医院数据",logLevel ="1",creater ="",updater = "")
    public ResponseData searchHosp(String keyWord){
        return new ResponseData(EmBusinessError.success,hospService.searchHosp(keyWord));
    }

    @ResponseBody
    @GetMapping("selectByStatus")
    @LogAnnotation(appCode = "",logTitle = "根据状态查看医院数据",logLevel = "1")
    public ResponseData selectByStatus(String status){
        return new ResponseData(EmBusinessError.success,hospService.selectByStatus(status));
    }

    @ResponseBody
    @PostMapping("updateStatus")
    @LogAnnotation(logTitle = "改变数据状态",logLevel = "2")
    public ResponseData updateStatus(StatusDto statusDto){
        hospService.updateStatus(statusDto);
        return new ResponseData(EmBusinessError.success);
    }
}
