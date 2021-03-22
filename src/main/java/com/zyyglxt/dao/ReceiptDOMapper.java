package com.zyyglxt.dao;

import com.zyyglxt.dataobject.PostFileDO;
import com.zyyglxt.dataobject.ReceiptDO;
import com.zyyglxt.dataobject.ReceiptDOKey;
import com.zyyglxt.dto.PostDto;
import com.zyyglxt.dto.ReceiptDto;
import com.zyyglxt.dto.ReceiptMainDto;
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

    List<ReceiptDto> getDeputyDirector(@Param("receiptReasonl") String receiptReasonl);

    ReceiptDO selectByPrimaryKey(ReceiptDOKey key);

    ReceiptDto selectOneForMainPage(@Param("key") ReceiptDOKey key);

    int updateByPrimaryKeySelective(ReceiptDO record);

    int updateByPrimaryKey(ReceiptDO record);

    List<ReceiptDto> selectAllReceipt(@Param("receivingDataStatus") String receivingDataStatus);//查询所有收文管理数据

    int changeStatusToReceipt(@Param("key") ReceiptDOKey key ,@Param("receivingDataStatus") String receivingDataStatus);//收文管理数据状态

    List<ReceiptMainDto> selectForMainPage();

    //PostFileDO只是存储了filename和filepath，这里就不另建一个receiptFileDO来区分了
    List<PostFileDO> selectReceiptFileForMain();
}