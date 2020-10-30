package com.zyyglxt.service;

import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;

import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/10/29 19:27
 * Version: 1.0
 * 漫画典故业务
 */
public interface ICartoonAllusionsService {
    //查询一个漫画典故
    ChineseCulturalDO getCartoonAllusions(ChineseCulturalDOKey key);

    //查询所有漫画典故
    List<ChineseCulturalDO> getCartoonAllusionsList();

    //增加一个漫画典故
    int addCartoonAllusions(ChineseCulturalDO record);

    //删除一个漫画典故
    int removeCartoonAllusions(ChineseCulturalDOKey key);

    //修改一个漫画典故
    int updateCartoonAllusions(ChineseCulturalDOKey key,ChineseCulturalDO record);

    //修改一个漫画典故状态
}
