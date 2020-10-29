package com.zyyglxt.permissionsUtil;

import java.text.SimpleDateFormat;
import java.util.*;
/**
 * @Author wanglx
 * @Date 2020/10/29 0029 16:51
 * @Version 1.0
 */
public class DateUtils {
    /**
     * 获取当前日期 yy-MM-dd HH:mm:ss
     * @return
     */
    public static String getDate() {
        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return sdf.format(date);
    }
}
