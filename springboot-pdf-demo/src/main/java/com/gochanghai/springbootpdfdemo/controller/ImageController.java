package com.gochanghai.springbootpdfdemo.controller;

import com.gochanghai.springbootpdfdemo.util.ImageTool;
import com.gochanghai.springbootpdfdemo.util.ImageWatermarkTool;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/***
 * @Description:
 * @Auther: changhai.liu
 * @Date: 2019/12/9 14:00
 * @Version : V1.0
 */

@Slf4j
@RestController
@RequestMapping("image")
public class ImageController {

    /**
     *  图片添加文字水印
     * @param dto 入参
     * @return
     */
    @PostMapping("makeWaterMark")
    public String makeWaterMark(@RequestBody Map<String,String> dto){
        log.info("makeWaterMark 入参{}" ,dto);
        // 生成的新文件路径
        String beforPath = "D:/upload/test.png";
        String afterPath = "D:/upload/test-mark.png";
        String waterMarkName = "指旺金科";
        ImageWatermarkTool.imageByText(waterMarkName,beforPath,afterPath);
        return "ok";
    }

    /**
     *  图片添加图片水印
     * @param dto 入参
     * @return
     */
    @PostMapping("makeWaterMark2")
    public String makeWaterMark2(@RequestBody Map<String,String> dto){
        log.info("makeWaterMark 入参{}" ,dto);
        // 生成的新文件路径
        String beforPath = "D:/upload/test.png";
        String afterPath = "D:/upload/test-mark.png";
        String waterMarkPath = "D:/upload/logo.png";
        try {
            ImageWatermarkTool.imageByImage(beforPath,afterPath,waterMarkPath,1,100,45,0.5f,150);
        } catch (IOException e) {
            log.info("图片加水印异常{}" ,e);
        }
        return "ok";
    }

    /**
     * 多图合并成大图
     * @param dto 入参 json 数据
     * @return
     */
    @PostMapping("images2BigImage")
    public String images2BigImage(@RequestBody Map<String,Object> dto){
        log.info("images2BigImage 入参{}" ,dto);
        List<String> images = (List<String>) dto.get("images");
        String bigImage = (String) dto.get("bigImage");
        try {
            ImageTool.images2BigImage(images,bigImage);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return bigImage;
    }
}
