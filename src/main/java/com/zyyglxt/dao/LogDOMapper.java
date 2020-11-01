package com.zyyglxt.dao;

import com.zyyglxt.dataobject.LogDO;
import org.springframework.stereotype.Repository;

@Repository
public interface LogDOMapper {
    void saveLogDO(LogDO logDO);
}