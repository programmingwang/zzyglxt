package com.zyyglxt.service.impl;

import com.zyyglxt.dao.ChineseCulturalDOMapper;
import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.util.DateUtils;
import com.zyyglxt.util.UUIDUtils;
import com.zyyglxt.service.IComicGameService;
import com.zyyglxt.util.DOKeyAndValidateUtil;
import com.zyyglxt.util.UsernameUtil;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/10/29 19:33
 * Version: 1.0
 */
@Service
public class ComicGameServiceImpl implements IComicGameService {
    @Resource
    private ChineseCulturalDOMapper chineseCulturalDOMapper;

    @Autowired
    private ValidatorImpl validator;

    @Autowired
    private UsernameUtil usernameUtil;

    @Override
    public ChineseCulturalDO getComicGame(ChineseCulturalDOKey key) {
        return chineseCulturalDOMapper.selectByPrimaryKey(key,"动漫游戏");
    }

    @Override
    public List<ChineseCulturalDO> getComicGameList(List<String> chineseCulturalStatus) {
        List<ChineseCulturalDO> chineseCulturalDOList = new ArrayList<>();
        for (String culturalStatus : chineseCulturalStatus) {
            chineseCulturalDOList.addAll(chineseCulturalDOMapper.selectChineseCulturalList("动漫游戏",culturalStatus));
        }
        return chineseCulturalDOList;

    }

    @Override
    @Transactional
    public int addComicGame(ChineseCulturalDO record) {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setCreater(usernameUtil.getOperateUser());
        record.setItemcreateat(DateUtils.getDate());
        record.setUpdater(usernameUtil.getOperateUser());
        record.setChineseCulturalType("动漫游戏");
        record.setChineseCulturalStatus("0");
        //如果前台没有插入图片或者附件，就自己生成uuid
        if(record.getItemcode() == null){
            record.setItemcode(UUIDUtils.getUUID());
        }
        return chineseCulturalDOMapper.insertSelective(record);
    }

    @Override
    @Transactional
    public int removeComicGame(ChineseCulturalDOKey key) {
        return chineseCulturalDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    @Transactional
    public int updateComicGame(ChineseCulturalDO record){
        return DOKeyAndValidateUtil.updateUtil(record, validator, chineseCulturalDOMapper,usernameUtil);
    }

    @Override
    public int changeComicGameStatus(ChineseCulturalDOKey key, String chineseCulturalStatus) {
        return chineseCulturalDOMapper.changeStatusByPrimaryKeySelective(key,chineseCulturalStatus);
    }
}
