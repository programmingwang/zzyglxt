package com.zyyglxt.dto;

import com.zyyglxt.dataobject.ReceiptDOKey;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * @author wzh
 * @version 1.0
 * @date 2021/2/20 5:35 下午
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReceiptMainDto extends ReceiptDOKey {
    private String dataTitle;
}
