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

    @RequestMapping(value = "/toUserMsg")
    public String userMsg(){
        return "/user/usermsg";
    }

    @RequestMapping(value = "/plantation_add")
    public String plantation_add(){
        return "/industrialdevelop/chinesemed/plantation_add";
    }

    @RequestMapping(value = "/process_add")
    public String process_add(){
        return "/industrialdevelop/chinesemed/chinesemed-process_add";
    }
    @RequestMapping(value = "/produce_add")
    public String produce_add(){
        return "/industrialdevelop/chinesemed/chinesemed-produce_add";
    }
    @RequestMapping(value = "/school_add")
    public String school_add(){
        return "/industrialdevelop/school_add";
    }
    @RequestMapping(value = "/lab_add")
    public String lab_add(){
        return "/industrialdevelop/organization/lab_add";
    }
    @RequestMapping(value = "/tecservice_add")
    public String tecservice_add(){
        return "/industrialdevelop/organization/tecservice_add";
    }
    @RequestMapping(value = "/tour_add")
    public String tour_add(){
        return "/industrialdevelop/organization/tour_add";
    }
}
