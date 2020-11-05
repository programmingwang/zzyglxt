package com.zyyglxt.service;

import com.zyyglxt.dataobject.DictItem;

import java.util.List;

/**
 * @Author lrt
 * @Date 2020/11/2 16:46
 * @Version 1.0
 **/
public interface IDictService {

    List<DictItem> getDictMapByCode(String dictCode);
}
