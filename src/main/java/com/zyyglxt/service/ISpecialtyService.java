package com.zyyglxt.service;

import com.zyyglxt.dataobject.HospSpecialtyRefDO;
import com.zyyglxt.dataobject.HospSpecialtyRefDOKey;
import com.zyyglxt.dataobject.SpecialtyDO;
import com.zyyglxt.dataobject.SpecialtyDOKey;

import java.util.List;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/10/29 17:32
 */
public interface ISpecialtyService {
    void addSpecialty(SpecialtyDO specialtyDO, HospSpecialtyRefDO hospSpecialtyRefDO);
    void updateSpecialty(SpecialtyDO specialtyDO, HospSpecialtyRefDO hospSpecialtyRefDO);
    void deleteSpecialty(SpecialtyDOKey specialtyDOKey, HospSpecialtyRefDOKey hospSpecialtyRefDOKey);
    List<SpecialtyDO> selectAllSpecialty();
    List<SpecialtyDO> searchSpecialty(String keyWord);
    List<SpecialtyDO> top5Specialty();
}
