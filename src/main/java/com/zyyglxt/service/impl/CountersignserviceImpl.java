package com.zyyglxt.service.impl;

import com.zyyglxt.dao.CountersignDOMapper;
import com.zyyglxt.dataobject.CountersignDO;
import com.zyyglxt.service.ICountersignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

@Service
public class CountersignserviceImpl implements ICountersignService {

    @Autowired
    CountersignDOMapper countersignDOMapper;

    @Override
    public CountersignDO selectByItemcode(String itemcode) {
        return countersignDOMapper.selectByItemcode(itemcode);
    }
}
