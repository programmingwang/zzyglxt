package com.zyyglxt.controller.medicalService.Specialty;

import com.zyyglxt.dataobject.HospSpecialtyRefDO;
import com.zyyglxt.dataobject.SpecialtyDO;
import com.zyyglxt.dataobject.SpecialtyDOKey;
import com.zyyglxt.dto.SpecialtyDto;
import com.zyyglxt.service.ISpecialtyService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/11/1 9:34
 */
@Controller
@RequestMapping(value = "/medivalService/specialty")
public class SpecialtyController {
    @Resource
    ISpecialtyService specialtyService;

    @PostMapping(value = "addSpecialty")
    public void addSpecialty(@RequestBody SpecialtyDto specialtyDto){
        specialtyService.addSpecialty(specialtyDto);
    }

    @PostMapping(value = "updateSpecialty")
    public void updateSpecialty(@RequestBody SpecialtyDto specialtyDto){
        specialtyService.updateSpecialty(specialtyDto);
    }

    @DeleteMapping(value = "deleteSpecialty")
    public void deleteSpecialty(@RequestBody SpecialtyDto specialtyDto){
        specialtyService.deleteSpecialty(specialtyDto);
    }

    @GetMapping(value = "selectAllSpecialty")
    public void selectAllSpecialty(){
        specialtyService.selectAllSpecialty();
    }

    @GetMapping(value = "searchSpecialty")
    public void searchSpecialty(String keyWord){
        specialtyService.searchSpecialty(keyWord);
    }

    @GetMapping(value = "top5Specialty")
    public void top5Specialty(){
        specialtyService.top5Specialty();
    }

}
