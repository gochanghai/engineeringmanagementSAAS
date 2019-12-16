package com.gochanghai.springbootpdfdemo.auth;

import org.apache.shiro.authc.AuthenticationToken;

/***
 * @Description:
 * @Auther: changhai.liu
 * @Date: 2019/12/16 16:41
 * @Version : V1.0
 */
public class JwtToken implements AuthenticationToken {
    /**
     * Token
     */
    private String token;

    public JwtToken(String token) {
        this.token = token;
    }

    @Override
    public Object getPrincipal() {
        return token;
    }

    @Override
    public Object getCredentials() {
        return token;
    }
}
