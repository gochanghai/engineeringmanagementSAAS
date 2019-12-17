package com.gochanghai.shirojwt.exception;

/***
 * 自定义401无权限异常(UnauthorizedException)
 * @Auther: changhai.liu
 * @Date: 2019/12/17 16:29
 * @Version : V1.0
 */
public class CustomUnauthorizedException extends RuntimeException {

    public CustomUnauthorizedException(String msg){
        super(msg);
    }

    public CustomUnauthorizedException() {
        super();
    }
}