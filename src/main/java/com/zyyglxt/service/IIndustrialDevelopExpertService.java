package com.zyyglxt.service;


import com.zyyglxt.dataobject.UserDO;
import com.zyyglxt.dataobject.UserRoleRefDO;
import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopExpertDto;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @Author zs
 * @Date 2020/11/15 17:15
 * @Version 1.0
 **/
public interface IIndustrialDevelopExpertService {

    //新增专家信息
    String addExpert(IndustrialDevelopExpertDto record);
    //删除专家信息
    int delExpert(String userCode);
    //重置密码
    int resetPassword( @Param("userCode") String userCode);
    //查看所有专家信息
    List<IndustrialDevelopExpertDto> getExperts();
    //查看专家个人信息
    UserDO selectByPrimaryKey(String userCode);
    String selectByUserCode(String userCode);

}
