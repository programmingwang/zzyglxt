package com.zyyglxt.service;

import com.zyyglxt.dataobject.IndustrialDevelopExpertDO;
import com.zyyglxt.dataobject.IndustrialDevelopExpertDOKey;

/**
 * @Author lrt
 * @Date 2020/10/29 15:17
 * @Version 1.0
 **/
public interface IIndustrialExpert {

    void addExpert(IndustrialDevelopExpertDO developExpertDO);

    void delExpert(IndustrialDevelopExpertDOKey key);

    void updExpert(IndustrialDevelopExpertDO developExpertDO);
}
