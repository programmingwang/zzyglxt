package com.zyyglxt.service.impl;

import com.zyyglxt.dao.DictMapper;
import com.zyyglxt.dataobject.DictItem;
import com.zyyglxt.service.IDictService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

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
    public List<DictItem> getDictMapByCode(String dictCode) {

        return dictMapper.selectDictItemByCode(dictCode);
    }
}
