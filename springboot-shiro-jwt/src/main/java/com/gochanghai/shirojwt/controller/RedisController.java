package com.gochanghai.shirojwt.controller;

import com.gochanghai.shirojwt.entity.User;
import com.gochanghai.shirojwt.util.RedisUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.time.LocalDate;
import java.util.Map;

/***
 * @Description:
 * @Auther: changhai.liu
 * @Date: 2019/12/16 15:55
 * @Version : V1.0
 */

@Slf4j
@RequestMapping("redis")
@RestController
public class RedisController {

    // redis中存储的过期时间60s
    private static int ExpireTime = 60;

    @Resource
    private RedisUtil redisUtil;

    @PostMapping("set")
    public boolean redisset(@RequestBody Map<String,String> dto){
        User user =new User();
        user.setId(Long.valueOf(1));
        user.setGuid(String.valueOf(1));
        user.setName("zhangsan");
        user.setAge(String.valueOf(20));
        user.setCreateTime(LocalDate.now());

        //return redisUtil.set(key,userEntity,ExpireTime);

        return redisUtil.set(dto.get("key"), user);
    }

    @PostMapping("get")
    public Object redisget(String key){
        return redisUtil.get(key);
    }

    @PostMapping("expire")
    public boolean expire(String key){
        return redisUtil.expire(key,ExpireTime);
    }
}
