package com.zyyglxt.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author yqz
 * @version 1.0
 * @date 2020/9/15 16:03
 * @Description:
 */


@Controller
@RequestMapping("/")
public class IndexController {

    @RequestMapping(value = "/userLogin")
    public String userLogin(){
        return "/user/login";
    }

    @RequestMapping(value = "/register")
    public String register() {
        return "/user/register";
    }


    @RequestMapping(value = "/")
    public String index(){
        return "redirect:/userLogin";
    }

    @RequestMapping(value = "/main")
    public String main(){
        return "/index";
    }
}
