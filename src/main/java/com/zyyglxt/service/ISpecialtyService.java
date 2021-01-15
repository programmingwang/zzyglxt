package com.zyyglxt.service;

import com.zyyglxt.dataobject.SpecialtyDO;
import com.zyyglxt.dataobject.SpecialtyDOKey;
import com.zyyglxt.dto.StatusDto;
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
    List<SpecialtyDto> selectAllSpecialty(List<String> specialtyStatus);
    List<SpecialtyDto> searchSpecialty(String keyWord);
    List<SpecialtyDto> selectByHospCode(String hospCode);
    int updateStatus(StatusDto statusDto);
}
