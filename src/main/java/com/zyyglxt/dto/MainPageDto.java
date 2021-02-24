package com.zyyglxt.dto;

import com.zyyglxt.dataobject.DataDOKey;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * @author wzh
 * @version 1.0
 * @date 2021/2/19 5:09 下午
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MainPageDto extends DataDOKey {
    private String dataTitle;
}
