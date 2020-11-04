package com.zyyglxt.controller.medicalService;

import com.zyyglxt.dataobject.SpecialtyDO;
import com.zyyglxt.dto.SpecialtyDto;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.ISpecialtyService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/11/1 9:34
 */
@RestController
@RequestMapping(value = "/medivalService/specialty")
public class SpecialtyController {
    @Resource
    ISpecialtyService specialtyService;

    @PostMapping(value = "add")
    public ResponseData addSpecialty(SpecialtyDto specialtyDto) throws BusinessException {
        specialtyService.addSpecialty(specialtyDto);
        return new ResponseData(EmBusinessError.success);
    }

    @PostMapping(value = "update")
    public ResponseData updateSpecialty(SpecialtyDto specialtyDto){
        specialtyService.updateSpecialty(specialtyDto);
        return new ResponseData(EmBusinessError.success);
    }

    @DeleteMapping(value = "delete")
    public ResponseData deleteSpecialty(SpecialtyDto specialtyDto){
        specialtyService.deleteSpecialty(specialtyDto);
        return new ResponseData(EmBusinessError.success);
    }

    @GetMapping(value = "selectAll")
    public ResponseData selectAllSpecialty(){
        List<SpecialtyDO> specialtyDOList = specialtyService.selectAllSpecialty();
        return new ResponseData(EmBusinessError.success,specialtyDOList);
    }

    @GetMapping(value = "search")
    public ResponseData searchSpecialty(String keyWord){
        List<SpecialtyDO> specialtyDOList = specialtyService.searchSpecialty(keyWord);
        return new ResponseData(EmBusinessError.success,specialtyDOList);
    }

    @GetMapping(value = "top5")
    public ResponseData top5Specialty(){
        List<SpecialtyDO> specialtyDOList = specialtyService.top5Specialty();
        return new ResponseData(EmBusinessError.success,specialtyDOList);
    }

}
