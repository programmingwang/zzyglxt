package com.zyyglxt.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


@Target({ElementType.PARAMETER, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface LogAnnotation {

    String appCode() default "";
    String logTitle() default "";
    /*查找1级，修改2级，添加3级，删除4级*/
    String logLevel() default "";
    String creater() default "";
    String updater() default "";
}