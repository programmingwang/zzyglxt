package com.zyyglxt.service.impl;

import com.zyyglxt.dao.DataDOMapper;
import com.zyyglxt.dataobject.DataDO;
import com.zyyglxt.dataobject.DataDOKey;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.IDataAnnouncementService;
import com.zyyglxt.service.IDataNewsService;
import com.zyyglxt.util.DateUtils;
import com.zyyglxt.util.UUIDUtils;
import com.zyyglxt.util.UsernameUtil;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @Author huangtao
 * @Date 2020/10/29 10:18
 * @Version 1.0
 */

@Service
public class DataAnnouncementServiceImpl implements IDataAnnouncementService {
    @Resource
    DataDOMapper dataDOMapper;

    @Autowired
    private ValidatorImpl validator;

    @Autowired
    private UsernameUtil usernameUtil;

    @Override
    public DataDO selectAnnouncement(DataDOKey key) {
        return dataDOMapper.selectByPrimaryKey(key,"通知公告");
    }

    @Override
    public List<DataDO> selectAnnouncementList(List<String> dataStatus) {
        List<DataDO> dataDOList = new ArrayList<>();
        for (String status : dataStatus) {
            dataDOList.addAll(dataDOMapper.selectByAllData("通知公告", status));
        }
        return dataDOList;
    }

    @Override
    public int insertAnnouncement(DataDO record) {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setItemcreateat(DateUtils.getDate());
        record.setCreater(usernameUtil.getOperateUser());
        record.setDataType("通知公告");
        record.setDataStatus("0");
        if(record.getItemcode() == null){
            record.setItemcode(UUIDUtils.getUUID());
        }
        return dataDOMapper.insertSelective(record);
    }

    @Override
    public int deleteAnnouncement(DataDOKey key) {
        return dataDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    public int updateAnnouncement(DataDO record) {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setUpdater(usernameUtil.getOperateUser());
        record.setItemupdateat(DateUtils.getDate());
        return dataDOMapper.updateByPrimaryKeySelective(record);
    }


    @Override
    public int changeStatus(DataDOKey key, String dataStatus) {
        return dataDOMapper.changeStatusByPrimaryKey(key, dataStatus);
    }

    /**
     * 关键字搜索
     * @param keyWord
     * @return
     */
    @Override
    public List<DataDO> searchDataDO(String keyWord) {
        return dataDOMapper.searchDataDO(keyWord);
    }

}
