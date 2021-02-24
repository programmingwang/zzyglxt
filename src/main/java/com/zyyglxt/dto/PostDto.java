package com.zyyglxt.dto;

import com.zyyglxt.dataobject.PostDO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.List;

/**
 * @Author huangtao
 * @Date 2021/1/1 22:12
 * @Version 1.0
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class PostDto extends PostDO {
    private List<String> fileName;
    private List<String> filePath;

}
