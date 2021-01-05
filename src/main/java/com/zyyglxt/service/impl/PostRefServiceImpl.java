package com.zyyglxt.service.impl;

import com.zyyglxt.dao.PostRefDOMapper;
import com.zyyglxt.dataobject.PostRefDO;
import com.zyyglxt.dataobject.PostRefDOKey;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.IPostRefService;
import com.zyyglxt.util.UUIDUtils;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

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

    @Override
    public int deleteByPrimaryKey(PostRefDOKey key) {
        return postRefDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    public int insertSelective(PostRefDO record) {
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

}
