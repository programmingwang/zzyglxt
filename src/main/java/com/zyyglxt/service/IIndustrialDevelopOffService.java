package com.zyyglxt.service;

import com.zyyglxt.dataobject.IndustrialDevelopOffDO;
import com.zyyglxt.dataobject.IndustrialDevelopOffDOKey;

/**
 * @Author lrt
 * @Date 2020/10/29 17:26
 * @Version 1.0
 **/
public interface IIndustrialDevelopOffService {

    void addOff(IndustrialDevelopOffDO record);

    void updOff(IndustrialDevelopOffDO record);

    void delOff(IndustrialDevelopOffDOKey key);
}
