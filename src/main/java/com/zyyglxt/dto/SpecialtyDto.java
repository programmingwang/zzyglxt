package com.zyyglxt.dto;

import com.zyyglxt.dataobject.SpecialtyDO;

import java.util.Date;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/11/1 9:47
 */
public class SpecialtyDto extends SpecialtyDO {
    private String hospitalCode;

    public String getHospitalCode() {
        return hospitalCode;
    }

    public void setHospitalCode(String hospitalCode) {
        this.hospitalCode = hospitalCode;
    }
}
