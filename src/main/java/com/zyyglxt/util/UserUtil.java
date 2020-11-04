package com.zyyglxt.util;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Objects;

/**
 * @Author nongcn
 * @Date 2020/11/1 9:25
 * @Version 1.0
 */
public class UserUtil {

    private static final String userName = "username";
    private static final String userItemID = "itemid";
    private static final String userItemCode = "itemcode";

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
    public String getUserName() {
        return (String) session.getAttribute(userName);
    }

    /**
     * 将登录时获取的用户名设置到Session中
     *
     * @param username
     */
    public void setUserName(String username) {
        session.setAttribute(userName, username);
        //session过期时间设置，以秒为单位，即在没有活动15分钟后，session将失效
        //session.setMaxInactiveInterval(15 * 60);
    }

    /**
     * 登出后将username从session中移除
     */
    public void removeUserName() {
        session.removeAttribute(userName);
    }

    /**
     * 从session中获取itemID
     *
     * @return
     */
    public int getUserItemID() {
        System.out.println("session--------------------------------"+session.getAttribute(userItemID));
        return Integer.parseInt(String.valueOf(session.getAttribute(userItemID)));
//        return (Integer) session.getAttribute(userItemID);
    }

    /**
     * 将登录时从数据库查询获取的itemID设置到Session中
     *
     * @param itemID
     */
    public void setUserItemID(int itemID) {
        session.setAttribute(userItemID, itemID);
    }

    /**
     * 从session中获取itemID
     *
     * @return
     */
    public String getUserItemCode() {
        return (String) session.getAttribute(userItemCode);
    }

    /**
     * 将登录时从数据库查询获取的itemID设置到Session中
     *
     * @param itemCode
     */
    public void setUserItemCode(String itemCode) {
        session.setAttribute(userItemID, itemCode);
    }
}
