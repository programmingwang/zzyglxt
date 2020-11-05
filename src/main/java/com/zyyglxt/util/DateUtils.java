package com.zyyglxt.util;

import java.text.DateFormat;
import java.text.ParseException;
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
    public static Date getDate() {
        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            return sdf.parse(sdf.format(date));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

//    public static Date getCurrentTimeZoneTime() {
//        SimpleDateFormat bjSdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");     // 北京
//        bjSdf.setTimeZone(TimeZone.getTimeZone("Asia/Shanghai"));  // 设置北京时区
//        return bjSdf.parse(bjSdf.format(new Date()));
//    }

}
