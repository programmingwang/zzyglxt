package com.zyyglxt.service.impl;

import com.zyyglxt.dao.PostDOMapper;
import com.zyyglxt.dataobject.PostDO;
import com.zyyglxt.dataobject.PostDOKey;
import com.zyyglxt.dataobject.validation.ValidationGroups;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.IPostService;
import com.zyyglxt.util.DateUtils;
import com.zyyglxt.util.UUIDUtils;
import com.zyyglxt.util.UsernameUtil;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
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

    @Autowired
    UsernameUtil usernameUtil;


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
    public List<PostDO> getPost(List<String> postDataStatus) {
        List<PostDO> postDOList = new ArrayList<>();
        for (String status : postDataStatus) {
            postDOList.addAll(postDOMapper.selectAll(status));
        }
        return postDOList;
    }

    @Override
    public PostDO maxNum() {
        return postDOMapper.maxNum();
    }
}
