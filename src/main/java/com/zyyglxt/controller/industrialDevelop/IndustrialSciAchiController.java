package com.zyyglxt.controller.industrialDevelop;

import com.zyyglxt.dataobject.IndustrialDevelopSciAchiDO;
import com.zyyglxt.dataobject.IndustrialDevelopSciAchiDOKey;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IIndustrialDevelopSciAchiService;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;

/**
 * @Author lrt
 * @Date 2020/10/29 9:29
 * @Version 1.0
 **/
@Api(tags = "产业发展-科研成果")
@RestController
@RequestMapping(value = "industrialdevelop")
public class IndustrialSciAchiController {
    @Resource
    IIndustrialDevelopSciAchiService sciAchiService;

    /**
     * 增加科研成果
     *
     * @param sciAchiDO
     */
    @ResponseBody
    @RequestMapping(value = "/achievement", method = RequestMethod.POST)
    public ResponseData addAchievement(@RequestBody @Valid IndustrialDevelopSciAchiDO sciAchiDO) {
        System.out.println(sciAchiDO.toString());
        sciAchiService.addAchievement(sciAchiDO);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 更新科研成果
     *
     * @param sciAchiDO
     */
    @ResponseBody
    @RequestMapping(value = "/achievement", method = RequestMethod.PUT)
    public ResponseData updateAchievement(@RequestBody IndustrialDevelopSciAchiDO sciAchiDO) {
        sciAchiService.updAchievement(sciAchiDO);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 删除科研成果
     *
     * @param key
     */
    @ResponseBody
    @RequestMapping(value = "/achievement", method = RequestMethod.DELETE)
    public ResponseData delAchievement(@RequestBody IndustrialDevelopSciAchiDOKey key) {
        sciAchiService.delAchievement(key);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 增加点击数
     *
     * @param key
     */
    @RequestMapping(value = "visit-num", method = RequestMethod.PUT)
    public ResponseData increaseVisitNum(@RequestBody IndustrialDevelopSciAchiDOKey key) {
        sciAchiService.increaseVisitNum(key);
        return new ResponseData(EmBusinessError.success);
    }

    @RequestMapping(value = "/achievement", method = RequestMethod.GET)
    public ResponseData getAchievement() {
        ResponseData responseData = new ResponseData(EmBusinessError.success);
        responseData.setData(sciAchiService.getAchievement());
        return responseData;
    }
}

