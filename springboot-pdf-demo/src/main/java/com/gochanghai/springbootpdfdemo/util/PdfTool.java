package com.gochanghai.springbootpdfdemo.util;

import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.ImageType;
import org.apache.pdfbox.rendering.PDFRenderer;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/***
 * @Description:
 * @Auther: changhai.liu
 * @Date: 2019/12/13 10:58
 * @Version : V1.0
 */
@Slf4j
public class PdfTool {

    /**
     * pdf文件转图片
     * @param pdfPath pdf文件的路径
     * @return 图片list 路径集合
     */
    public static List<String> pdf2Images(String pdfPath) throws IOException {
        log.info("将多页pdf转化为图片，pdf路径为："+pdfPath);
        File pdfFile = new File(pdfPath);
        PDDocument pdDocument = PDDocument.load(pdfFile);
        int pageCount = pdDocument.getNumberOfPages();
        PDFRenderer pdfRenderer = new PDFRenderer(pdDocument);
        List<String> imagePathList=new ArrayList<>();
        String fileParent = pdfFile.getParent();
        for (int pageIndex=0; pageIndex<pageCount; pageIndex++) {
            String imgPath = fileParent + File.separator +UUID.randomUUID().toString()+".png";
            BufferedImage image = pdfRenderer.renderImageWithDPI(pageIndex, 105, ImageType.RGB);
            ImageIO.write(image, "png", new File(imgPath));
            imagePathList.add(imgPath);
            log.info("第{}张生成的图片路径为：{}",pageIndex,imgPath);
        }
        pdDocument.close();
        return imagePathList;
    }
}
