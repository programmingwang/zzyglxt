package com.zyyglxt.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * Author:wangzh
 * Date: 2020/11/17 13:24
 * Version: 1.0
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class WangEditor {
    private Integer errno; //错误代码，0 表示没有错误。
    private String[] data; //已上传的图片路径

    public WangEditor(String[] data) {
        super();
        this.errno = 0;
        this.data = data;
    }
}
