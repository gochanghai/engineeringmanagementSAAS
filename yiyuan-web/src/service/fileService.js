const httpServer = require('./server/http.js');
const username = localStorage.getItem("username");
const groupid = localStorage.getItem("groupid");

const tbl_file = 'file_forms';
const tbl_file_fields = ["objectid as id", "projectid as workid", "filebelong", "fileid", "filename", "filetype", "filesize", "uploadat", "thumb"];


/**
 * 文件下载 
 */
export let downloadFile = function (file, callback) {
  let data = {
    user: username,
    platform: "PWC",
    fileId: file.fileid,
    fileName: file.filename
  };
  console.log(data)
  let filename = file.filename;
  httpServer.request('file/download/' + file.formname + "/0", data, res => {
    console.log(res)
    if (res.status == 200) {
      const blob = new Blob([res.data]);
      console.log(blob);
      if ("download" in document.createElement("a")) {
        const elink = document.createElement("a");
        elink.download = filename;
        elink.style.display = "none";
        elink.href = URL.createObjectURL(blob);
        console.log(elink);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
      } else {
        // IE10+下载
        navigator.msSaveBlob(blob, filename);
      }
    }
    return typeof callback == 'function' && callback({fileURL: res.status})
  })
}

/**
 * 获取一个文件
 */
export let getSingleFile = function (formname, type, callback) {
  let data = {
    user: username,
    form: tbl_file,
    action: "get",
    fields: tbl_file_fields,
    condition: [{
        field: "formname",
        value: formname,
        symbol: "="
    },{
      field: "belongidlist",
      value: type,
      symbol: "="
    },{
      field: "projectid",
      value: groupid,
      symbol: "="
    }],
    order: "objectid desc"
  };
  console.log(data)
  httpServer.request('form', data, res => {
    console.log(res.data);
    let result = {
        file: null,
        code: res.data.code
    };
    if(1 === res.data.code && null != res.data.datalist.file_forms){
        result.file = res.data.datalist.file_forms[0];
        return typeof callback == 'function' && callback(result)
    }
    return typeof callback == 'function' && callback(result)
  })
}