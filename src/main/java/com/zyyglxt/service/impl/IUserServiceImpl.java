package com.zyyglxt.service.impl;

import com.zyyglxt.dao.UserDOMapper;
import com.zyyglxt.dataobject.UserDO;
import com.zyyglxt.dataobject.UserDOKey;
import com.zyyglxt.service.IUserService;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.ParseException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

/**
 * @Author nongcn
 * @Date 2020/10/29 11:25
 * @Version 1.0
 */
@Service
public class IUserServiceImpl implements IUserService {

    @Resource
    UserDOMapper userDOMapper;

    @Override
    public void Register(UserDO userDO) {
        // 生成UUID, 作为唯一标识UUID
        String itemCode = UUID.randomUUID().toString().replace("-", "");
        userDO.setItemcode(itemCode);

        // 拿到电话号码作为 盐 进行加密
        String mobilePhone = userDO.getMobilephone();
        // 将手机号码设置为 盐，存放到数据库中
        userDO.setSalt(mobilePhone);
        // 拿到前端输入的密码
        String password = userDO.getPassword();
        // 拿到 盐
        String salt = userDO.getSalt();
        // 加盐，实现密码加密
        password = DigestUtils.md5Hex(password + salt);
        userDO.setPassword(password);

        // 注册时，注册用户为 创建人和修改人
        userDO.setCreater(userDO.getUsername());
        // 获取当前系统时间作为 创建时间
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        try {
            Date date = df.parse(df.format(System.currentTimeMillis()));
            // 设置 创建时间
            userDO.setItemcreateat(date);
            // 设置 修改时间
            userDO.setItemupdateat(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        // 设置为普通用户，（0：普通，1：管理员）
        userDO.setType(0);

        userDOMapper.insertSelective(userDO);
    }

}
