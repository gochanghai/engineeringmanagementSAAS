package com.gochanghai.springbootpdfdemo.entity;

import lombok.Data;

import java.time.LocalDate;

/***
 * @Description:
 * @Auther: changhai.liu
 * @Date: 2019/12/16 15:53
 * @Version : V1.0
 */

@Data
public class User {

    private Long id;
    private String guid;
    private String name;
    private String age;
    private LocalDate createTime;
}
