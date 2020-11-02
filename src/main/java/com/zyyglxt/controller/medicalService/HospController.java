package com.zyyglxt.controller.medicalService;

import com.zyyglxt.dataobject.HospDO;
import com.zyyglxt.dataobject.HospDOKey;
import com.zyyglxt.service.IHospService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/11/1 9:20
 */
@RestController
@RequestMapping(value = "/medivalService/hosp")
public class HospController {
    @Resource
    IHospService hospService;

    @PostMapping(value = "addHosp")
    public void addHosp(HospDO hospDO){
        hospService.addHosp(hospDO);
    }

    @PostMapping(value = "updateHosp")
    public void updateHosp(HospDO hospDO){
        hospService.updateHosp(hospDO);
    }

    @DeleteMapping(value = "deleteHosp")
    public void deleteHosp(HospDOKey hospDOKey){
        hospService.deleteHosp(hospDOKey);
    }

    @GetMapping(value = "selectAllHosp")
    public void selectAllHosp(Model model){
        List<HospDO> hospDOList = hospService.selectAllHosp();
        model.addAttribute("hospDOList",hospDOList);
    }

    @GetMapping(value = "searchHosp")
    public void searchHosp(Model model, String keyWord){
        List<HospDO> hospDOList = hospService.searchHosp(keyWord);
        model.addAttribute("hospDOList",hospDOList);
    }

    @GetMapping(value = "top5Hosp")
    public void top5Hosp(Model model){
        List<HospDO> hospDOList = hospService.top5Hosp();
        model.addAttribute("hospDOList",hospDOList);
    }

}
