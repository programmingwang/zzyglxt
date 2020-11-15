package com.zyyglxt.service.impl;

import com.zyyglxt.dao.OrganizationDOMapper;
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


    @Override
    public List<OrganizationDO> selectAllOrgByAuditStatus1() {
        // 市局
        return organizationDOMapper.selectAllOrgByAuditStatus();
    }

    @Override
    public List<OrganizationDO> selectAllOrgByAuditStatus2() {
        // 省局
        return organizationDOMapper.queryAllOrgByAuditStatus();
    }

    @Override
    public ResponseData orgAudit(OrganizationDO organizationDO) {

        organizationDOMapper.updateByPrimaryKeySelective(organizationDO);

        return new ResponseData(EmBusinessError.success);
    }
}
