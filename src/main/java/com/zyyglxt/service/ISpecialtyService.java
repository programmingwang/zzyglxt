package com.zyyglxt.service;

import com.zyyglxt.dataobject.HospSpecialtyRefDO;
import com.zyyglxt.dataobject.HospSpecialtyRefDOKey;
import com.zyyglxt.dataobject.SpecialtyDO;
import com.zyyglxt.dataobject.SpecialtyDOKey;
import com.zyyglxt.dto.MedicalServiceDto;
import com.zyyglxt.dto.SpecialtyDto;

import java.util.List;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/10/29 17:32
 */
public interface ISpecialtyService {
    void addSpecialty(SpecialtyDto specialtyDto);
    void updateSpecialty(SpecialtyDto specialtyDto);
    void deleteSpecialty(SpecialtyDOKey specialtyDOKey);
    List<SpecialtyDO> selectAllSpecialty(List<String> specialtyStatus);
    List<SpecialtyDO> searchSpecialty(String keyWord);
    List<SpecialtyDO> selectByHospCode(String hospCode);
    int updateStatus(MedicalServiceDto medicalServiceDto);
}
