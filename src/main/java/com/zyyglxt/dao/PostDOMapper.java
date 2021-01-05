package com.zyyglxt.dao;

import com.zyyglxt.dataobject.PostDO;
import com.zyyglxt.dataobject.PostDOKey;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface PostDOMapper {
    int deleteByPrimaryKey(PostDOKey key);

    int insert(PostDO record);

    int insertSelective(PostDO record);

    PostDO selectByPrimaryKey(PostDOKey key);

    int updateByPrimaryKeySelective(PostDO record);

    int updateByPrimaryKey(PostDO record);

    List<PostDO> selectAll(@Param("postDataStatus") String postDataStatus);

    PostDO maxNum();
}