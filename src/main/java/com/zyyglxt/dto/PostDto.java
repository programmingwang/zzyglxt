package com.zyyglxt.dto;

import com.zyyglxt.dataobject.PostDO;
import lombok.Data;

/**
 * @Author huangtao
 * @Date 2021/1/1 22:12
 * @Version 1.0
 */
@Data
public class PostDto extends PostDO {
    private String fileName;
    private String filePath;
}
