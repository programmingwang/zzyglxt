package com.zyyglxt.interceptor;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.LogDO;
import com.zyyglxt.util.LogUtil;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Date;
import java.util.UUID;

public class LogInterceptor extends HandlerInterceptorAdapter {

    private static final ThreadLocal<Long> mailogthreadLocal = new ThreadLocal<Long>();

    //前置拦截
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (!(handler instanceof HandlerMethod)) {
            return super.preHandle(request, response, handler);
        }
        mailogthreadLocal.set(System.currentTimeMillis());
        return super.preHandle(request, response, handler);
    }

    //后置拦截
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        LogUtil logUtil=new LogUtil();
        if (!(handler instanceof HandlerMethod)) {
            super.preHandle(request, response, handler);
            return;
        }
        HandlerMethod method = (HandlerMethod) handler;
        LogAnnotation mainlog = method.getMethodAnnotation(LogAnnotation.class);
        if (mainlog != null) {
            /*
            得到注解的值
             */
            String appCode = mainlog.appCode();
            String logTitle = mainlog.logTitle();
            String logLevel = mainlog.logLevel();
            String creater = mainlog.creater();
            String updater = mainlog.updater();
            LogDO logDO = new LogDO();
            logDO.setAppCode(appCode).setLogTitle(logTitle).setLogLevel(logLevel).setCreater(creater).setUpdater(updater);
            logUtil.writeMainLog(logDO);//异步插入数据库日志记录

        }
    }
}
