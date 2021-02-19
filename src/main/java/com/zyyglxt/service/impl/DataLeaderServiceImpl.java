package com.zyyglxt.service.impl;

import com.zyyglxt.dao.DataDOMapper;
import com.zyyglxt.dataobject.DataDO;
import com.zyyglxt.dataobject.DataDOKey;
import com.zyyglxt.dto.DataDto;
import com.zyyglxt.dto.MainPageDto;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.IDataLeaderService;
import com.zyyglxt.service.IDataNewsService;
import com.zyyglxt.service.IDataLeaderService;
import com.zyyglxt.util.DateUtils;
import com.zyyglxt.util.UUIDUtils;
import com.zyyglxt.util.UsernameUtil;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.apache.commons.lang3.ObjectUtils;
import org.ehcache.Cache;
import org.ehcache.CacheManager;
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
public class DataLeaderServiceImpl implements IDataLeaderService {
    @Resource
    DataDOMapper dataDOMapper;

    @Autowired
    private ValidatorImpl validator;

    @Autowired
    private UsernameUtil usernameUtil;

    @Resource
    private CacheManager cacheManager;

    @Override
    public DataDto selectLeader(DataDOKey key) {
        return dataDOMapper.selectOneData(key,"领导讲话");
    }

    @Override
    public List<DataDto> selectLeaderList(String dataStatus) {
        return dataDOMapper.selectByAllData("领导讲话", dataStatus);
    }

    @Override
    public int insertLeader(DataDO record) {
        record.setDataDelayedRelease(new Date());

        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setItemcreateat(DateUtils.getDate());
        record.setCreater(usernameUtil.getOperateUser());
        record.setDataType("领导讲话");
        record.setUpdater(usernameUtil.getOperateUser());
        if(record.getItemcode() == null){
            record.setItemcode(UUIDUtils.getUUID());
        }
        return dataDOMapper.insertSelective(record);
    }

    @Override
    public int deleteLeader(DataDOKey key) {
        return dataDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    public int updateLeader(DataDO record) {
        record.setDataDelayedRelease(new Date());

        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setUpdater(usernameUtil.getOperateUser());
        record.setItemupdateat(DateUtils.getDate());
        return dataDOMapper.updateByPrimaryKeySelective(record);
    }


    @Override
    public int changeStatus(DataDOKey key, String dataDelayedRelease, String dataStatus) {
        return dataDOMapper.changeStatusByPrimaryKey(key, dataDelayedRelease, dataStatus);
    }

    @Override
    public List<MainPageDto> selectForMainPage() {
        //获得缓存
        Cache<Object, Object> mainPageLdjh = cacheManager.getCache("mainPageData", Object.class, Object.class);
        Object ldjhData = mainPageLdjh.get("LdjhData");
        //缓存判空
        if(ObjectUtils.allNotNull(ldjhData)){
            //如果不是空，则直接将缓存数据给前台
            return (List<MainPageDto>) ldjhData;
        }else {
            //如果是空，则查询数据库，将数据重新放入本地缓存中
            List<MainPageDto> ldjh = dataDOMapper.selectAllForMainPage("领导讲话");
            mainPageLdjh.put("LdjhData",ldjh);
            return ldjh;
        }
    }

}
