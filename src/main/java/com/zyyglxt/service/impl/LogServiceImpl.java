package com.zyyglxt.service.impl;


import com.zyyglxt.dao.LogDOMapper;
import com.zyyglxt.dataobject.LogDO;
import com.zyyglxt.service.ILogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LogServiceImpl implements ILogService {


    @Autowired
    LogDOMapper logDOMapper;
    @Override
    @Transactional
    public void saveLogDO(LogDO logDO) {
        logDOMapper.saveLogDO(logDO);
    }
}
