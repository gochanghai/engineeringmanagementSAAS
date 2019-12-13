package com.gochanghai.springbootpdfdemo.util;

import com.sun.image.codec.jpeg.JPEGCodec;
import com.sun.image.codec.jpeg.JPEGImageEncoder;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

/***
 * @Description:
 * @Auther: changhai.liu
 * @Date: 2019/12/13 13:44
 * @Version : V1.0
 */
public class ImageTool {

    public static void images2BigImage(List<String> imagePaths, String bigImagePath) throws IOException {
        //创建输出流
        FileOutputStream out = new FileOutputStream(bigImagePath);
        File file = new File(imagePaths.get(0));
        Image image = javax.imageio.ImageIO.read(file);
        //获取图片的宽度
        int width = image.getWidth(null);
        //获取各个图像的高度
        int height = image.getHeight(null);
        //构造一个类型为预定义图像类型之一的 BufferedImage。 宽度为第一只的宽度，高度为各个图片高度之和
        BufferedImage tag = new BufferedImage(width, height*imagePaths.size(), BufferedImage.TYPE_INT_RGB);
        //绘制合成图像
        Graphics g = tag.createGraphics();
        for (int i = 0; i < imagePaths.size(); i++) {
            file = new File(imagePaths.get(i));
            image = javax.imageio.ImageIO.read(file);
            g.drawImage(image, 0, height*i, width, height, null);
        }
        // 释放此图形的上下文以及它使用的所有系统资源。
        g.dispose();
        //将绘制的图像生成至输出流
        JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(out);
        encoder.encode(tag);
        //关闭输出流
        out.close();
        System.out.println("大图出来了");
    }
}
