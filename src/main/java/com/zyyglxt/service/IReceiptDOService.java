package com.zyyglxt.service;

import com.zyyglxt.dataobject.ReceiptDO;
import com.zyyglxt.dataobject.ReceiptDOKey;
import com.zyyglxt.dto.ReceiptDto;

import java.util.List;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/12/26 14:23
 */
public interface IReceiptDOService {
    int insertSelective(ReceiptDO record);
    int deleteByPrimaryKey(ReceiptDOKey key);
    int updateByPrimaryKeySelective(ReceiptDO record);
    ReceiptDO selectByPrimaryKey(ReceiptDOKey key);
    List<ReceiptDto> selectAllReceipt(String receivingDataStatus);//查询所有收文管理数据
    int changeStatusToReceipt( ReceiptDOKey key ,String receivingDataStatus);//收文管理数据状态
}
