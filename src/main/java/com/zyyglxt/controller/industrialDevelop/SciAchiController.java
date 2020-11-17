package com.zyyglxt.controller.industrialDevelop;


import com.zyyglxt.dataobject.FileDO;
import com.zyyglxt.dataobject.IndustrialDevelopSciAchiDO;
import com.zyyglxt.dataobject.IndustrialDevelopSciAchiDOKey;
import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopSciAchiDODto;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IFileService;
import com.zyyglxt.service.IIndustrialDevelopSciAchiService;
import com.zyyglxt.util.ConvertDOToDTOUtil;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * @Author lrt
 * @Date 2020/10/29 9:29
 * @Version 1.0
 **/
@Api(tags = "产业发展-科研成果")
@RestController
@RequestMapping(value = "industrialdevelop")
public class SciAchiController {
    @Resource
    IIndustrialDevelopSciAchiService sciAchiService;

    @Autowired
    IFileService iFileService;

    /**
     * 增加科研成果
     *
     * @param sciAchiDO
     */
    @ResponseBody
    @RequestMapping(value = "/achievement", method = RequestMethod.POST)
    public ResponseData addAchievement(@RequestBody IndustrialDevelopSciAchiDO sciAchiDO) {
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

    @RequestMapping(value = "/achievement/{orgCode}", method = RequestMethod.GET)
    public ResponseData getAchievement(@PathVariable String orgCode) {
        List<IndustrialDevelopSciAchiDO> achievement = sciAchiService.getAchievement(orgCode);
        List<IndustrialDevelopSciAchiDODto> industrialDevelopSciAchiDODtoList = new ArrayList<>();

        for (IndustrialDevelopSciAchiDO industrialDevelopSciAchiDO : achievement) {
            FileDO fileDO = iFileService.selectFileByDataCode(industrialDevelopSciAchiDO.getItemcode());
            industrialDevelopSciAchiDODtoList.add(
                    ConvertDOToDTOUtil.convertFromDOToDTO(industrialDevelopSciAchiDO, fileDO.getFilePath(),
                                        fileDO.getFileName()));
        }
        return new ResponseData(EmBusinessError.success,industrialDevelopSciAchiDODtoList);
    }
}

