package com.gochanghai.shirojwt2;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

/**
 * spring-boot 项目启动入口
 * @author liuchanghai
 * @since 2018-11-08
 */
@EnableAsync
@SpringBootApplication
@MapperScan({"com.gochanghai.shirojwt2.**.mapper"})
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
