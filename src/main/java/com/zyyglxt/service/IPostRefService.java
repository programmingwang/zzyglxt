package com.zyyglxt.service;

import com.zyyglxt.dataobject.PostRefDO;
import com.zyyglxt.dataobject.PostRefDOKey;

import java.util.List;

/**
 * @Author huangtao
 * @Date 2021/1/2 14:39
 * @Version 1.0
 */
public interface IPostRefService {
    int deleteByPrimaryKey(PostRefDOKey key);

    int insertSelective(PostRefDO record);

    PostRefDO selectByPrimaryKey(PostRefDOKey key);

    int updateByPrimaryKeySelective(PostRefDO record);

    void delByDateCode(String dateCode,Integer receiverType);

    void updPostRef(PostRefDO postRefDO);

    List<PostRefDO> getMasterSend(List<String> dateCode);

    List<PostRefDO> getCopySend(List<String> dateCode);

}
