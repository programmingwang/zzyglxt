package com.zyyglxt.controller.medicalService;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dao.HospSpecialtyRefDOMapper;
import com.zyyglxt.dataobject.*;
import com.zyyglxt.dto.SpecialtyDto;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
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
 * @date 2020/11/1 9:34
 */
@RestController
@RequestMapping(value = "/medicalService/specialty")
public class SpecialtyController {
    @Resource
    private ISpecialtyService specialtyService;
    @Resource
    private IFileService fileService;
    @Resource
    private HospSpecialtyRefDOMapper hospSpecialtyRefDOMapper;
    @Resource
    private IHospService hospService;

    @ResponseBody
    @PostMapping(value = "add")
    @LogAnnotation(appCode ="",logTitle ="添加科室数据",logLevel ="3",creater ="",updater = "")
    public ResponseData addSpecialty(@RequestBody SpecialtyDto specialtyDto) {
        specialtyService.addSpecialty(specialtyDto);
        return new ResponseData(EmBusinessError.success);
    }

    @ResponseBody
    @PostMapping(value = "update")
    @LogAnnotation(appCode ="",logTitle ="更新科室数据",logLevel ="2",creater ="",updater = "")
    public ResponseData updateSpecialty(@RequestBody SpecialtyDto specialtyDto){
        specialtyService.updateSpecialty(specialtyDto);
        return new ResponseData(EmBusinessError.success);
    }

    @ResponseBody
    @DeleteMapping(value = "delete")
    @LogAnnotation(appCode ="",logTitle ="删除科室数据",logLevel ="4",creater ="",updater = "")
    public ResponseData deleteSpecialty(@RequestBody SpecialtyDOKey specialtyDOKey){
        specialtyService.deleteSpecialty(specialtyDOKey);
        return new ResponseData(EmBusinessError.success);
    }

    @ResponseBody
    @GetMapping(value = "selectAll")
    @LogAnnotation(appCode ="",logTitle ="查看所有科室数据",logLevel ="1",creater ="",updater = "")
    public ResponseData selectAllSpecialty(){
        List<SpecialtyDO> specialtyDOList = specialtyService.selectAllSpecialty();
        return new ResponseData(EmBusinessError.success,DoToDto(specialtyDOList));
    }

    @ResponseBody
    @GetMapping(value = "search")
    @LogAnnotation(appCode ="",logTitle ="搜索科室数据",logLevel ="1",creater ="",updater = "")
    public ResponseData searchSpecialty(String keyWord){
        List<SpecialtyDO> specialtyDOList = specialtyService.searchSpecialty(keyWord);
        return new ResponseData(EmBusinessError.success,DoToDto(specialtyDOList));
    }

    @ResponseBody
    @GetMapping(value = "top5")
    @LogAnnotation(appCode ="",logTitle ="查看前5条科室数据",logLevel ="1",creater ="",updater = "")
    public ResponseData top5Specialty(){
        List<SpecialtyDO> specialtyDOList = specialtyService.top5Specialty();
        return new ResponseData(EmBusinessError.success,DoToDto(specialtyDOList));
    }

    @ResponseBody
    @GetMapping(value = "selectByHospCode")
    public ResponseData selectByHospCode(String hospCode){
        List<SpecialtyDO> specialtyDOList = specialtyService.selectByHospCode(hospCode);
        return new ResponseData(EmBusinessError.success,DoToDto(specialtyDOList));
    }

    private List<SpecialtyDto> DoToDto(List<SpecialtyDO> DOList){
        List<SpecialtyDto> DtoList = new ArrayList<>();
        if (!DOList.isEmpty()){
            for (SpecialtyDO DO:DOList){
                SpecialtyDto Dto = new SpecialtyDto();
                BeanUtils.copyProperties(DO,Dto);
                HospSpecialtyRefDO hospSpecialtyRefDO = hospSpecialtyRefDOMapper.selectHospBySpecialtyCode(Dto.getItemcode());
                HospDO hospDO = hospService.selectHospByItemCode(hospSpecialtyRefDO.getHospitalCode());
                Dto.setHospitalCode(hospDO.getItemcode());
                Dto.setHospitalName(hospDO.getHospitalName());
                Dto.setSpecialtyAddressCity(hospDO.getHospitalAddressCity());
                Dto.setSpecialtyAddressCounty(hospDO.getHospitalAddressCountry());
                Dto.setSpecialtyAddress(hospDO.getHospitalAddress());
                FileDO fileDO= fileService.selectFileByDataCode(Dto.getItemcode());
                Dto.setFilePath(fileDO == null ? null:fileDO.getFilePath());
                DtoList.add(Dto);
            }
        }
        return DtoList;
    }
}
