package com.zyyglxt.service.impl;

import com.zyyglxt.dao.DictMapper;
import com.zyyglxt.dataobject.DictItem;
import com.zyyglxt.service.IDictService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author lrt
 * @Date 2020/11/2 16:47
 * @Version 1.0
 **/
@Service
public class DictServiceImpl implements IDictService {
    @Resource
    DictMapper dictMapper;

    @Override
    public List<DictItem> getDictListByCode(String dictCode) {

        return dictMapper.selectDictItemByCode(dictCode);
    }

    @Override
    public Map<String, String> getDictMapByCode(String dictCode) {
        Map<String,String> map = new HashMap<>();
        List<DictItem> list = dictMapper.selectDictItemByCode(dictCode);
        for (DictItem item: list)
        {
            map.put(item.getCode(),item.getValue());
        }
        return map;
    }
}
