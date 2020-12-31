package com.zyyglxt.dao;

import com.zyyglxt.dataobject.PostRefDO;
import com.zyyglxt.dataobject.PostRefDOKey;

public interface PostRefDOMapper {
    int deleteByPrimaryKey(PostRefDOKey key);

    int insert(PostRefDO record);

    int insertSelective(PostRefDO record);

    PostRefDO selectByPrimaryKey(PostRefDOKey key);

    int updateByPrimaryKeySelective(PostRefDO record);

    int updateByPrimaryKey(PostRefDO record);
}