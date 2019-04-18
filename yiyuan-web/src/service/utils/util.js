/**
 * 文件大小计算工具
 */
export let fileSizeFormat = function (size1){
    let kb = 1024;
      let mb = kb * 1024;
      let gb = mb * 1024;
      let size = parseInt(size1);
      // 保留两位小数
    if (size >= gb) {
        var f = (size / gb).toFixed(2);
        return "" + size + " GB";
    } else if (size >= mb) {
        var f = (size / mb).toFixed(2);
        return "" + f + " MB";
    } else if (size >= kb) {
        var f = (size / kb).toFixed(2);
        return "" + f + " KB";
    } else
        return "" + size + " B";
}


/**
 * 判断文件图片、视频、文档、pdf等类型的方法工具
 * @param: fileName - 文件名称
 * @param: 数据返回 1) 无后缀匹配 - false
 * @param: 数据返回 2) 匹配图片 - image
 * @param: 数据返回 3) 匹配 txt - txt
 * @param: 数据返回 4) 匹配 excel - excel
 * @param: 数据返回 5) 匹配 word - word
 * @param: 数据返回 6) 匹配 pdf - pdf
 * @param: 数据返回 7) 匹配 ppt - ppt
 * @param: 数据返回 8) 匹配 视频 - video
 * @param: 数据返回 9) 匹配 音频 - radio
 * @param: 数据返回 10) 其他匹配项 - other 
 */       
export let fileMatchType = function (fileName){
    // 后缀获取
    var suffix = '';
    // 获取类型结果
    var result = '';
    try {
      var flieArr = fileName.split('.');
      suffix = flieArr[flieArr.length - 1];
    } catch (err) {
      suffix = '';
    }
    // fileName无后缀返回 false
    if (!suffix) {
      result = false;
      return result;
    }
    // 图片格式
    var imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
    // 进行图片匹配
    result = imglist.some(function (item) {
      return item == suffix;
    });
    if (result) {
      result = 'image';
      return result;
    };
    // 匹配txt
    var txtlist = ['txt'];
    result = txtlist.some(function (item) {
      return item == suffix;
    });
    if (result) {
      result = 'txt';
      return result;
    };
    // 匹配 excel
    var excelist = ['xls', 'xlsx'];
    result = excelist.some(function (item) {
      return item == suffix;
    });
    if (result) {
      result = 'excel';
      return result;
    };
    // 匹配 word
    var wordlist = ['doc', 'docx'];
    result = wordlist.some(function (item) {
      return item == suffix;
    });
    if (result) {
      result = 'word';
      return result;
    };
    // 匹配 pdf
    var pdflist = ['pdf'];
    result = pdflist.some(function (item) {
      return item == suffix;
    });
    if (result) {
      result = 'pdf';
      return result;
    };
    // 匹配 ppt
    var pptlist = ['ppt','pptx'];
    result = pptlist.some(function (item) {
      return item == suffix;
    });
    if (result) {
      result = 'ppt';
      return result;
    };
    // 匹配 视频
    var videolist = ['mp4', 'm2v', 'mkv', 'avi'];
    result = videolist.some(function (item) {
      return item == suffix;
    });
    if (result) {
      result = 'video';
      return result;
    };
    // 匹配 音频
    var radiolist = ['mp3', 'wav', 'wmv'];
    result = radiolist.some(function (item) {
      return item == suffix;
    });
    if (result) {
      result = 'radio';
      return result;
    }
    // 其他 文件类型
    result = 'other';
    return result;
}


