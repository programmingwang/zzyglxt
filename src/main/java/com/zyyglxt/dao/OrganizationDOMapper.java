package com.zyyglxt.dao;
import org.apache.ibatis.annotations.Param;

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

    OrganizationDO selectByOrgNameAndCode(@Param("orgName") String orgName, @Param("orgCode")String orgCode);

    OrganizationDO selectByOrgName(String orgName);

    int updateByPrimaryKeySelective(OrganizationDO record);

    int updateByOrgCode(@Param("updated")OrganizationDO updated,@Param("orgCode")String orgCode);

    int updateByPrimaryKey(OrganizationDO record);

    OrganizationDO selectByItemCode(String itemCode);
}
