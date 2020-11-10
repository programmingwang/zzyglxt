package com.zyyglxt.controller;


import com.zyyglxt.dto.UserDto;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping(value = "/api/pms")
public class PmsController {
//    @Autowired
//    UserService userService;

    /**
     * @Author yqz
     * @Date 2020/9/15 11:46
     * @Description :获取上下文信息，userDto
     */


    @ResponseBody
    @RequestMapping("/getAppContext")
    public ResponseData getAppContext(HttpServletRequest request){
//        HttpSession session = request.getSession();
//        UserDto userDto = (UserDto) session.getAttribute("userDto");
//        if (ObjectUtil.isNull(userDto)){
              return new ResponseData(EmBusinessError.success, null);
//        }else {
//            return new ResponseData(EmBusinessError.success, userDto);
//        }
    }
}
