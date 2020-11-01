package com.zyyglxt.controller.medicalService.chineseMedicine;

import com.zyyglxt.dataobject.ChineseMedicineDO;
import com.zyyglxt.dataobject.ChineseMedicineDOKey;
import com.zyyglxt.service.IChineseMedicineService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/11/1 9:43
 */
@Controller
@RequestMapping(value = "/medivalService/chineseMedicine")
public class ChineseMedicineController {
    @Resource
    IChineseMedicineService chineseMedicineService;

    @PostMapping(value = "addChineseMedicine")
    public void addChineseMedicine(@RequestBody ChineseMedicineDO chineseMedicineDO){
        chineseMedicineService.addChineseMedicine(chineseMedicineDO);
    }

    @PostMapping(value = "updateChineseMedicine")
    public void updateChineseMedicine(@RequestBody ChineseMedicineDO chineseMedicineDO){
        chineseMedicineService.updateChineseMedicine(chineseMedicineDO);
    }

    @DeleteMapping(value = "deleteChineseMedicine")
    public void deleteChineseMedicine(@RequestBody ChineseMedicineDOKey chineseMedicineDOKey){
        chineseMedicineService.deleteChineseMedicine(chineseMedicineDOKey);
    }

    @GetMapping(value = "selectAllChineseMedicine")
    public void selectAllChineseMedicine(){
        chineseMedicineService.selectAllChineseMedicine();
    }

    @GetMapping(value = "searchChineseMedicine")
    public void searchChineseMedicine(String keyWord){
        chineseMedicineService.searchChineseMedicine(keyWord);
    }

    @GetMapping(value = "top5ChineseMedicine")
    public void top5ChineseMedicine(){
        chineseMedicineService.top5ChineseMedicine();
    }
}
