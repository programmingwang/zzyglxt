package com.zyyglxt.service.impl;

import com.zyyglxt.dao.PostRefDOMapper;
import com.zyyglxt.dataobject.PostRefDO;
import com.zyyglxt.dataobject.PostRefDOKey;
import com.zyyglxt.dataobject.validation.ValidationGroups;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.IPostRefService;
import com.zyyglxt.util.UUIDUtils;
import com.zyyglxt.util.UsernameUtil;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * @Author huangtao
 * @Date 2021/1/2 14:41
 * @Version 1.0
 */
@Service
public class PostRefServiceImpl implements IPostRefService {
    @Resource
    PostRefDOMapper postRefDOMapper;

    @Resource
    ValidatorImpl validator;

    @Resource
    UsernameUtil usernameUtil;

    @Override
    public int deleteByPrimaryKey(PostRefDOKey key) {
        return postRefDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    public int insertSelective(PostRefDO record) {
        record.setCreater(usernameUtil.getOperateUser());
        record.setUpdater(usernameUtil.getOperateUser());
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setItemcode(UUIDUtils.getUUID());
        return postRefDOMapper.insertSelective(record);
    }

    @Override
    public PostRefDO selectByPrimaryKey(PostRefDOKey key) {
        return postRefDOMapper.selectByPrimaryKey(key);
    }

    @Override
    public int updateByPrimaryKeySelective(PostRefDO record) {
        return postRefDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public void delByDateCode(String dateCode,Integer receiverType) {
        ValidatorResult result = validator.validate(dateCode, ValidationGroups.UpdateOrDelete.class);
        if (result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        postRefDOMapper.delByDateCode(dateCode,receiverType);
    }

    @Override
    public void updPostRef(PostRefDO postRefDO) {
        postRefDO.setUpdater(usernameUtil.getOperateUser());
        ValidatorResult result = validator.validate(postRefDO,ValidationGroups.UpdateOrDelete.class);
        if (result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        postRefDOMapper.updPostRef(postRefDO);
    }

    @Override
    public List<PostRefDO> getMasterSend(List<String> dateCode) {
        List<PostRefDO> postRefDOS = new ArrayList<>();
        for (String status : dateCode) {
            postRefDOS.addAll(postRefDOMapper.getMasterSend(status));
        }
        return postRefDOS;
    }

    @Override
    public List<PostRefDO> getCopySend(List<String> dateCode) {
        List<PostRefDO> postRefDOS = new ArrayList<>();
        for (String status : dateCode) {
            postRefDOS.addAll(postRefDOMapper.getCopySend(status));
        }
        return postRefDOS;
    }

}
