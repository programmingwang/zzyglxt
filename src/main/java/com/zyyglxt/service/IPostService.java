package com.zyyglxt.service;

import com.zyyglxt.dataobject.FileDO;
import com.zyyglxt.dataobject.PostDO;
import com.zyyglxt.dataobject.PostDOKey;
import com.zyyglxt.dataobject.PostFileDO;
import com.zyyglxt.dto.PostDto;
import com.zyyglxt.dto.PostMainPageDto;

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

    List<PostDto> getPost(String postDataStatus);

    List<PostDto> getSend(String receiverId);

    List<PostDto> getDeputyDirector(String postOpinion1);

    PostDO maxNum();

    List<PostFileDO> getPostFileForMain();

    List<PostMainPageDto> getPostForMainPage(String status);

    PostDto selOneWithFile(Integer itemid, String itemcode);
}
