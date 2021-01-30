package com.zyyglxt.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.zyyglxt.dataobject.IndustrialDevelopExpertRefDO;
import com.zyyglxt.dataobject.validation.ValidationGroups;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * Author:wangzh
 * Date: 2020/11/21 12:57
 * Version: 1.0
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
@ToString
public class ExmaineDto extends IndustrialDevelopExpertRefDO {
    private String projectNo;
    private String projectName;
    private String disciplineCode;
    private String disciplineName;
    private String applicant;
    private String company;
    private String postalAddress;
    private String postalCode;
    private String contactCode;
    private String email;
    private Date applicationDate;
    private String filePath;
    private String fileName;
}
