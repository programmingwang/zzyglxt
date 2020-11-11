package com.zyyglxt.controller.medicalService;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dao.SpecialtyDOMapper;
import com.zyyglxt.dataobject.*;
import com.zyyglxt.dto.ChineseCulturalDto;
import com.zyyglxt.dto.ChineseMedicineDto;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IChineseMedicineService;
import com.zyyglxt.service.IFileService;
import com.zyyglxt.service.IHospService;
import com.zyyglxt.service.ISpecialtyService;
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
    public ResponseData selectAllChineseMedicine(){
        List<ChineseMedicineDO> chineseMedicineDOList = chineseMedicineService.selectAllChineseMedicine();
        return new ResponseData(EmBusinessError.success,DoToDto(chineseMedicineDOList));
    }

    @GetMapping(value = "search")
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="搜索名老中医数据",logLevel ="1",creater ="",updater = "")
    public ResponseData searchChineseMedicine(String keyWord){
        List<ChineseMedicineDO> chineseMedicineDOList = chineseMedicineService.searchChineseMedicine(keyWord);
        return new ResponseData(EmBusinessError.success,DoToDto(chineseMedicineDOList));
    }

    @GetMapping(value = "top5")
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="查看前5条名老中医数据",logLevel ="1",creater ="",updater = "")
    public ResponseData top5ChineseMedicine(){
        List<ChineseMedicineDO> chineseMedicineDOList = chineseMedicineService.top5ChineseMedicine();
        return new ResponseData(EmBusinessError.success,DoToDto(chineseMedicineDOList));
    }

    private List<ChineseMedicineDto> DoToDto(List<ChineseMedicineDO> DOList){
        List<ChineseMedicineDto> DtoList = new ArrayList<>();
        if (!DOList.isEmpty()){
            ChineseMedicineDto Dto = new ChineseMedicineDto();
            for (ChineseMedicineDO DO:DOList){
                BeanUtils.copyProperties(DO,Dto);
                HospDO hospDO = hospService.selectHospByItemCode(Dto.getHospCode());
                SpecialtyDO specialtyDO = specialtyDOMapper.selectSpecialtyByItemCode(Dto.getDeptCode());
                BeanUtils.copyProperties(hospDO,Dto);
                BeanUtils.copyProperties(specialtyDO,Dto);
                FileDO fileDO= fileService.selectFileByDataCode(Dto.getItemcode());
                Dto.setFilePath(fileDO == null ? null:fileDO.getFilePath());
                DtoList.add(Dto);
            }
        }
        return DtoList;
    }
}
