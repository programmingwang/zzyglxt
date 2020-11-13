package com.zyyglxt.config.handler;

import com.zyyglxt.dataobject.ResourcesDO;
import com.zyyglxt.service.ResourcesService;
import com.zyyglxt.util.UrlUtil;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;
import org.springframework.security.web.util.UrlUtils;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;

import javax.servlet.http.HttpServletResponse;
import java.util.Collection;
import java.util.List;

/**
 * @Description:
 */
@Component
public class CustomizeFilterInvocationSecurityMetadataSource implements FilterInvocationSecurityMetadataSource {
    AntPathMatcher antPathMatcher = new AntPathMatcher();

    @Autowired
    ResourcesService resService;

    @SneakyThrows
    @Override
    public Collection<ConfigAttribute> getAttributes(Object o) throws IllegalArgumentException {
        //获取请求地址
        String requestUrl = ((FilterInvocation) o).getRequestUrl();
        if (requestUrl.contains("/component")
                |requestUrl.contains("/project")
                |requestUrl.contains("/main")
                |requestUrl.contains("/css")
                |requestUrl.contains("/CSS")
                |requestUrl.contains("/system")
                |requestUrl.contains("/images")
                |requestUrl.contains("/fonts")
                |requestUrl.contains("/api")
                |requestUrl.contains("/utils")){
            return null;
        }
        int index = requestUrl.indexOf("?");
        if (index != -1) {
            requestUrl = requestUrl.substring(0, index);
        }
        if (requestUrl.contains("/industrialdevelop")){
            String method = ((FilterInvocation) o).getHttpRequest().getMethod();
            requestUrl = UrlUtil.getUrl(requestUrl, method);
        }else {
            requestUrl = UrlUtil.getUrl(requestUrl);
        }
        //查询具体某个接口的权限
        List<ResourcesDO> permissionList = resService.selectListByPath(requestUrl);
        if (permissionList == null || permissionList.size() == 0) {
            //请求路径没有配置权限，表明该请求接口可以任意访问
            return null;
        }
        String[] attributes = new String[permissionList.size()];
        for (int i = 0; i < permissionList.size(); i++) {
            attributes[i] = permissionList.get(i).getItemcode();
        }
        return SecurityConfig.createList(attributes);
    }

    @Override
    public Collection<ConfigAttribute> getAllConfigAttributes() {
        return null;
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return true;
    }
}
