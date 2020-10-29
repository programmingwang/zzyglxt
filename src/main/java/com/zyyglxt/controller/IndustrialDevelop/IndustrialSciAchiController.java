package com.zyyglxt.controller.IndustrialDevelop;

import com.zyyglxt.dataobject.IndustrialDevelopSciAchiDO;
import com.zyyglxt.dataobject.IndustrialDevelopSciAchiDOKey;
import com.zyyglxt.service.IIndustrialDevelopSciAchi;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @Author lrt
 * @Date 2020/10/29 9:29
 * @Version 1.0
 **/
@RestController
@RequestMapping(value = "industrialdevelop")
public class IndustrialSciAchiController {
    @Resource
    IIndustrialDevelopSciAchi industrialDevelop;

    /**
     * 增加科研成果
     * @param sciAchiDO
     */
    @ResponseBody
    @RequestMapping(value = "/achievement", method = RequestMethod.POST)
    public void addAchievement(@RequestBody IndustrialDevelopSciAchiDO sciAchiDO) {
        System.out.println(sciAchiDO.toString());
        industrialDevelop.addAchievement(sciAchiDO);
        
    }

    /**
     * 更新科研成果
     * @param sciAchiDO
     */
    @ResponseBody
    @RequestMapping(value = "/achievement", method = RequestMethod.PUT)
    public void updateAchievement(@RequestBody IndustrialDevelopSciAchiDO sciAchiDO) {
        System.out.println(sciAchiDO.toString());
        System.out.println("update");
        industrialDevelop.updAchievement(sciAchiDO);
        
    }

    /**
     * 删除科研成果
     * @param key
     */
    @ResponseBody
    @RequestMapping(value = "/achievement", method = RequestMethod.DELETE)
    public void delAchievement(@RequestBody IndustrialDevelopSciAchiDOKey key) {
        industrialDevelop.delAchievement(key);
        
    }

    /**
     * 增加点击数
     * @param key
     */
    @RequestMapping(value = "visit-num", method = RequestMethod.PUT)
    public void increaseVisitNum(@RequestBody IndustrialDevelopSciAchiDOKey key) {
        industrialDevelop.increaseVisitNum(key);
    }
}
