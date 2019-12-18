package com.gochanghai.shirojwt2.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;

/***
 * @Description:
 * @Auther: changhai.liu
 * @Date: 2019/12/18 15:32
 * @Version : V1.0
 */
@Data
@ApiModel("登录参数")
public class LoginDTO {

    @NotBlank(message = "请输入账号")
    @ApiModelProperty("账号")
    private String username;

    @NotBlank(message = "请输入密码")
    @ApiModelProperty("密码")
    private String password;

    @ApiModelProperty("验证码Token")
    private String verifyToken;

    @ApiModelProperty("验证码")
    private String code;

}
