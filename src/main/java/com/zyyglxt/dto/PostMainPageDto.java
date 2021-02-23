package com.zyyglxt.dto;

import com.zyyglxt.dataobject.PostDOKey;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * @author wzh
 * @version 1.0
 * @date 2021/2/19 5:32 下午
 */
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostMainPageDto extends PostDOKey {
    private String dataTitle;
}
