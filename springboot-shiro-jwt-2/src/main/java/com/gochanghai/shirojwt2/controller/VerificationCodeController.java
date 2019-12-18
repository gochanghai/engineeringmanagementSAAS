/*
 * Copyright 2019-2029 geekidea(https://github.com/geekidea)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.gochanghai.shirojwt2.controller;

import com.gochanghai.shirojwt2.common.api.ApiResult;
import com.gochanghai.shirojwt2.constant.CommonConstant;
import com.gochanghai.shirojwt2.constant.CommonRedisKey;
import com.gochanghai.shirojwt2.util.RedisUtil;
import com.gochanghai.shirojwt2.util.UUIDUtil;
import com.gochanghai.shirojwt2.util.VerificationCode;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * @author geekidea
 * @date 2019-10-27
 **/
@Slf4j
@Controller
@Api("获取验证码 API")
@RequestMapping("/verificationCode")
public class VerificationCodeController {

    @Autowired
    private RedisUtil redisUtil;

    /**
     * 获取验证码
     */
    @GetMapping("/getImage")
    @ApiOperation(value = "获取验证码", notes = "获取验证码", response = ApiResult.class)
    public void getImage(HttpServletResponse response) throws Exception {
        VerificationCode verificationCode = new VerificationCode();
        BufferedImage image = verificationCode.getImage();
        String code = verificationCode.getText();
        String verifyToken = UUIDUtil.getUUID();
        // 缓存到Redis
        redisUtil.set(String.format(CommonRedisKey.VERIFY_CODE, verifyToken), code, 5, TimeUnit.MINUTES);
        response.setHeader(CommonConstant.VERIFY_TOKEN, verifyToken);
        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        response.setHeader("Pragma", "No-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expire", 0);
        ServletOutputStream outputStream = response.getOutputStream();
        ImageIO.write(image, CommonConstant.JPEG, outputStream);
    }

    /**
     * 获取图片Base64验证码
     */
    @GetMapping("/getBase64Image")
    @ResponseBody
    @ApiOperation(value = "获取图片Base64验证码", notes = "获取图片Base64验证码", response = ApiResult.class)
    public ApiResult getCode(HttpServletResponse response) throws Exception {
        VerificationCode verificationCode = new VerificationCode();
        BufferedImage image = verificationCode.getImage();
        String code = verificationCode.getText();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ImageIO.write(image, CommonConstant.JPEG, outputStream);
        // 将图片转换成base64字符串
        String base64 = Base64.getEncoder().encodeToString(outputStream.toByteArray());
        // 生成当前验证码会话token
        String verifyToken = UUIDUtil.getUUID();
        Map<String, Object> map = new HashMap<>(2);
        map.put(CommonConstant.IMAGE, CommonConstant.BASE64_PREFIX + base64);
        map.put(CommonConstant.VERIFY_TOKEN, verifyToken);
        // 缓存到Redis
        redisUtil.set(String.format(CommonRedisKey.VERIFY_CODE, verifyToken), code, 5, TimeUnit.MINUTES);
        return ApiResult.ok(map);
    }

    /**
     * 校验验证码
     */
    @PostMapping("/checkVerifyCode")
    @ResponseBody
    @ApiOperation(value = "校验验证码", notes = "校验验证码", response = ApiResult.class)
    public ApiResult checkVerifyCode(@RequestBody Map<String, String> dto) {
        String code = dto.get("code");
        // 校验验证码
        if (StringUtils.isBlank(code)) {
            return ApiResult.fail("请输入验证码");
        }
        // 从redis中获取
        String redisKey = String.format(CommonRedisKey.VERIFY_CODE, dto.get("verifyToken"));
        String generateCode = (String) redisUtil.get(redisKey);
        if (StringUtils.isBlank(generateCode)) {
            return ApiResult.fail("验证码已过期或不正确");
        }
        // 不区分大小写
        if (!generateCode.equalsIgnoreCase(code)) {
            return ApiResult.fail("验证码错误");
        }
        // 验证码校验成功，删除Redis缓存
        redisUtil.del(redisKey);
        return ApiResult.ok();
    }

}
