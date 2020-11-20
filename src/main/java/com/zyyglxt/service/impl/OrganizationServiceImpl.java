package com.zyyglxt.service.impl;

import com.zyyglxt.dao.IndustrialDevelopChiMedMapper;
import com.zyyglxt.dao.IndustrialDevelopSchoolMapper;
import com.zyyglxt.dao.IndustrialDevelopTecSerOrgMapper;
import com.zyyglxt.dao.OrganizationDOMapper;
import com.zyyglxt.dataobject.IndustrialDevelopChiMed;
import com.zyyglxt.dataobject.OrganizationDO;
import com.zyyglxt.dto.UserSessionDto;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IOrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @Author nongcn
 * @Date 2020/11/14 15:00
 * @Version 1.0
 */
@Service
public class OrganizationServiceImpl implements IOrganizationService {

    @Resource
    OrganizationDOMapper organizationDOMapper;
    @Resource
    IndustrialDevelopChiMedMapper industrialDevelopChiMedMapper;
    @Resource
    IndustrialDevelopSchoolMapper industrialDevelopSchoolMapper;
    @Resource
    IndustrialDevelopTecSerOrgMapper industrialDevelopTecSerOrgMapper;
    @Autowired
    HttpServletRequest request;

    /**
     * 根据角色不同用不同SQL查询获得表格显示数据
     * @return
     */
    @Override
    public List<OrganizationDO> selectAllOrgByAuditStatus() {
        UserSessionDto user = (UserSessionDto) request.getSession().getAttribute("user");
        if ("市级中医药管理部门".equals(user.getRolename())) {
            return organizationDOMapper.selectAllOrgByAuditStatus();
        } else if ("省局中医药管理部门".equals(user.getRolename())){
            return organizationDOMapper.queryAllOrgByAuditStatus();
        }
        return null;
    }

//    @Override
//    public List<OrganizationDO> selectAllOrgByAuditStatus2() {
//        // 省局
//        return organizationDOMapper.queryAllOrgByAuditStatus();
//    }

    @Override
    public ResponseData orgAudit(OrganizationDO organizationDO) {

        organizationDOMapper.updateByPrimaryKeySelective(organizationDO);

        return new ResponseData(EmBusinessError.success);
    }

    @Override
    public void insertChiMedMsg() {

    }
}
