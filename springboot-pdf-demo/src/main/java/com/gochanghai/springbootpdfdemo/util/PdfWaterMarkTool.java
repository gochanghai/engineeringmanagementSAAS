package com.gochanghai.springbootpdfdemo.util;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Element;
import com.itextpdf.text.Image;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.*;

import javax.swing.*;
import java.awt.*;
import java.io.FileOutputStream;

/***
 * @Description: 加水印工具类
 * @Auther: changhai.liu
 * @Date: 2019/12/9 12:41
 * @Version : V1.0
 */
public class PdfWaterMarkTool {

    private static int interval = -5;

    /**
     * pdf 文件添加文字水印
     * @param inputFile 原始文件路径
     * @param outputFile 加水印文件路径
     * @param waterMarkName 水印文本
     */
    public static void waterMarkByText(String inputFile, String outputFile, String waterMarkName) {
        try {
            PdfReader reader = new PdfReader(inputFile);
            PdfStamper stamper = new PdfStamper(reader, new FileOutputStream(
                    outputFile));

            BaseFont base = BaseFont.createFont("STSong-Light", "UniGB-UCS2-H",   BaseFont.EMBEDDED);

            Rectangle pageRect = null;
            PdfGState gs = new PdfGState();
            // 设置透明度
            gs.setFillOpacity(0.2f);
            gs.setStrokeOpacity(0.2f);
            int total = reader.getNumberOfPages() + 1;

            JLabel label = new JLabel();
            FontMetrics metrics;
            int textH = 0;
            int textW = 0;
            label.setText(waterMarkName);
            metrics = label.getFontMetrics(label.getFont());
            textH = metrics.getHeight();
            textW = metrics.stringWidth(label.getText());

            PdfContentByte under;
            for (int i = 1; i < total; i++) {
                pageRect = reader.getPageSizeWithRotation(i);
                under = stamper.getOverContent(i);
                under.saveState();
                under.setGState(gs);
                under.beginText();
                under.setFontAndSize(base, 20);

                // 水印文字成30度角倾斜
                //你可以随心所欲的改你自己想要的角度
                for (int height = interval + textH; height < pageRect.getHeight();
                     height = height + textH*3) {
                    for (int width = interval + textW; width < pageRect.getWidth() + textW;
                         width = width + textW*2) {
                        under.showTextAligned(Element.ALIGN_LEFT
                                , waterMarkName, width - textW,
                                height - textH, 30);
                    }
                }
                // 添加水印文字
                under.endText();
            }
            //说三遍
            //一定不要忘记关闭流
            //一定不要忘记关闭流
            //一定不要忘记关闭流
            stamper.close();
            reader.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * pdf 文件添加图片水印
     * @param inputPath 原始文件路径
     * @param outputPath 加水印文件路径
     * @param imagesPath 图片水印路径
     * @return
     */
    public static boolean watermarkByImage(String inputPath, String outputPath,String imagesPath){

        try{
            PdfReader reader = new PdfReader(inputPath);
            PdfStamper stamper = new PdfStamper(reader, new FileOutputStream(outputPath));
            PdfGState gs1 = new PdfGState();
            // 设置透明度
            gs1.setFillOpacity(0.5f);

            Image image = Image.getInstance(imagesPath);
            int n = reader.getNumberOfPages();
            PdfContentByte under;
            for (int i = 1; i <= n; i++) {
                PdfContentByte pdfContentByte = stamper.getOverContent(i);
                // 获得PDF最顶层
                under = stamper.getOverContent(i);
                pdfContentByte.setGState(gs1);

                for (int y = 0; y < 10; y++) {
                    for (int x = 0; x < 8; x++) {
                        // 水印文字成45度角倾斜
                        image.setRotation(30);
                        // 设置旋转角度
                        image.setRotationDegrees(45);
                        // 设置等比缩放
                        under.setColorFill(BaseColor.GRAY);
                        image.scaleToFit(80,120);
                        image.setRotation(45);
                        // set the first background image of the absolute
                        image.setAbsolutePosition(70 + 140 * x, 125 * y);
                        pdfContentByte.addImage(image);
                    }
                }
            }
            // 关闭流
            stamper.close();
            reader.close();
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }


}
