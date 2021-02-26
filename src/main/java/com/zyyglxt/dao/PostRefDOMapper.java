package com.zyyglxt.dao;

import com.zyyglxt.dataobject.PostRefDO;
import com.zyyglxt.dataobject.PostRefDOKey;
import org.apache.ibatis.annotations.Param;

public interface PostRefDOMapper {
    int deleteByPrimaryKey(PostRefDOKey key);

    int insert(PostRefDO record);

    int insertSelective(PostRefDO record);

    PostRefDO selectByPrimaryKey(PostRefDOKey key);

    int updateByPrimaryKeySelective(PostRefDO record);

    int updateByPrimaryKey(PostRefDO record);

    int delByDateCode(@Param("dateCode") String dateCode);

    int updPostRef(PostRefDO postRefDO);

    PostRefDO getMasterSend(@Param("dateCode") String dateCode);

    PostRefDO getCopySend(@Param("dateCode") String dateCode);
}