package com.zyyglxt.service;

import com.zyyglxt.dataobject.IndustrialDevelopExpertDO;
import com.zyyglxt.dataobject.IndustrialDevelopExpertDOKey;
import com.zyyglxt.dataobject.IndustrialDevelopExpertRefDO;
import com.zyyglxt.dataobject.IndustrialDevelopExpertRefDOKey;

/**
 * @Author lrt
 * @Date 2020/10/29 15:17
 * @Version 1.0
 **/
public interface IIndustrialDevelopExpertService {

    //专家信息表
    void addExpert(IndustrialDevelopExpertDO record);

    void delExpert(IndustrialDevelopExpertDOKey key);

    void updExpert(IndustrialDevelopExpertDO record);

    //专家-课题关系表
    void addExpertRef(IndustrialDevelopExpertRefDO record);

    void delExpertRef(IndustrialDevelopExpertRefDOKey key);

    void updExpertRef(IndustrialDevelopExpertRefDO record);
}
