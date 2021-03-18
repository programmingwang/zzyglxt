package com.zyyglxt.service.impl;

import com.zyyglxt.dao.PostDOMapper;
import com.zyyglxt.dataobject.*;
import com.zyyglxt.dataobject.validation.ValidationGroups;
import com.zyyglxt.dto.PostDto;
import com.zyyglxt.dto.PostMainPageDto;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.IAdviceService;
import com.zyyglxt.service.IPostService;
import com.zyyglxt.util.DateUtils;
import com.zyyglxt.util.UUIDUtils;
import com.zyyglxt.util.UsernameUtil;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.apache.commons.lang3.ObjectUtils;
import org.ehcache.Cache;
import org.ehcache.CacheManager;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * @Author huangtao
 * @Date 2021/1/1 22:18
 * @Version 1.0
 */
@Service
public class PostServiceImpl implements IPostService {
    @Resource
     PostDOMapper postDOMapper;

    @Resource
    ValidatorImpl validator;

    @Resource
    UsernameUtil usernameUtil;

    @Resource
    IAdviceService adviceService;

    @Resource
    private CacheManager cacheManager;

    @Override
    public void delPost(PostDOKey key) {
        ValidatorResult result = validator.validate(key, ValidationGroups.UpdateOrDelete.class);
        if (result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        postDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    public void createPost(PostDO record) {
        record.setCreater(usernameUtil.getOperateUser());
        record.setItemcreateat(DateUtils.getDate());
        ValidatorResult result = validator.validate(record, ValidationGroups.Insert.class);
        if (result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        if (record.getItemcode() == null || record.getItemcode().isEmpty()){
            record.setItemcode(UUIDUtils.getUUID());
        }
        postDOMapper.insertSelective(record);
    }

    @Override
    public void updatePost(PostDO record) {
        record.setUpdater(usernameUtil.getOperateUser());
        record.setItemupdateat(DateUtils.getDate());
        ValidatorResult result = validator.validate(record,ValidationGroups.UpdateOrDelete.class);
        if (result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        postDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public List<PostDto> getPost(String postDataStatus) {
        return postDOMapper.selectAll(postDataStatus);
    }

    @Override
    public List<PostDto> getSend(String receiverId) {
        return postDOMapper.getSend(receiverId);
    }

    @Override
    public List<PostDto> getDeputyDirector(String postOpinion1) {
        return postDOMapper.getDeputyDirector(postOpinion1);
    }

    @Override
    public PostDO maxNum() {
        return postDOMapper.maxNum();
    }

    @Override
    public List<PostFileDO> getPostFileForMain() {
        //获得缓存
        Cache<Object, Object> mainPagePostFile = cacheManager.getCache("mainPageData", Object.class, Object.class);
        Object postFileData = mainPagePostFile.get("PostFileData");
        //缓存判空
        if(ObjectUtils.allNotNull(postFileData)){
            //如果不是空，则直接将缓存数据给前台
            return (List<PostFileDO>) postFileData;
        }else {
            //如果是空，则查询数据库，将数据重新放入本地缓存中
            List<PostFileDO> postFile = postDOMapper.selectPostFileForMain();
            mainPagePostFile.put("PostFileData",postFile);
            return postFile;
        }
    }

    @Override
    public List<PostMainPageDto> getPostForMainPage(String status) {
        //获得缓存
        Cache<Object, Object> mainPagePostTitle = cacheManager.getCache("mainPageData", Object.class, Object.class);
        Object postTitleData = mainPagePostTitle.get("PostTitleData");
        //缓存判空
        if(ObjectUtils.allNotNull(postTitleData)){
            //如果不是空，则直接将缓存数据给前台
            return (List<PostMainPageDto>) postTitleData;
        }else {
            //如果是空，则查询数据库，将数据重新放入本地缓存中
            List<PostMainPageDto> postTitle = postDOMapper.selectForMainPage(status);
            mainPagePostTitle.put("PostTitleData",postTitle);
            return postTitle;
        }
    }

    @Override
    public PostDto selOneWithFile(Integer itemid, String itemcode) {
        PostDOKey key = new PostDOKey();
        key.setItemid(itemid);
        key.setItemcode(itemcode);
        return postDOMapper.selectOneWithFile(key);
    }

}
