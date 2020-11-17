package com.zyyglxt.service;


import com.zyyglxt.dataobject.UserDO;
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
    void addExpert(IndustrialDevelopExpertDto record);
    //删除专家信息
    int delExpert(String itemCode);
    //重置密码
    int resetPassword(@Param("itemid") Integer itemid, @Param("itemcode") String itemcode);
    //查看所有专家信息
    List<IndustrialDevelopExpertDto> getExperts();
    //查看专家个人信息
    UserDO selectByPrimaryKey(String itemcode);

}
