package com.zyyglxt.service;

import com.zyyglxt.dataobject.IndustrialDevelopTalRecDO;
import com.zyyglxt.dataobject.IndustrialDevelopTalRecDOKey;
import com.zyyglxt.dataobject.IndustrialDevelopTalRecDOWithBLOBs;

/**
 * @Author lrt
 * @Date 2020/10/29 16:45
 * @Version 1.0
 * 人才招募业务
 **/
public interface IIndustrialDevelopTalRecService {

    void addTalRec(IndustrialDevelopTalRecDOWithBLOBs developTalRecDO);

    void delTalRec(IndustrialDevelopTalRecDOKey key);

    void updTalRec(IndustrialDevelopTalRecDOWithBLOBs developTalRecDO);
}
