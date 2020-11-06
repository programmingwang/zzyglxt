package com.zyyglxt.controller.industrialDevelop;

import com.zyyglxt.dataobject.IndustrialDevelopCooExcDO;
import com.zyyglxt.service.IIndustrialDevelopCooService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import java.util.List;

/**
 * @Author lrt
 * @Date 2020/11/2 15:40
 * @Version 1.0
 **/
@Controller
@RequestMapping("industrial")
public class TestController {
    @Resource
    IIndustrialDevelopCooService developCooService;
    @GetMapping("/cooperation")
    public String getHtml(ModelMap map) {
        List<IndustrialDevelopCooExcDO> list = developCooService.getCooRecord(1, 10);
        map.put("dataList", list);
//        map.put("page", page);
//        map.put("pagesize", pagesize);
        return "/industrial_develop/cooperation";
    }
}
