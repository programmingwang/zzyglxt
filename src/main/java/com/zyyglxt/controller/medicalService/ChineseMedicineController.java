package com.zyyglxt.controller.medicalService;

import com.zyyglxt.dataobject.ChineseMedicineDO;
import com.zyyglxt.dataobject.ChineseMedicineDOKey;
import com.zyyglxt.service.IChineseMedicineService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/11/1 9:43
 */
@RestController
@RequestMapping(value = "/medivalService/chineseMedicine")
public class ChineseMedicineController {
    @Resource
    IChineseMedicineService chineseMedicineService;

    @PostMapping(value = "add")
    public void addChineseMedicine(ChineseMedicineDO chineseMedicineDO){
        chineseMedicineService.addChineseMedicine(chineseMedicineDO);
    }

    @PostMapping(value = "update")
    public void updateChineseMedicine(ChineseMedicineDO chineseMedicineDO){
        chineseMedicineService.updateChineseMedicine(chineseMedicineDO);
    }

    @DeleteMapping(value = "delete")
    public void deleteChineseMedicine(ChineseMedicineDOKey chineseMedicineDOKey){
        chineseMedicineService.deleteChineseMedicine(chineseMedicineDOKey);
    }

    @GetMapping(value = "selectAll")
    public void selectAllChineseMedicine(Model model){
        List<ChineseMedicineDO> chineseMedicineDOList = chineseMedicineService.selectAllChineseMedicine();
        model.addAttribute("chineseMedicineDOList",chineseMedicineDOList);
    }

    @GetMapping(value = "search")
    public void searchChineseMedicine(Model model,String keyWord){
        List<ChineseMedicineDO> chineseMedicineDOList = chineseMedicineService.searchChineseMedicine(keyWord);
        model.addAttribute("chineseMedicineDOList",chineseMedicineDOList);
    }

    @GetMapping(value = "top5")
    public void top5ChineseMedicine(Model model){
        List<ChineseMedicineDO> chineseMedicineDOList = chineseMedicineService.top5ChineseMedicine();
        model.addAttribute("chineseMedicineDOList",chineseMedicineDOList);
    }
}
