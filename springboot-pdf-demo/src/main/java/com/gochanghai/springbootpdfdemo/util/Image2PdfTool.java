package com.gochanghai.springbootpdfdemo.util;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfWriter;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

/***
 * @Description:
 * @Auther: changhai.liu
 * @Date: 2019/12/9 15:51
 * @Version : V1.0
 */
public class Image2PdfTool {

    /**
     * @param imagePaths 图片文件夹地址
     * @param pdfPath PDF文件保存地址
     */
    public static void images2oPdf(List<String> imagePaths, String pdfPath) {
        try {
            // 输入流
            FileOutputStream fos = new FileOutputStream(pdfPath);
            // 创建文档
            Document doc = new Document(PageSize.A4, 0, 0, 25, 0);
            // 写入PDF文档
            PdfWriter.getInstance(doc, fos);
            doc.open();
            // 设置标题
            // 获取标题字体
            Font font = getFont();
            // 设置标题字体大小
            font.setSize(18);
            Paragraph tilte = new Paragraph("资料附件",font);
            // 标题居中
            tilte.setAlignment(Element.ALIGN_CENTER);
            doc.add(tilte);
            // 实例化图片
            Image image = null;
            // 循环获取图片文件夹内的图片
            for (String path : imagePaths) {
                // 实例化图片
                image = Image.getInstance(path);
                //获得图片的宽高
                Float height = image.getHeight();
                Float width = image.getWidth();
                // 图片宽大于 500 才压缩
                if (width > 500){
                    //统一按照宽度压缩
                    Integer percent = getPercent(height, width);
                    //按百分比显示图片的比例
                    image.scalePercent(percent);
                }
                //设置图片居中显示
                image.setAlignment(Image.MIDDLE);
                // 添加图片到文档
                doc.add(image);
                // 添加图片标题
                tilte = new Paragraph("资料 - " + imagePaths.indexOf(path),getFont());
                tilte.setAlignment(Element.ALIGN_CENTER);
                doc.add(tilte);
            }
            // 关闭文档
            doc.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 按照宽度压缩
     * @param
     */
    public static Integer getPercent(Float h,Float w)
    {
        Integer p=0;
        Float p2=0.0f;
        p2=530/w*100;
        p=Math.round(p2);
        return p;
    }

    public static Font getFont() {
        // 使用iTextAsian.jar中的字体
        BaseFont baseFont = null;
        try {
            baseFont = BaseFont.createFont("STSong-Light", "UniGB-UCS2-H", BaseFont.NOT_EMBEDDED);
        } catch (DocumentException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        Font font = new Font(baseFont);
        return font;
    }

}
