package com.gochanghai.springbootpdfdemo.controller;

import com.gochanghai.springbootpdfdemo.util.*;
import com.itextpdf.text.Document;
import com.itextpdf.text.pdf.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/***
 * @Description:
 * @Auther: changhai.liu
 * @Date: 2019/12/6 10:55
 * @Version : V1.0
 */
@Slf4j
@RestController
@RequestMapping("/pdf")
public class PdfController {

    // 文字水印
    private String waterMark = "指旺金科";
    private String imageMarkPath = "D:/upload/logo.png";

    /**
     * pdf文件模板生成pdf文件
     * @param dto 入参
     * @return
     */
    @PostMapping("makePdf")
    public String makePdf(@RequestBody Map<String,String> dto){
        log.info("makePdf 入参{}" ,dto);
        // 模板路径
        String templatePath = "D:/upload/借款协议.pdf";
        // 生成的新文件路径
        String newPDFPath = "D:/upload/20191206-刘某-借款协议.pdf";
        PdfReader reader;
        FileOutputStream out;
        ByteArrayOutputStream bos;
        PdfStamper stamper;
        // 输出流
        try {
            out = new FileOutputStream(newPDFPath);
            // 读取pdf模板
            reader = new PdfReader(templatePath);
            bos = new ByteArrayOutputStream();
            stamper = new PdfStamper(reader, bos);
            AcroFields form = stamper.getAcroFields();
            //文字类的内容处理
            for (String key: dto.keySet()){
             form.setField(key,dto.get(key));
             log.info("文字类的内容处理{}",dto.get(key));
            }

            // 如果为false那么生成的PDF文件还能编辑，一定要设为true
            stamper.setFormFlattening(true);
            stamper.close();
            Document doc = new Document();
            PdfCopy copy = new PdfCopy(doc, out);
            doc.open();
            PdfImportedPage importPage = copy.getImportedPage(new PdfReader(bos.toByteArray()), 1);
            copy.addPage(importPage);
            doc.close();

            out.close();
            bos.close();
            stamper.close();
            reader.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "ok";
    }

    /**
     * html 字符串转成 pdf 文件
     * @param dto 入参
     * @return
     */
    @PostMapping("html2Pdf")
    public String html2Pdf(@RequestBody Map<String,String> dto){
        log.info("makePdf 入参{}" ,dto);
        // 模板路径
        String templatePath = "D:/upload/借款协议.pdf";
        // 生成的新文件路径
        String newPDFPath = "D:/upload/20191209-刘某-借款协议.pdf";
        String newPDFPath2 = "D:/upload/20191209-刘某-借款协议2.pdf";
        String htmlStr = "<h1 style=\"text-align: center;\"><strong>借款协议</strong></h1>\n" +
                "<p>&nbsp;</p>\n" +
                "<p>本借款协议（&ldquo;本协议&rdquo;）由以下各方于year年month月date日签订：</p>\n" +
                "<p><strong><strong>借款人：</strong></strong></p>\n" +
                "<p>证件号码（企业统一社会信用代码或个人身份证号）：____<u>{LOAN_IDCARD}</u>_____</p>\n" +
                "<p><strong><strong>出借人：</strong></strong></p>\n" +
                "<p>证件号码（企业统一社会信用代码或个人身份证号）：___<u>{BORROW_IDCARD}</u>___</p>\n" +
                "<p><strong><strong>平台方：</strong></strong>厦门融信普惠网络借贷信息中介服务有限公司</p>\n" +
                "<p><strong><strong>地址：</strong></strong>厦门市湖里区东港北路31号港务大厦5楼514</p>\n" +
                "<p><strong><strong>鉴于：</strong></strong></p>\n" +
                "<p>1.平台方为农金宝互金平台（包括但不限于官方网站：<a href=\"http://www.njbp2p.com\"><u>www.njbp2p.com</u></a>、微信端H5、App形式，以下简称&ldquo;农金宝互金&rdquo;平台）的运营管理人，为农金宝互金平台用户提供借款撮合服务。</p>\n" +
                "<p>2.借款人与出借人均为农金宝互金平台实名注册用户，均同意遵守平台方的规则，在认真阅读并充分理解本协议内容的前提下，双方本着友好合作的精神签署本协议。</p>";
       Html2PdfTool.htmlStr2Pdf(htmlStr,newPDFPath);
       String waterMarkName = "指旺金科";
       PdfWaterMarkTool.waterMarkByText(newPDFPath,newPDFPath2,waterMarkName);
        return "ok";
    }

    /**
     * pdf文件 添加图片水印
     * @param dto 入参
     * @return
     */
    @PostMapping("imageWatermark")
    public String imageWatermark(@RequestBody Map<String,String> dto){
        log.info("makePdf 入参{}" ,dto);
        // 模板路径
        String templatePath = "D:/upload/借款协议.pdf";
        // 生成的新文件路径
        String newPDFPath = "D:/upload/20191209-刘某-借款协议.pdf";
        String newPDFPath2 = "D:/upload/20191209-刘某-借款协议2.pdf";
        String htmlStr = "<h1 style=\"text-align: center;\"><strong>借款协议</strong></h1>\n" +
                "<p>&nbsp;</p>\n" +
                "<p>本借款协议（&ldquo;本协议&rdquo;）由以下各方于year年month月date日签订：</p>\n" +
                "<p><strong><strong>借款人：</strong></strong></p>\n" +
                "<p>证件号码（企业统一社会信用代码或个人身份证号）：____<u>{LOAN_IDCARD}</u>_____</p>\n" +
                "<p><strong><strong>出借人：</strong></strong></p>\n" +
                "<p>证件号码（企业统一社会信用代码或个人身份证号）：___<u>{BORROW_IDCARD}</u>___</p>\n" +
                "<p><strong><strong>平台方：</strong></strong>厦门融信普惠网络借贷信息中介服务有限公司</p>\n" +
                "<p><strong><strong>地址：</strong></strong>厦门市湖里区东港北路31号港务大厦5楼514</p>\n" +
                "<p><strong><strong>鉴于：</strong></strong></p>\n" +
                "<p>1.平台方为农金宝互金平台（包括但不限于官方网站：<a href=\"http://www.njbp2p.com\"><u>www.njbp2p.com</u></a>、微信端H5、App形式，以下简称&ldquo;农金宝互金&rdquo;平台）的运营管理人，为农金宝互金平台用户提供借款撮合服务。</p>\n" +
                "<p>2.借款人与出借人均为农金宝互金平台实名注册用户，均同意遵守平台方的规则，在认真阅读并充分理解本协议内容的前提下，双方本着友好合作的精神签署本协议。</p>";
        // 生成pdf文件
        Html2PdfTool.htmlStr2Pdf(htmlStr,newPDFPath);
        // 添加图片水印
        PdfWaterMarkTool.watermarkByImage(newPDFPath,newPDFPath2,imageMarkPath);
        return "ok";
    }

    /**
     * 多图片转成 pdf
     * @param dto 入参 json 数据
     * @return
     */
    @PostMapping("image2PDF")
    public String image2PDF(@RequestBody Map<String,Object> dto){
        log.info("makePdf 入参{}" ,dto);
        List<String> imagesPath = (List<String>) dto.get("images");
        String pdfPath = (String) dto.get("pdfPath");
        // 图片转成 pdf 文件
        Image2PdfTool.images2oPdf(imagesPath,pdfPath);
        // pdf 加水印
        PdfWaterMarkTool.waterMarkByText(pdfPath,pdfPath.replace(".","(2)."),waterMark);
        return "ok";
    }


    /**
     * pdf 转图片
     * @param dto 入参 json 数据
     * @return
     */
    @PostMapping("pdf2Image")
    public List<String> pdf2Image(@RequestBody Map<String,Object> dto){
        log.info("pdf2Image 入参{}" ,dto);
        List<String> pdfPaths = new ArrayList<>();
        try {
            pdfPaths = PdfTool.pdf2Images(String.valueOf(dto.get("pdfPath")));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return pdfPaths;
    }
}
