package com.zyyglxt.service;

import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;

import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/10/29 19:27
 * Version: 1.0
 * 动漫游戏业务
 */
public interface IComicGameService {
    //查询一个动漫游戏
    ChineseCulturalDO getComicGame(ChineseCulturalDOKey key);

    //查询所有动漫游戏
    List<ChineseCulturalDO> getComicGameList();

    //增加一个动漫游戏
    int addComicGame(ChineseCulturalDO record);

    //删除一个动漫游戏
    int removeComicGame(ChineseCulturalDOKey key);

    //修改一个动漫游戏
    int updateComicGame(ChineseCulturalDOKey key,ChineseCulturalDO record);

    //修改一个动漫游戏状态
}
