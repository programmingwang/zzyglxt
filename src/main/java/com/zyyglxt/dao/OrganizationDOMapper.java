package com.zyyglxt.dao;

import com.zyyglxt.dataobject.OrganizationDO;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface OrganizationDOMapper {

    int deleteByPrimaryKey(Integer itemid);

    int insert(OrganizationDO record);

    int insertSelective(OrganizationDO record);

    OrganizationDO selectByPrimaryKey(String orgCode);

    List<OrganizationDO> selectAllOrgByAuditStatus();

    List<OrganizationDO> queryAllOrgByAuditStatus();

    int updateByPrimaryKeySelective(OrganizationDO record);

    int updateByPrimaryKey(OrganizationDO record);
}
