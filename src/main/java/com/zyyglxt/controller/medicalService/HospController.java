package com.zyyglxt.controller.medicalService;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.FileDO;
import com.zyyglxt.dataobject.HospDO;
import com.zyyglxt.dataobject.HospDOKey;
import com.zyyglxt.dto.HospDto;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
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
 * @date 2020/11/1 9:20
 */
@RestController
@RequestMapping(value = "/medicalService/hosp")
public class HospController {
    @Resource
    private IHospService hospService;
    @Resource
    private IFileService fileService;

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

    @DeleteMapping(value = "delete")
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="删除医院数据",logLevel ="4",creater ="",updater = "")
    public ResponseData deleteHosp(@RequestBody HospDOKey hospDOKey){
        hospService.deleteHosp(hospDOKey);
        return new ResponseData(EmBusinessError.success);
    }

    @GetMapping(value = "selectAll")
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="查看所有医院数据",logLevel ="1",creater ="",updater = "")
    public ResponseData selectAllHosp(){
        List<HospDO> hospDOList = hospService.selectAllHosp();
        return new ResponseData(EmBusinessError.success,DoToDto(hospDOList));
    }

    @ResponseBody
    @GetMapping(value = "search")
    @LogAnnotation(appCode ="",logTitle ="搜索医院数据",logLevel ="1",creater ="",updater = "")
    public ResponseData searchHosp(String keyWord){
        List<HospDO> hospDOList = hospService.searchHosp(keyWord);
        return new ResponseData(EmBusinessError.success,DoToDto(hospDOList));
    }

    @ResponseBody
    @GetMapping(value = "top5")
    @LogAnnotation(appCode ="",logTitle ="查看前5条医院数据",logLevel ="1",creater ="",updater = "")
    public ResponseData top5Hosp(){
        List<HospDO> hospDOList = hospService.top5Hosp();
        return new ResponseData(EmBusinessError.success,DoToDto(hospDOList));
    }


    private List<HospDto> DoToDto(List<HospDO> DOList){
        List<HospDto> DtoList = new ArrayList<>();
        if (!DOList.isEmpty()){
            HospDto Dto = new HospDto();
            for (HospDO DO:DOList){
                BeanUtils.copyProperties(DO,Dto);
                FileDO fileDO= fileService.selectFileByDataCode(Dto.getItemcode());
                Dto.setFilePath(fileDO == null ? null:fileDO.getFilePath());
                DtoList.add(Dto);
            }
        }
        return DtoList;
    }
}
