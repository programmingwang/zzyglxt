package com.zyyglxt.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.ArrayList;

/**
 * Author:wangzh
 * Date: 2020/11/4 10:17
 * Version: 1.0
 */
@EnableSwagger2
@Configuration
public class Swagger2Config {
    @Bean
    public Docket myDocket(){
        return new Docket(DocumentationType.SWAGGER_2).apiInfo(apiInfo());
    }

    private ApiInfo apiInfo(){
        Contact contact = new Contact("admin","admin","admin");
        return new ApiInfo(
                "中医药管理系统接口",
                "接口描述",
                "v0.1",
                "null",
                contact,
                "Apache 2.0",
                "http://www.apache.org/license/LICENSE-2.0",
                new ArrayList<>()
        );
    }
}
