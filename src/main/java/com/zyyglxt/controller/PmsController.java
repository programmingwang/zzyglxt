package com.zyyglxt.controller;

import com.zyyglxt.dto.UserSessionDto;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.util.ObjectUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping(value = "/api/pms")
public class PmsController {

    @ResponseBody
    @RequestMapping("/getAppContext")
    public ResponseData getAppContext(HttpServletRequest request){
        HttpSession session = request.getSession();
        UserSessionDto userSessionDto = (UserSessionDto) session.getAttribute("user");
        if (ObjectUtil.isNull(userSessionDto)){
            return new ResponseData(EmBusinessError.success, null);
        }else {
            return new ResponseData(EmBusinessError.success, userSessionDto);
        }
    }
}
