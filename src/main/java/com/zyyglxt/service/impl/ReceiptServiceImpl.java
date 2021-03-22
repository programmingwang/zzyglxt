package com.zyyglxt.service.impl;

import com.zyyglxt.dao.ReceiptDOMapper;
import com.zyyglxt.dataobject.PostFileDO;
import com.zyyglxt.dataobject.ReceiptDO;
import com.zyyglxt.dataobject.ReceiptDOKey;
import com.zyyglxt.dto.PostMainPageDto;
import com.zyyglxt.dto.ReceiptDto;
import com.zyyglxt.dto.ReceiptMainDto;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.IReceiptDOService;
import com.zyyglxt.util.UUIDUtils;
import com.zyyglxt.util.UsernameUtil;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.ehcache.Cache;
import org.ehcache.CacheManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/12/26 14:26
 */
@Service
public class ReceiptServiceImpl implements IReceiptDOService {
    @Resource
    private ReceiptDOMapper receiptDOMapper;
    @Autowired
    private ValidatorImpl validator;
    @Autowired
    private UsernameUtil usernameUtil;
    @Resource
    private CacheManager cacheManager;

    @Transactional
    @Override
    public int insertSelective(ReceiptDO record) {
        if(StringUtils.isEmpty(record.getItemcode())){
            record.setItemcode(UUIDUtils.getUUID());
        }
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setItemcreateat(new Date());
        record.setCreater(usernameUtil.getOperateUser());
        return receiptDOMapper.insertSelective(record);
    }

    @Override
    public int deleteByPrimaryKey(ReceiptDOKey key) {
        receiptDOMapper.deleteByPrimaryKey(key);
        return 0;
    }

    @Override
    public int updateByPrimaryKeySelective(ReceiptDO record) {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setItemupdateat(new Date());
        record.setUpdater(usernameUtil.getOperateUser());
        return receiptDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public ReceiptDO selectByPrimaryKey(ReceiptDOKey key) {
        return receiptDOMapper.selectByPrimaryKey(key);
    }

    @Override
    public List<ReceiptDto> getDeputyDirector(String receiptReasonl) {
        return receiptDOMapper.getDeputyDirector(receiptReasonl);
    }

    @Override
    public List<ReceiptDto> selectAllReceipt(String receivingDataStatus) {
        return receiptDOMapper.selectAllReceipt(receivingDataStatus);
    }

    @Override
    public int changeStatusToReceipt(ReceiptDOKey key, String receivingDataStatus) {
        return receiptDOMapper.changeStatusToReceipt(key,receivingDataStatus);
    }

    @Override
    public List<ReceiptMainDto> selectForMain() {
        //获得缓存
        Cache<Object, Object> mainPagePostTitle = cacheManager.getCache("mainPageData", Object.class, Object.class);
        Object postTitleData = mainPagePostTitle.get("ReceiptTitleData");
        //缓存判空
        if(ObjectUtils.allNotNull(postTitleData)){
            //如果不是空，则直接将缓存数据给前台
            return (List<ReceiptMainDto>) postTitleData;
        }else {
            List<ReceiptMainDto> receiptTitle = receiptDOMapper.selectForMainPage();
            //如果是空，则查询数据库，将数据重新放入本地缓存中
            mainPagePostTitle.put("ReceiptTitleData",receiptTitle);
            return receiptTitle;
        }
    }

    @Override
    public ReceiptDto selectOneWithFile(Integer itemid, String itemCode) {
        ReceiptDOKey key = new ReceiptDOKey();
        key.setItemcode(itemCode);
        key.setItemid(itemid);
        return receiptDOMapper.selectOneForMainPage(key);
    }

    @Override
    public List<PostFileDO> getReceiptFileForMain() {
        return receiptDOMapper.selectReceiptFileForMain();
    }
}
