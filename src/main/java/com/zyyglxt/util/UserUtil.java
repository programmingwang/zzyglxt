package com.zyyglxt.util;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;
import java.util.Objects;

/**
 * @Author nongcn
 * @Date 2020/11/1 9:25
 * @Version 1.0
 */
public class UserUtil {

    private static final String user = "user";

    private HttpServletRequest getRequest() {
        HttpServletRequest request = ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
        return request;
    }

    private HttpSession session = getRequest().getSession();

    /**
     * 从session中获取username
     *
     * @return
     */
    public Map<String, String> getUser() {
        return (Map<String, String>) session.getAttribute(user);
    }

    /**
     * 将登录时获取的用户名设置到Session中
     *
     * @param map
     */
    public void setUser(Map<String, String> map) {
        session.setAttribute(user, map);
        //session过期时间设置，以秒为单位，即在没有活动15分钟后，session将失效
        //session.setMaxInactiveInterval(15 * 60);
    }

    /**
     * 登出后将username从session中移除
     */
    public void removeUser() {
        session.removeAttribute(user);
    }
}
