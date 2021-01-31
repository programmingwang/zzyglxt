package com.zyyglxt.service;

import com.zyyglxt.dataobject.CountersignDO;

public interface ICountersignService {
    CountersignDO selectByItemcode(String itemcode);
}
