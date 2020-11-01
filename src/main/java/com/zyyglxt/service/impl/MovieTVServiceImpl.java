package com.zyyglxt.service.impl;

import com.zyyglxt.dao.ChineseCulturalDOMapper;
import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;
import com.zyyglxt.service.IMovieTVService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/10/29 19:33
 * Version: 1.0
 */
@Service
public class MovieTVServiceImpl implements IMovieTVService {
    @Resource
    private ChineseCulturalDOMapper chineseCulturalDOMapper;

    @Override
    public ChineseCulturalDO getMovieTV(ChineseCulturalDOKey key) {
        return chineseCulturalDOMapper.selectByPrimaryKey(key,"电视电影");
    }

    @Override
    public List<ChineseCulturalDO> getMovieTVList() {
        return chineseCulturalDOMapper.selectChineseCulturalList("电视电影");
    }

    @Override
    @Transactional
    public int addMovieTV(ChineseCulturalDO record) {
        chineseCulturalDOMapper.insertSelective(record);
        record.setItemcreateat(new Date());
        record.setCreater("");
        record.setItemupdateat(new Date());
        record.setUpdater("");
        record.setChineseCulturalType("电视电影");
        return 0;
    }

    @Override
    @Transactional
    public int removeMovieTV(ChineseCulturalDOKey key) {
        return chineseCulturalDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    @Transactional
    public int updateMovieTV(ChineseCulturalDO record) {
        ChineseCulturalDOKey key = new ChineseCulturalDOKey();
        key.setItemid(record.getItemid());
        key.setItemcode(record.getItemcode());
        record.setUpdater("");
        record.setItemupdateat(new Date());
        return chineseCulturalDOMapper.updateByPrimaryKeySelective(key,record);
    }

    @Override
    public int changeMovieStatus(ChineseCulturalDOKey key, String chineseCulturalStatus) {
        return chineseCulturalDOMapper.changeStatusByPrimaryKeySelective(key,chineseCulturalStatus);
    }
}
