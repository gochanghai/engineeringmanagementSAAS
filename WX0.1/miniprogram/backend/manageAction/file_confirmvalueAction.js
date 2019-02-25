const fileAction = require('./fileAction.js');
const confirmvalueAction = require('./confirmvalueAction.js');

/**
 * 打包提交附件、更改产值信息：
 * ffileInfo 文件实体类数据，file 文件本件、filename 文件名称；
 * fconfirmvalueInfo 产值实体类数据；
 * cconfirmvalueformid 更新产值对象的表单id；
 * cprojectid 更新产值对象的项目id；
 * code 返回的服务器结果；
 **/
function comitFileANDConfirmValue(
    ffileInfo = { file: null, filename: null, },
    fconfirmvalueInfo = { confirmat: null, outputvalue: null, receivableamount: null, valueuploadat: null },
    cconfirmvalueformid = null, cprojectid = null,
    callback) {
    confirmvalueAction.updateConfirmvalue(fconfirmvalueInfo, cconfirmvalueformid, cprojectid, function (res) {
        if (res.code == 1) {
            if (null != ffileInfo && null != ffileInfo.file && '' != ffileInfo.file) {
                let uploadfileInfo = {
                    projectid: fconfirmvalueInfo.projectid,
                    belongidlist: fconfirmvalueInfo.formid,
                    file: ffileInfo.file,
                    filename: ffileInfo.filename,
                    filebelong: "确认产值",
                    formname: 'confirmvalue'
                }
                fileAction.fileUpload(uploadfileInfo, function (res) {
                    return typeof callback == 'function' && callback({ code: res.code })
                })
            } else return typeof callback == 'function' && callback({ code: res.code })
        } else return typeof callback == 'function' && callback({ code: res.code })
    });
}

module.exports = {
    comitFileANDConfirmValue: comitFileANDConfirmValue,
}