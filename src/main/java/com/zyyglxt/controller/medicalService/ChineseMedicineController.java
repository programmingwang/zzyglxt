package com.zyyglxt.controller.medicalService;

import com.zyyglxt.dataobject.ChineseMedicineDO;
import com.zyyglxt.dataobject.ChineseMedicineDOKey;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IChineseMedicineService;
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
    public ResponseData addChineseMedicine(ChineseMedicineDO chineseMedicineDO){
        chineseMedicineService.addChineseMedicine(chineseMedicineDO);
        return new ResponseData(EmBusinessError.success);
    }

    @PostMapping(value = "update")
    public ResponseData updateChineseMedicine(ChineseMedicineDO chineseMedicineDO){
        chineseMedicineService.updateChineseMedicine(chineseMedicineDO);
        return new ResponseData(EmBusinessError.success);
    }

    @DeleteMapping(value = "delete")
    public ResponseData deleteChineseMedicine(ChineseMedicineDOKey chineseMedicineDOKey){
        chineseMedicineService.deleteChineseMedicine(chineseMedicineDOKey);
        return new ResponseData(EmBusinessError.success);
    }

    @GetMapping(value = "selectAll")
    public ResponseData selectAllChineseMedicine(){
        List<ChineseMedicineDO> chineseMedicineDOList = chineseMedicineService.selectAllChineseMedicine();
        return new ResponseData(EmBusinessError.success,chineseMedicineDOList);
    }

    @GetMapping(value = "search")
    public ResponseData searchChineseMedicine(String keyWord){
        List<ChineseMedicineDO> chineseMedicineDOList = chineseMedicineService.searchChineseMedicine(keyWord);
        return new ResponseData(EmBusinessError.success,chineseMedicineDOList);
    }

    @GetMapping(value = "top5")
    public ResponseData top5ChineseMedicine(){
        List<ChineseMedicineDO> chineseMedicineDOList = chineseMedicineService.top5ChineseMedicine();
        return new ResponseData(EmBusinessError.success,chineseMedicineDOList);
    }
}
