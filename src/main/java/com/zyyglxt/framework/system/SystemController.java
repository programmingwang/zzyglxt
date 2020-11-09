package com.zyyglxt.framework.system;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "system")
public class SystemController {

	@RequestMapping(value = "/getPage.service")
	public String getPage(String path) {
		if(null != path && path.indexOf("../") >= 0){
			return "";
		}else{
			return path;
		}
	}
	
}



