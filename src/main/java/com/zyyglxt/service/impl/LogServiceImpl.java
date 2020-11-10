package com.zyyglxt.service.impl;


import com.zyyglxt.dao.LogDOMapper;
import com.zyyglxt.dataobject.LogDO;
import com.zyyglxt.service.ILogService;
import com.zyyglxt.util.DateUtils;
import com.zyyglxt.util.UUIDUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class LogServiceImpl implements ILogService {


    @Autowired
    LogDOMapper logDOMapper;
    @Override
    @Transactional
    public void saveLogDO(LogDO logDO) {
        logDO.setItemcode(UUIDUtils.getUUID());
        logDO.setItemcreateat(DateUtils.getDate());
        logDOMapper.saveLogDO(logDO);
    }
}
