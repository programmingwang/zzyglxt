package com.zyyglxt.service;

import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;
import com.zyyglxt.error.BusinessException;

import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/10/29 19:25
 * Version: 1.0
 * 电视电影业务
 */
public interface IMovieTVService {
    //查询一个电视电影
    ChineseCulturalDO getMovieTV(ChineseCulturalDOKey key);

    //查询所有电视电影
    List<ChineseCulturalDO> getMovieTVList();

    //增加一个电视电影
    int addMovieTV(ChineseCulturalDO record);

    //删除一个电视电影
    int removeMovieTV(ChineseCulturalDOKey key);

    //修改一个电视电影
    int updateMovieTV(ChineseCulturalDO record);

    //修改一个电视电影状态
    int changeMovieStatus(ChineseCulturalDOKey key, String chineseCulturalStatus);
}
