package com.gochanghai.springbootpdfdemo.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

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
     *  登陆
     * @param dto 入参
     * @return
     */
    @PostMapping("login")
    public String login(@RequestBody Map<String,String> dto){
        log.info("makeWaterMark 入参{}" ,dto);
        return "ok";
    }
}
