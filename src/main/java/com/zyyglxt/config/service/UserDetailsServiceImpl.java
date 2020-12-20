package com.zyyglxt.config.service;

import com.zyyglxt.dataobject.OrganizationDO;
import com.zyyglxt.dataobject.ResourcesDO;
import com.zyyglxt.dataobject.RoleDO;
import com.zyyglxt.dataobject.UserDO;
import com.zyyglxt.service.IOrganizationService;
import com.zyyglxt.service.ResourcesService;
import com.zyyglxt.service.RoleService;
import com.zyyglxt.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * @Description:
 */
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserService userService;
    @Autowired
    private ResourcesService resService;
    @Autowired
    private RoleService roleService;
    @Autowired
    IOrganizationService organizationService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (username == null || "".equals(username)) {
            throw new RuntimeException("用户不能为空");
        }
        //根据用户名查询用户
        UserDO sysUser = userService.selectByName(username);
        if (sysUser == null) {
            throw new RuntimeException("用户不存在");
        }
        OrganizationDO organizationDO = organizationService.selectByItemCode(sysUser.getOrgCode());
        if (organizationDO != null) {
            if (!"1".equals(organizationDO.getAuditStatus()) ){
                throw new RuntimeException("审核未通过，请耐心等待！");
            }
        } else {
            throw new RuntimeException("机构未注册！");
        }
        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        if (sysUser != null) {
            RoleDO role = roleService.selectRoleByUserid(sysUser.getItemcode());
            grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_"+role.getRoleName()));

            //获取该用户所拥有的权限
            List<ResourcesDO> sysPermissions = resService.SelectPermissionByRoleCode(sysUser);
            // 声明用户授权
            sysPermissions.forEach(sysPermission -> {
                grantedAuthorities.add(new SimpleGrantedAuthority(sysPermission.getItemcode()));
            });
        }
        return new User(sysUser.getUsername(), sysUser.getPassword(), grantedAuthorities);
    }
}
