package com.zyyglxt.service;

import com.zyyglxt.dataobject.PostDO;
import com.zyyglxt.dataobject.PostDOKey;
import com.zyyglxt.dto.PostDto;

import java.util.List;

/**
 * @Author huangtao
 * @Date 2021/1/1 22:16
 * @Version 1.0
 */
public interface IPostService {
    void delPost(PostDOKey key);

    void createPost(PostDO record);

    void updatePost(PostDO record);

    List<PostDO> getPost(List<String> postDataStatus);

    PostDO maxNum();

    List<PostDto> getPandA();
}
