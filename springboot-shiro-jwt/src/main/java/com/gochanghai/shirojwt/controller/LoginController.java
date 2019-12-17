package com.gochanghai.shirojwt.controller;

import com.gochanghai.shirojwt.auth.Constant;
import com.gochanghai.shirojwt.dto.UserDto;
import com.gochanghai.shirojwt.exception.CustomException;
import com.gochanghai.shirojwt.exception.CustomUnauthorizedException;
import com.gochanghai.shirojwt.util.AesCipherUtil;
import com.gochanghai.shirojwt.util.JwtUtil;
import com.gochanghai.shirojwt.util.RedisUtil;
import com.gochanghai.shirojwt.util.ResponseBean;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

/***
 * @Description:
 * @Auther: changhai.liu
 * @Date: 2019/12/16 15:02
 * @Version : V1.0
 */

@Slf4j
@RestController
@RequestMapping("auth")
public class LoginController {

    /**
     * RefreshToken过期时间
     */
    @Value("${refreshTokenExpireTime}")
    private String refreshTokenExpireTime;

    @Autowired
    private RedisUtil redisUtil;

    /**
     * 登录授权
     * @param userDto
     * @return com.wang.model.common.ResponseBean
     * @author dolyw.com
     * @date 2018/8/30 16:21
     */
    @PostMapping("/login")
    public ResponseBean login(@RequestBody UserDto userDto, HttpServletResponse httpServletResponse) {
        // 查询数据库中的帐号信息
//        UserDto userDtoTemp = new UserDto();
//        userDtoTemp.setAccount(userDto.getAccount());
//        userDtoTemp = userService.selectOne(userDtoTemp);
//        if (userDtoTemp == null) {
//            throw new CustomUnauthorizedException("该帐号不存在(The account does not exist.)");
//        }
        // 密码进行AES解密
        String key = AesCipherUtil.enCrypto(userDto.getPassword());
        // 因为密码加密是以帐号+密码的形式进行加密的，所以解密后的对比是帐号+密码
//        if (key.equals(userDto.getUsername() + userDto.getPassword())) {
        if (userDto.getPassword().equals(userDto.getPassword())) {
            // 清除可能存在的Shiro权限信息缓存
            if (redisUtil.hasKey(Constant.PREFIX_SHIRO_CACHE + userDto.getUsername())) {
                redisUtil.del(Constant.PREFIX_SHIRO_CACHE + userDto.getUsername());
            }
            // 设置RefreshToken，时间戳为当前时间戳，直接设置即可(不用先删后设，会覆盖已有的RefreshToken)
            String currentTimeMillis = String.valueOf(System.currentTimeMillis());
            redisUtil.set(Constant.PREFIX_SHIRO_REFRESH_TOKEN + userDto.getUsername(), currentTimeMillis, Integer.parseInt(refreshTokenExpireTime));
            // 从Header中Authorization返回AccessToken，时间戳为当前时间戳
            String token = JwtUtil.sign(userDto.getUsername(), currentTimeMillis);
            httpServletResponse.setHeader("Authorization", token);
            httpServletResponse.setHeader("Access-Control-Expose-Headers", "Authorization");
            return new ResponseBean(HttpStatus.OK.value(), "登录成功(Login Success.)", token);
        } else {
            throw new CustomUnauthorizedException("帐号或密码错误(Account or Password Error.)");
        }
    }

    /**
     * 测试登录
     * @param
     * @author dolyw.com
     * @date 2018/8/30 16:18
     */
    @GetMapping("/article")
    public ResponseBean article() {
        Subject subject = SecurityUtils.getSubject();
        // 登录了返回true
        if (subject.isAuthenticated()) {
            return new ResponseBean(HttpStatus.OK.value(), "您已经登录了(You are already logged in)", null);
        } else {
            return new ResponseBean(HttpStatus.OK.value(), "你是游客(You are guest)", null);
        }
    }

    /**
     * 测试登录注解(@RequiresAuthentication和subject.isAuthenticated()返回true一个性质)
     * @param
     * @author dolyw.com
     * @date 2018/8/30 16:18
     */
    @GetMapping("/article2")
    @RequiresAuthentication
    public ResponseBean requireAuth() {
        return new ResponseBean(HttpStatus.OK.value(), "您已经登录了(You are already logged in)", null);
    }

    /**
     * 剔除在线用户
     * @param userDto
     * @author dolyw.com
     * @date 2018/9/6 10:20
     */
    @PostMapping("/online/{id}")
    @RequiresPermissions(logical = Logical.AND, value = {"user:edit"})
    public ResponseBean deleteOnline(@RequestBody UserDto userDto) {
//        UserDto userDto = userService.selectByPrimaryKey(id);
        if (redisUtil.hasKey(Constant.PREFIX_SHIRO_REFRESH_TOKEN + userDto.getUsername())) {
            if (true) {
                redisUtil.del(Constant.PREFIX_SHIRO_REFRESH_TOKEN + userDto.getUsername());
                return new ResponseBean(HttpStatus.OK.value(), "剔除成功(Delete Success)", null);
            }
        }
        throw new CustomException("剔除失败，Account不存在(Deletion Failed. Account does not exist.)");
    }
}
