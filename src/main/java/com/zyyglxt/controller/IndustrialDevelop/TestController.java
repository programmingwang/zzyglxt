package com.zyyglxt.controller.IndustrialDevelop;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;

/**
 * @Author lrt
 * @Date 2020/10/30 9:28
 * @Version 1.0
 **/
@Controller
public class TestController {

    @GetMapping("/thymeleaf")
    public String hello(HttpServletRequest request, @RequestParam(value = "description",
            required = false, defaultValue = "springboot-thymeleaf") String description) {
        request.setAttribute("description",description);
        return "hello/thymeleaf";
    }
}
