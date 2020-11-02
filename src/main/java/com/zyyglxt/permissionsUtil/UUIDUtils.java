package com.zyyglxt.permissionsUtil;

import java.util.UUID;

/**
 * @Author wanglx
 * @Date 2020/10/29 0029 17:17
 * @Version 1.0
 */
public class UUIDUtils {
    public static String getUUID(){
        return UUID.randomUUID().toString().replace("-", "");
    }
}
