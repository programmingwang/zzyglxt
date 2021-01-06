package com.zyyglxt.dto;

import com.zyyglxt.dataobject.PostDO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.Date;

/**
 * @Author huangtao
 * @Date 2021/1/1 22:12
 * @Version 1.0
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class PostDto extends PostDO {
    private String fileName;
    private String filePath;

    private String dataCode;
    private String initial;
    private Date initialDate;
    private String department;
    private Date departDate;
    private String office;
    private Date officeDate;
    private String deputyDirector;
    private Date deputyDirectorDate;
    private String director;
    private Date directorDate;
}
