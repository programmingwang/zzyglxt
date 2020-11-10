package com.zyyglxt.service;

import com.zyyglxt.dataobject.IndustrialDevelopTalRecDO;
import com.zyyglxt.dataobject.IndustrialDevelopTalRecDOKey;

import java.util.List;

/**
 * @Author lrt
 * @Date 2020/10/29 16:45
 * @Version 1.0
 * 人才招募业务
 **/
public interface IIndustrialDevelopTalRecService {

    void addTalRec(IndustrialDevelopTalRecDO developTalRecDO);

    void delTalRec(IndustrialDevelopTalRecDOKey key);

    void updTalRec(IndustrialDevelopTalRecDO developTalRecDO);

    List<IndustrialDevelopTalRecDO> getTalRecs();
}
