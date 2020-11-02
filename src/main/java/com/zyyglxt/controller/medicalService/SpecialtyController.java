package com.zyyglxt.controller.medicalService;

import com.zyyglxt.dataobject.HospSpecialtyRefDO;
import com.zyyglxt.dataobject.SpecialtyDO;
import com.zyyglxt.dataobject.SpecialtyDOKey;
import com.zyyglxt.dto.SpecialtyDto;
import com.zyyglxt.service.ISpecialtyService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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

    @PostMapping(value = "addSpecialty")
    public void addSpecialty(SpecialtyDto specialtyDto){
        specialtyService.addSpecialty(specialtyDto);
    }

    @PostMapping(value = "updateSpecialty")
    public void updateSpecialty(SpecialtyDto specialtyDto){
        specialtyService.updateSpecialty(specialtyDto);
    }

    @DeleteMapping(value = "deleteSpecialty")
    public void deleteSpecialty(SpecialtyDto specialtyDto){
        specialtyService.deleteSpecialty(specialtyDto);
    }

    @GetMapping(value = "selectAllSpecialty")
    public void selectAllSpecialty(Model model){
        List<SpecialtyDO> specialtyDOList = specialtyService.selectAllSpecialty();
        model.addAttribute("specialtyDOList",specialtyDOList);
    }

    @GetMapping(value = "searchSpecialty")
    public void searchSpecialty(Model model, String keyWord){
        List<SpecialtyDO> specialtyDOList = specialtyService.searchSpecialty(keyWord);
        model.addAttribute("specialtyDOList",specialtyDOList);
    }

    @GetMapping(value = "top5Specialty")
    public void top5Specialty(Model model){
        List<SpecialtyDO> specialtyDOList = specialtyService.top5Specialty();
        model.addAttribute("specialtyDOList",specialtyDOList);
    }

}
