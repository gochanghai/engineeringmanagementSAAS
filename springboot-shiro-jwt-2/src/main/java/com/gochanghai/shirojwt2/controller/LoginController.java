package com.gochanghai.shirojwt2.controller;

import com.gochanghai.shirojwt2.common.api.ApiResult;
import com.gochanghai.shirojwt2.dto.LoginDTO;
import com.gochanghai.shirojwt2.service.LoginService;
import com.gochanghai.shirojwt2.util.JwtTokenUtil;
import com.gochanghai.shirojwt2.vo.LoginSysUserTokenVo;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

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

    @Autowired
    private LoginService loginService;

    @PostMapping("/login")
    @ApiOperation(value = "登陆", notes = "系统用户登陆", response = LoginSysUserTokenVo.class)
    public ApiResult login(@Valid @RequestBody LoginDTO loginDTO, HttpServletResponse response) throws Exception {
        LoginSysUserTokenVo loginSysUserTokenVo = loginService.login(loginDTO);
        // 设置token响应头
        response.setHeader(JwtTokenUtil.getTokenName(), loginSysUserTokenVo.getToken());
        return ApiResult.ok(loginSysUserTokenVo, "登陆成功");
    }

    @PostMapping("/logout")
    public ApiResult logout(HttpServletRequest request) throws Exception {
        loginService.logout(request);
        return ApiResult.ok("退出成功");
    }
}
