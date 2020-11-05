package com.zyyglxt.dao;

import com.zyyglxt.dataobject.OrganizationDO;
import org.springframework.stereotype.Component;

@Component
public interface OrganizationDOMapper {

    int deleteByPrimaryKey(Integer itemid);

    int insert(OrganizationDO record);

    int insertSelective(OrganizationDO record);

    OrganizationDO selectByPrimaryKey(Integer itemid);

    int updateByPrimaryKeySelective(OrganizationDO record);

    int updateByPrimaryKey(OrganizationDO record);
}
