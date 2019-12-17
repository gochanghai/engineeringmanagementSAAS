package com.gochanghai.shirojwt;

import com.alibaba.nacos.spring.context.annotation.config.NacosPropertySource;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@NacosPropertySource(dataId = "pdf-demo", autoRefreshed = true)
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
