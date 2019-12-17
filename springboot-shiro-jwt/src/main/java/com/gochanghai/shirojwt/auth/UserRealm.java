package com.gochanghai.shirojwt.auth;

import com.gochanghai.shirojwt.util.JwtUtil;
import com.gochanghai.shirojwt.util.RedisUtil;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/***
 * @Description:
 * @Auther: changhai.liu
 * @Date: 2019/12/16 16:34
 * @Version : V1.0
 */
@Service
public class UserRealm extends AuthorizingRealm {

    @Autowired
    private RedisUtil redisUtil;
//    private final UserMapper userMapper;
//    private final RoleMapper roleMapper;
//    private final PermissionMapper permissionMapper;
//
//    @Autowired
//    public UserRealm(UserMapper userMapper, RoleMapper roleMapper, PermissionMapper permissionMapper) {
//        this.userMapper = userMapper;
//        this.roleMapper = roleMapper;
//        this.permissionMapper = permissionMapper;
//    }

    /**
     * 大坑，必须重写此方法，不然Shiro会报错
     */
    @Override
    public boolean supports(AuthenticationToken authenticationToken) {
        return authenticationToken instanceof JwtToken;
    }

    /**
     * 只有当需要检测用户权限的时候才会调用此方法，例如checkRole,checkPermission之类的
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        SimpleAuthorizationInfo simpleAuthorizationInfo = new SimpleAuthorizationInfo();
        String account = JwtUtil.getClaim(principalCollection.toString(), Constant.ACCOUNT);
//        UserDto userDto = new UserDto();
//        userDto.setAccount(account);
//        // 查询用户角色
//        List<RoleDto> roleDtos = roleMapper.findRoleByUser(userDto);
//        for (RoleDto roleDto : roleDtos) {
//            if (roleDto != null) {
//                // 添加角色
//                simpleAuthorizationInfo.addRole(roleDto.getName());
//                // 根据用户角色查询权限
//                List<PermissionDto> permissionDtos = permissionMapper.findPermissionByRole(roleDto);
//                for (PermissionDto permissionDto : permissionDtos) {
//                    if (permissionDto != null) {
//                        // 添加权限
//                        simpleAuthorizationInfo.addStringPermission(permissionDto.getPerCode());
//                    }
//                }
//            }
//        }
        return simpleAuthorizationInfo;
    }

    /**
     * 默认使用此方法进行用户名正确与否验证，错误抛出异常即可。
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        String token = (String) authenticationToken.getCredentials();
        // 解密获得account，用于和数据库进行对比
        String account = JwtUtil.getClaim(token, Constant.ACCOUNT);
        // 帐号为空
        if (StringUtils.isBlank(account)) {
            throw new AuthenticationException("Token中帐号为空(The account in Token is empty.)");
        }
        // 查询用户是否存在
//        UserDto userDto = new UserDto();
//        userDto.setAccount(account);
//        userDto = userMapper.selectOne(userDto);
//        if (userDto == null) {
//            throw new AuthenticationException("该帐号不存在(The account does not exist.)");
//        }
        // 开始认证，要AccessToken认证通过，且Redis中存在RefreshToken，且两个Token时间戳一致
        if (JwtUtil.verify(token) && redisUtil.hasKey(Constant.PREFIX_SHIRO_REFRESH_TOKEN + account)) {
            // 获取RefreshToken的时间戳
            String currentTimeMillisRedis = redisUtil.get(Constant.PREFIX_SHIRO_REFRESH_TOKEN + account).toString();
            // 获取AccessToken时间戳，与RefreshToken的时间戳对比
            if (JwtUtil.getClaim(token, Constant.CURRENT_TIME_MILLIS).equals(currentTimeMillisRedis)) {
                return new SimpleAuthenticationInfo(token, token, "userRealm");
            }
        }
        throw new AuthenticationException("Token已过期(Token expired or incorrect.)");
    }
}
