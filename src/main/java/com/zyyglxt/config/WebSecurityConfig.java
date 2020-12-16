package com.zyyglxt.config;

import com.zyyglxt.config.handler.*;
import com.zyyglxt.config.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor;

/**
 * @Description:
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    //登录成功处理逻辑
    @Autowired
    CustomizeAuthenticationSuccessHandler authenticationSuccessHandler;

    //登录失败处理逻辑
    @Autowired
    CustomizeAuthenticationFailureHandler authenticationFailureHandler;

    //权限拒绝处理逻辑
    @Autowired
    CustomizeAccessDeniedHandler accessDeniedHandler;

    //匿名用户访问无权限资源时的异常
    @Autowired
    CustomizeAuthenticationEntryPoint authenticationEntryPoint;

    //会话失效(账号被挤下线)处理逻辑
    @Autowired
    CustomizeSessionInformationExpiredStrategy sessionInformationExpiredStrategy;

    //登出成功处理逻辑
    @Autowired
    CustomizeLogoutSuccessHandler logoutSuccessHandler;

    //访问决策管理器
    @Autowired
    CustomizeAccessDecisionManager accessDecisionManager;

    //实现权限拦截
    @Autowired
    CustomizeFilterInvocationSecurityMetadataSource securityMetadataSource;

    @Autowired
    private CustomizeAbstractSecurityInterceptor securityInterceptor;

    @Bean
    public UserDetailsService userDetailsService() {
        //获取用户账号密码及权限信息
        return new UserDetailsServiceImpl();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable().
                authorizeRequests().antMatchers("/v2/api-docs",//swagger api json
                "/swagger-resources/configuration/ui",//用来获取支持的动作
                "/swagger-resources",//用来获取api-docs的URI
                "/swagger-resources/configuration/security",//安全选项
                "/swagger-ui.html",
                "/webjars/**").permitAll().antMatchers("/component/**","/css/**", "/fonts/**",
                "/images/**","/main/**", "/project/**", "/utils/**", "/", "/register","/user/register",
                "/user/queryOrgStatus","/dict/getDictByCode","/industrialdevelop/chi-med","/industrialdevelop/school",
                "/industrialdevelop/tec-ser-org","/industrialDevelop/hosp_add","/plantation_add","/process_add","/produce_add",
                "/school_add","/sale_add","/hosp_add","/lab_add","/tecserviceorg_add","/tour_add","/user/deletuser").permitAll().
                anyRequest().authenticated().
                    and().logout().
                    permitAll().//允许所有用户
                    logoutSuccessHandler(logoutSuccessHandler).//登出成功处理逻辑
                    deleteCookies("JSESSIONID").//登出后删除cookie
                    invalidateHttpSession(true).//登出成功后使session失效
                //登入
                and().formLogin().loginPage("/userLogin").successForwardUrl("/main").
                    permitAll().//允许所有用户
                    successHandler(authenticationSuccessHandler).//登录成功处理逻辑
                    failureHandler(authenticationFailureHandler).//登录失败处理逻辑
                //异常处理(权限拒绝、登录失效等)
                and().exceptionHandling().
                    accessDeniedHandler(accessDeniedHandler).//权限拒绝处理逻辑
                    authenticationEntryPoint(authenticationEntryPoint).//匿名用户访问无权限资源时的异常处理
                //会话管理
                and().sessionManagement().
                    maximumSessions(20).//同一账号同时登录最大用户数
                    expiredSessionStrategy(sessionInformationExpiredStrategy);//会话失效(账号被挤下线)处理逻辑
        http.addFilterBefore(securityInterceptor, FilterSecurityInterceptor.class);
    }
}
