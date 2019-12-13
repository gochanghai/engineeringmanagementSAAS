package com.gochanghai.springbootpdfdemo.util;

import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.html2pdf.HtmlConverter;
import com.itextpdf.layout.font.FontProvider;

import java.io.*;

/***
 * @Description:
 * @Auther: changhai.liu
 * @Date: 2019/12/9 11:10
 * @Version : V1.0
 */
public class Html2PdfTool {

    /**
     * windows运行环境需要处理第一个/,根据自身环境决定是否执行该方法
     */
    public static final String PATH = Html2PdfTool.class.getResource("/").getPath()
            .replaceFirst("/","");

    /**
     * html 字符串转换为 pdf 文件
     * htmlStr2Pdf
     * @param htmlStr    字符串格式的html
     * @param pdfPath    pdf文件地址
     */
    public static void htmlStr2Pdf(String htmlStr,String pdfPath){
        File pdfFile = new File(pdfPath);
        try(OutputStream outputStream = new FileOutputStream(pdfFile)){
            HtmlConverter.convertToPdf(htmlStr,outputStream,getCnConverterProperties());
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * @Description    ：htmlFile2pdfFile
     * @Method_Name    ：html2Pdf
     * @param htmlPath   html文件地址
     * @param pdfPath    pdf文件地址
     */
    public static void html2Pdf(String htmlPath,String pdfPath){
        //读取的html文件地址
        File htmlFile = new File(PATH + htmlPath);
        //生成的pdf地址
        File pdfFile = new File(PATH + pdfPath);
        try {
            //HtmlFile TO PdfFile
            HtmlConverter.convertToPdf(htmlFile,pdfFile,getCnConverterProperties());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 将html文件转换为Str
     * @param htmlPath   html文件地址
     * @return java.lang.String
     */
    public static String html2Str(String htmlPath){
        //读取的html文件地址
        File htmlFile = new File(Html2PdfTool.PATH + htmlPath);
        StringBuilder stringBuilder = new StringBuilder();
        try (FileReader fileReader = new FileReader(htmlFile);
             BufferedReader bufferedReader = new BufferedReader(fileReader)){
            String htmlStr = bufferedReader.readLine();
            stringBuilder.append(htmlStr);
            while (htmlStr != null){
                stringBuilder.append(htmlStr);
                htmlStr = bufferedReader.readLine();
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return stringBuilder.toString();
    }

    /**
     * 获取设置了中文ttf字体的converterProperties
     */
    public static ConverterProperties getCnConverterProperties(){
        ConverterProperties converterProperties = new ConverterProperties();
        //设置中文字体，ttf文件夹下SimSum-01和Dengb分别支持细字体和粗字体，缺一不可
        FontProvider fontProvider = new FontProvider();
        System.out.println(PATH);
        fontProvider.addDirectory(PATH + "/ttf/");
        converterProperties.setFontProvider(fontProvider);

        return converterProperties;
    }
}
