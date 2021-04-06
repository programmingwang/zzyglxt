package com.zyyglxt.dao;

import com.zyyglxt.dataobject.PostDO;
import com.zyyglxt.dataobject.PostDOKey;
import com.zyyglxt.dataobject.PostFileDO;
import com.zyyglxt.dto.PostDto;
import com.zyyglxt.dto.PostMainPageDto;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface PostDOMapper {
    int deleteByPrimaryKey(PostDOKey key);

    int insert(PostDO record);

    int insertSelective(PostDO record);

    PostDO selectByPrimaryKey(PostDOKey key);

    PostDto selectOneWithFile(@Param("key") PostDOKey key);

    int updateByPrimaryKeySelective(PostDO record);

    int updateByPrimaryKey(PostDO record);

    List<PostDto> selectAll(@Param("postDataStatus") String postDataStatus);

    List<PostDto> getSend(@Param("receiverId") String receiverId);

    List<PostDto> getDeputyDirector(@Param("postOpinion1") String postOpinion1);

    PostDO maxNum();

    List<PostFileDO> selectPostFileForMain();

    List<PostMainPageDto> selectForMainPage(String status);

}