package com.gochanghai.springbootpdfdemo.util;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.List;

/***
 * @Description: 图片添加水印工具类
 * @Auther: changhai.liu
 * @Date: 2019/12/9 13:47
 * @Version : V1.0
 */

public class ImageWatermarkTool {
    // 水印透明度
    private static float alpha = 0.5f;
    // 水印文字大小
    public static final int FONT_SIZE = 18;
    // 水印文字字体
    private static Font font = new Font ("微软雅黑", Font.PLAIN, FONT_SIZE);
    // 水印文字颜色
    private static Color color = Color.GRAY;
    // 水印之间的间隔
    private static final int XMOVE = 50;
    // 水印之间的间隔
    private static final int YMOVE = 50;

    /**
     * 获取文本长度。汉字为1:1，英文和数字为2:1
     */
    private static int getTextLength (String text) {
        int length = text.length ();
        for (int i = 0; i < text.length (); i++) {
            String s = String.valueOf (text.charAt (i));
            if (s.getBytes ().length > 1) {
                length++;
            }
        }
        length = length % 2 == 0 ? length / 2 : length / 2 + 1;
        return length;
    }

    /**
     * 给图片添加水印文字
     * @param logoText 水印文字
     * @param srcImgPath 源图片路径
     * @param targerPath 目标图片路径
     */
    public static void imageByText (String logoText, String srcImgPath, String targerPath) {
        imageByText (logoText, srcImgPath, targerPath, -30);
    }

    /**
     * 给图片添加水印文字、可设置水印文字的旋转角度
     * @param logoText 水印文字
     * @param srcImgPath 源图片路径
     * @param targerPath 目标图片路径
     * @param degree 设置水印旋转角度
     */
    public static void imageByText (String logoText, String srcImgPath, String targerPath, Integer degree) {

        InputStream is = null;
        OutputStream os = null;
        try {
            // 源图片
            Image srcImg = ImageIO.read (new File(srcImgPath));
            // 原图宽度
            int width = srcImg.getWidth (null);
            // 原图高度
            int height = srcImg.getHeight (null);
            BufferedImage buffImg = new BufferedImage (srcImg.getWidth (null), srcImg.getHeight (null),
                    BufferedImage.TYPE_INT_RGB);
            // 得到画笔对象
            Graphics2D g = buffImg.createGraphics ();
            // 设置对线段的锯齿状边缘处理
            g.setRenderingHint (RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
            g.drawImage (srcImg.getScaledInstance (srcImg.getWidth (null), srcImg.getHeight (null), Image.SCALE_SMOOTH),
                    0, 0, null);
            // 设置水印旋转
            if (null != degree) {
                g.rotate (Math.toRadians (degree), (double) buffImg.getWidth () / 2, (double) buffImg.getHeight () / 2);
            }
            // 设置水印文字颜色
            g.setColor (color);
            // 设置水印文字Font
            g.setFont (font);
            // 设置水印文字透明度
            g.setComposite (AlphaComposite.getInstance (AlphaComposite.SRC_ATOP, alpha));

            int x = -width / 2;
            int y = -height / 2;
            // 字体长度
            int markWidth = FONT_SIZE * getTextLength (logoText);
            // 字体高度
            int markHeight = FONT_SIZE;

            // 循环添加水印
            while (x < width * 1.5) {
                y = -height / 2;
                while (y < height * 1.5) {
                    g.drawString (logoText, x, y);

                    y += markHeight + YMOVE;
                }
                x += markWidth + XMOVE;
            }
            // 释放资源
            g.dispose ();
            // 生成图片
            os = new FileOutputStream (targerPath);
            ImageIO.write (buffImg, "PNG", os);
            System.out.println ("添加水印文字成功!");
        } catch (Exception e) {
            e.printStackTrace ();
        } finally {
            // 关闭流
            try {
                if (null != is){
                    is.close ();
                }
            } catch (Exception e) {
                e.printStackTrace ();
            }
            try {
                if (null != os){
                    os.close ();
                }
            } catch (Exception e) {
                e.printStackTrace ();
            }
        }
    }

    /**
     * 给图片添加水印
     * @param originImgPath 原始图片的路径
     * @param targetImgPath 添加水印后图片的保存路径
     * @param markImgPath 水印的路径
     * @param mode 内部枚举类，用于指定水印铺设的样式，平铺，拉伸等
     * @param margin_x 水印之间的水平间距
     * @param margin_y 水印之间的垂直间距
     * @param opacity 水印透明度
     * @param markAngle 水印旋转角度，应在正负180度之间
     * @throws IOException
     */
    public static void imageByImage(String originImgPath,String targetImgPath,String markImgPath,int mode,int margin_x,
                                    int margin_y,float opacity,double markAngle) throws IOException {
        if(markAngle>180||markAngle<-180){
            throw new RuntimeException("旋转角度必须在正负180度之间。");
        }
        BufferedImage originImg= ImageIO.read(new File(originImgPath));
        BufferedImage markImage = ImageIO.read(new File(markImgPath));
        Graphics2D graphics = (Graphics2D) originImg.getGraphics();
        graphics.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_ATOP, opacity));
        graphics.rotate(markAngle);

        if(mode == PAINT_MODE.TILED.mode){
            int canvasHeight = originImg.getHeight();
            int canvasWidth = originImg.getWidth();
            int markHeight = markImage.getHeight();
            int markWidth = markImage.getHeight();
            int interval = markWidth+markHeight;
            for(int i=-canvasHeight;i<canvasWidth+canvasHeight;i=i+interval+margin_x){
                for(int j=-canvasWidth;j<canvasHeight+canvasWidth;j=j+interval+margin_y){
                    graphics.drawImage(markImage,i,j,markImage.getWidth(),markImage.getHeight(),null);
                }
            }
        }
        graphics.dispose();
        ImageIO.write(originImg,"png",new File(targetImgPath));
    }

    /**
     * 内部枚举类
     */
    enum PAINT_MODE{
        REGULAR(0),//常规
        TILED(1),//平铺
        STRETCHED(2);//拉伸
        private int mode;
        PAINT_MODE(int mode){
            this.mode = mode;
        }
    }

    /**
     * 多张图合并成一张大图
     * @param imagePaths 图片路径集合
     * @param outImagePath 大图输出路径
     */
    public static void images2BigImage(List<String> imagePaths, String outImagePath){

    }
}