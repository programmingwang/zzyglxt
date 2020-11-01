package com.zyyglxt.controller.medicalService.hosp;

import com.zyyglxt.dataobject.HospDO;
import com.zyyglxt.dataobject.HospDOKey;
import com.zyyglxt.service.IHospService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/11/1 9:20
 */
@Controller
@RequestMapping(value = "/medivalService/hosp")
public class HospController {
    @Resource
    IHospService hospService;

    @PostMapping(value = "addHosp")
    public void addHosp(@RequestBody HospDO hospDO){
        hospService.addHosp(hospDO);
    }

    @PostMapping(value = "updateHosp")
    public void updateHosp(@RequestBody HospDO hospDO){
        hospService.updateHosp(hospDO);
    }

    @DeleteMapping(value = "deleteHosp")
    public void deleteHosp(@RequestBody HospDOKey hospDOKey){
        hospService.deleteHosp(hospDOKey);
    }

    @GetMapping(value = "selectAllHosp")
    public void selectAllHosp(){
        hospService.selectAllHosp();
    }

    @GetMapping(value = "searchHosp")
    public void searchHosp(String keyWord){
        hospService.searchHosp(keyWord);
    }

    @GetMapping(value = "top5Hosp")
    public void top5Hosp(){
        hospService.top5Hosp();
    }

}
