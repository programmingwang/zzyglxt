package com.zyyglxt.permissionsService.impl;

import com.zyyglxt.dao.UserDOMapper;
import com.zyyglxt.dataobject.UserDO;
import com.zyyglxt.dataobject.UserDOKey;
import com.zyyglxt.permissionsService.UserService;
import com.zyyglxt.permissionsUtil.DateUtils;
import com.zyyglxt.permissionsUtil.UUIDUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author wanglx
 * @Date 2020/10/28 0028 21:25
 * @Version 1.0
 */
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserDOMapper userDOMapper;

    @Override
    public int deleteByPrimaryKey(UserDOKey key) {
        return userDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    public int insert(UserDO record) {
        return userDOMapper.insert(record);
    }

    @Override
    public int insertSelective(UserDO record) {
        record.setItemcode(UUIDUtils.getUUID());
        record.setItemcreateat(DateUtils.getDate());
        return userDOMapper.insertSelective(record);
    }

    @Override
    public UserDO selectByPrimaryKey(UserDOKey key) {
        return userDOMapper.selectByPrimaryKey(key);
    }

    @Override
    public int updateByPrimaryKeySelective(UserDO record) {
        record.setItemupdateat(DateUtils.getDate());
        return userDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int updateByPrimaryKeyWithBLOBs(UserDO record) {
        return userDOMapper.updateByPrimaryKeyWithBLOBs(record);
    }

    @Override
    public int updateByPrimaryKey(UserDO record) {
        return userDOMapper.updateByPrimaryKey(record);
    }

    @Override
    public List<UserDO> selectAllUser() {
        return userDOMapper.selectAllUser();
    }

    @Override
    public int deleteByUsername(String username) {
        return userDOMapper.deleteByUsername(username);
    }

}
