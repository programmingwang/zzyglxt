package com.zyyglxt.dao;

import com.zyyglxt.dataobject.ReceiptDO;
import com.zyyglxt.dataobject.ReceiptDOKey;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface ReceiptDOMapper {
    int deleteByPrimaryKey(ReceiptDOKey key);

    int insert(ReceiptDO record);

    int insertSelective(ReceiptDO record);

    ReceiptDO selectByPrimaryKey(ReceiptDOKey key);

    int updateByPrimaryKeySelective(ReceiptDO record);

    int updateByPrimaryKey(ReceiptDO record);

    List<ReceiptDO> selectAllReceipt(@Param("receivingDataStatus") String receivingDataStatus);//查询所有收文管理数据

    int changeStatusToReceipt(@Param("key") ReceiptDOKey key ,@Param("receivingDataStatus") String receivingDataStatus);//收文管理数据状态
}