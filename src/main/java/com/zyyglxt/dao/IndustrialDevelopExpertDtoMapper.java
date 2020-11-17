package com.zyyglxt.dao;

import com.zyyglxt.dataobject.UserDO;
import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopExpertDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
/**
 * @Author zs
 * @Date 2020/11/15 17:15
 * @Version 1.0
 **/
@Mapper
public interface IndustrialDevelopExpertDtoMapper {
    //删除专家信息
    int deleteByPrimaryKey(@Param("itemcode") String itemcode);
    //新增专家信息
    int insertSelective(IndustrialDevelopExpertDto record);
    //查看专家个人信息
    UserDO selectByPrimaryKey(@Param("itemcode") String itemcode);
    //重置密码
    int resetPassword(@Param("itemid") Integer itemid, @Param("itemcode") String itemcode,@Param("password") String password);
    //查看所有专家信息
    List<IndustrialDevelopExpertDto> selectAll();
}
