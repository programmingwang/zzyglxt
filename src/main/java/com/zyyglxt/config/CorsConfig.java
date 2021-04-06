package com.zyyglxt.config;

/**
 * @Author wzh
 * @Date 2021/2/27 12:07 上午
 * @Description
 */

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 解决异步访问跨域
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        //本应用的所有方法都会去处理跨域请求
        registry.addMapping("/**")
                //允许远端访问的域名
                .allowedOrigins("*")
                //允许请求的方法("POST", "GET", "PUT", "OPTIONS", "DELETE")
                .allowedMethods("*")
                //允许请求头
                .allowedHeaders("*");
    }
}
