package com.zyyglxt.service;

import com.zyyglxt.dataobject.PostFileDO;
import com.zyyglxt.dataobject.ReceiptDO;
import com.zyyglxt.dataobject.ReceiptDOKey;
import com.zyyglxt.dto.PostDto;
import com.zyyglxt.dto.ReceiptDto;
import com.zyyglxt.dto.ReceiptMainDto;

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
    List<ReceiptDto> getDeputyDirector(String receiptReasonl);
    List<ReceiptDto> selectAllReceipt(String receivingDataStatus);//查询所有收文管理数据
    int changeStatusToReceipt( ReceiptDOKey key ,String receivingDataStatus);//收文管理数据状态
    //查询为首页定制的五条数据
    List<ReceiptMainDto> selectForMain();
    //查询一个带文件的
    ReceiptDto selectOneWithFile(Integer itemid, String itemcode);
    List<PostFileDO> getReceiptFileForMain();
}
