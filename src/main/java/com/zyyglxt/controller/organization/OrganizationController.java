package com.zyyglxt.controller.organization;

import com.zyyglxt.dataobject.IndustrialDevelopChiMed;
import com.zyyglxt.dataobject.IndustrialDevelopSchool;
import com.zyyglxt.dataobject.IndustrialDevelopTecSerOrg;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IndustrialDevelopChiMedService;
import com.zyyglxt.service.IndustrialDevelopSchoolService;
import com.zyyglxt.service.IndustrialDevelopTecSerOrgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @Author nongcn
 * @Date 2020/11/15 14:23
 * @Version 1.0
 */
@RestController
public class OrganizationController {

    @Autowired
    IndustrialDevelopChiMedService developChiMedService;
    @Autowired
    IndustrialDevelopSchoolService developSchoolService;
    @Autowired
    IndustrialDevelopTecSerOrgService developTecSerOrgService;

    @RequestMapping(value = "/insertChiMed", method = RequestMethod.POST)
    public ResponseData insertChiMedMsg(IndustrialDevelopChiMed industrialDevelopChiMed){
        developChiMedService.insertSelective(industrialDevelopChiMed);
        return new ResponseData(EmBusinessError.success);
    }

    @RequestMapping(value = "/insertSchool", method = RequestMethod.POST)
    public ResponseData insertSchoolMsg(IndustrialDevelopSchool industrialDevelopSchool){
        developSchoolService.insertSelective(industrialDevelopSchool);
        return new ResponseData(EmBusinessError.success);
    }

    @RequestMapping(value = "/insertTecSerOrg", method = RequestMethod.POST)
    public ResponseData insertTecSerOrgMsg(IndustrialDevelopTecSerOrg industrialDevelopTecSerOrg){
        developTecSerOrgService.insertSelective(industrialDevelopTecSerOrg);
        return new ResponseData(EmBusinessError.success);
    }
}
