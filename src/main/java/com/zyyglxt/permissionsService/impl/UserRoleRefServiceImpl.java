package com.zyyglxt.permissionsService.impl;

import com.zyyglxt.dao.UserRoleRefDOMapper;
import com.zyyglxt.dataobject.UserRoleRefDO;
import com.zyyglxt.dataobject.UserRoleRefDOKey;
import com.zyyglxt.permissionsService.UserRoleRefService;
import com.zyyglxt.permissionsUtil.DateUtils;
import com.zyyglxt.permissionsUtil.UUIDUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @Author wanglx
 * @Date 2020/10/29 0029 14:52
 * @Version 1.0
 */
@Service
public class UserRoleRefServiceImpl implements UserRoleRefService {

    @Autowired
    UserRoleRefDOMapper userRoleRefDOMapper;

    @Override
    public int deleteByPrimaryKey(UserRoleRefDOKey key) {
        return userRoleRefDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    public int insertSelective(UserRoleRefDO record) {

        record.setItemcode(UUIDUtils.getUUID());
        record.setItemcreateat(DateUtils.getDate());
        return userRoleRefDOMapper.insertSelective(record);
    }

    @Override
    public UserRoleRefDO selectByPrimaryKey(UserRoleRefDOKey key) {
        return userRoleRefDOMapper.selectByPrimaryKey(key);
    }

    @Override
    public int updateByPrimaryKeySelective(UserRoleRefDO record) {
        record.setItemupdateat(DateUtils.getDate());
        return userRoleRefDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int updateByKeySelective(UserRoleRefDO record) {
        record.setItemupdateat(DateUtils.getDate());
        return userRoleRefDOMapper.updateByKeySelective(record);
    }

    @Override
    public UserRoleRefDO selectByUserCode(String itemcode) {
        return userRoleRefDOMapper.selectByUserCode(itemcode);
    }
}
