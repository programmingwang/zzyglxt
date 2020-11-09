package com.zyyglxt.controller.medicalService;

import com.zyyglxt.dataobject.HospDO;
import com.zyyglxt.dataobject.HospDOKey;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IHospService;
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
    private IHospService hospService;

    @PostMapping(value = "add")
    @ResponseBody
    public ResponseData addHosp(@RequestBody HospDO hospDO){
        hospService.addHosp(hospDO);
        return new ResponseData(EmBusinessError.success);
    }

    @PostMapping(value = "update")
    @ResponseBody
    public ResponseData updateHosp(@RequestBody HospDO hospDO){
        hospService.updateHosp(hospDO);
        return new ResponseData(EmBusinessError.success);
    }

    @DeleteMapping(value = "delete")
    @ResponseBody
    public ResponseData deleteHosp(@RequestBody HospDOKey hospDOKey){
        hospService.deleteHosp(hospDOKey);
        return new ResponseData(EmBusinessError.success);
    }

    @GetMapping(value = "selectAll")
    @ResponseBody
    public ResponseData selectAllHosp(){
        List<HospDO> hospDOList = hospService.selectAllHosp();
        return new ResponseData(EmBusinessError.success,hospDOList);
    }

    @ResponseBody
    @GetMapping(value = "search")
    public ResponseData searchHosp(String keyWord){
        List<HospDO> hospDOList = hospService.searchHosp(keyWord);
        return new ResponseData(EmBusinessError.success,hospDOList);
    }

    @ResponseBody
    @GetMapping(value = "top5")
    public ResponseData top5Hosp(){
        List<HospDO> hospDOList = hospService.top5Hosp();
        return new ResponseData(EmBusinessError.success,hospDOList);
    }

}
