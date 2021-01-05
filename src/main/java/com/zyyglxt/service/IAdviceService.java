package com.zyyglxt.service;

import com.zyyglxt.dataobject.adviceDO;
import com.zyyglxt.dataobject.adviceDOKey;

/**
 * @Author huangtao
 * @Date 2021/1/3 10:46
 * @Version 1.0
 */
public interface IAdviceService {
    int deleteByPrimaryKey(adviceDOKey key);

    int insertSelective(adviceDO record);

    adviceDO selectByPrimaryKey(adviceDOKey key);

    int updateByPrimaryKeySelective(adviceDO record);

}
