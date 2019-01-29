
//根据后缀名区分文档类型、图片类型、其它类型
export function recFileCase(fileSux) {
    if (fileSux == 'doc' || fileSux == 'docx' || fileSux == 'xls' || fileSux == 'xlsx' || fileSux == 'ppt' || fileSux == 'pptx' || fileSux == 'pdf')
        return 'document' // 文档
    else if (fileSux == 'jpg' || fileSux == 'png' || fileSux == 'jpeg' || fileSux == 'gif')
        return 'image' // 图片
    else return -1 // 其它
}

//获取文件后缀名
export function getSux(dealName) {
    let fileName = dealName.lastIndexOf("."); //取到文件名开始到最后一个点的长度
    let fileNameLength = dealName.length; //取到文件名长度
    let fileFormat = dealName.substring(fileName + 1, fileNameLength); //截
    return fileFormat;
}