package com.zyyglxt.dao;

import com.zyyglxt.dataobject.ReceiptDO;
import com.zyyglxt.dataobject.ReceiptDOKey;

public interface ReceiptDOMapper {
    int deleteByPrimaryKey(ReceiptDOKey key);

    int insert(ReceiptDO record);

    int insertSelective(ReceiptDO record);

    ReceiptDO selectByPrimaryKey(ReceiptDOKey key);

    int updateByPrimaryKeySelective(ReceiptDO record);

    int updateByPrimaryKey(ReceiptDO record);
}