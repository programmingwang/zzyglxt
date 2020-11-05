package com.zyyglxt.dataobject;

import lombok.Data;
import org.springframework.stereotype.Repository;

import javax.validation.constraints.NotBlank;
import java.util.Date;

@Data
public class HospSpecialtyRefDO extends HospSpecialtyRefDOKey {

    @NotBlank(message = "医院code不能为空")
    private String hospitalCode;
    @NotBlank(message = "专科code不能为空")
    private String specialtyCode;

    private String creater;

    private Date itemcreateat;

    private String updater;

    private Date itemupdateat;

}