package com.zyyglxt;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.zyyglxt.dao")
public class ZyyglxtApplication {

    public static void main(String[] args) {
        SpringApplication.run(ZyyglxtApplication.class, args);
    }

}
