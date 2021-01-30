package com.zyyglxt.dao;

import com.zyyglxt.dataobject.IndustrialDevelopTopicDO;
import com.zyyglxt.dataobject.IndustrialDevelopTopicDOKey;
import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopTopicDODto;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface IndustrialDevelopTopicDOMapper {

    int deleteByPrimaryKey(IndustrialDevelopTopicDOKey key);

    int insert(IndustrialDevelopTopicDO record);

    int insertSelective(IndustrialDevelopTopicDO record);

    List<IndustrialDevelopTopicDO> selectByPrimaryKey(@Param("userCode") String userCode);

    IndustrialDevelopTopicDO selectByItemCode(@Param("itemcode") String itemCode);

    int updateByPrimaryKeySelective(IndustrialDevelopTopicDO record);

    int updateByPrimaryKey(IndustrialDevelopTopicDO record);

    List<IndustrialDevelopTopicDO> selectByPage(int start, int end);

    List<IndustrialDevelopTopicDODto> selectAll(@Param("examineStatus") String examineStatus);

    //更改项目状态
    int changeStatus(@Param("key") IndustrialDevelopTopicDOKey key, @Param("status") String status);

    //更改审核状态
    int changeExamineStatus(@Param("key") IndustrialDevelopTopicDOKey key, @Param("examineStatus") String examineStatus);

    List<IndustrialDevelopTopicDODto> selectByUserCode(@Param("userCode") String userCode);

    List<IndustrialDevelopTopicDODto> selectByCompany(@Param("company") String company);

    IndustrialDevelopTopicDO maxProjectNO();

    List<IndustrialDevelopTopicDO> getAll(@Param("examineStatus") String examineStatus);

}