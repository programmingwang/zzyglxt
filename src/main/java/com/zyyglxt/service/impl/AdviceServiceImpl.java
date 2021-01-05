package com.zyyglxt.service.impl;

import com.zyyglxt.dataobject.adviceDO;
import com.zyyglxt.dataobject.adviceDOKey;
import com.zyyglxt.service.IAdviceService;
import org.springframework.stereotype.Service;

/**
 * @Author huangtao
 * @Date 2021/1/3 10:47
 * @Version 1.0
 */
@Service
public class AdviceServiceImpl implements IAdviceService {
    @Override
    public int deleteByPrimaryKey(adviceDOKey key) {
        return 0;
    }

    @Override
    public int insertSelective(adviceDO record) {
        return 0;
    }

    @Override
    public adviceDO selectByPrimaryKey(adviceDOKey key) {
        return null;
    }

    @Override
    public int updateByPrimaryKeySelective(adviceDO record) {
        return 0;
    }
}
