package com.gochanghai.shirojwt.exception;

/***
 * 自定义异常(CustomException)
 * @Auther: changhai.liu
 * @Date: 2019/12/16 17:13
 * @Version : V1.0
 */
public class CustomException extends RuntimeException {

    public CustomException(String msg){
        super(msg);
    }

    public CustomException() {
        super();
    }
}
