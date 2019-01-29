const fileJS = require('./file.js');
const confirmvalueJS = require('./confirmvalue.js');
const recievedpayJS = require('./recievedpay.js')

// 打包提交附件、更改产值信息
function comitFileANDConfirmValue(
    confirmvalueInfo = { confirmAt: null, outputValue: null, receivableAmount: null, valueUploadAt: null, formId: null, projectID: null, progressNodeID: null, ownerPayTime: null, },
    fileInfo = { file: null, fileName: null, },
    callback) {
    let updataData = {
        confirmAt: confirmvalueInfo.confirmAt,
        outputValue: confirmvalueInfo.outputValue,
        receivableAmount: confirmvalueInfo.receivableAmount,
        valueUploadAt: confirmvalueInfo.valueUploadAt,
        formId: confirmvalueInfo.formId,
        projectID: confirmvalueInfo.projectID,
        progressNodeID: confirmvalueInfo.progressNodeID,
        ownerPayTime: confirmvalueInfo.ownerPayTime,
    }
    confirmvalueJS.updateConfirmvalue(updataData, function (res) {
        if (res.code === 1) {
            if (null != fileInfo && null != fileInfo.file) {
                let uploadfileInfo = {
                    projectID: confirmvalueInfo.projectID,
                    belongIdList: confirmvalueInfo.formId,
                    file: fileInfo.file,
                    fileName: fileInfo.fileName,
                    fileBelong: "确认产值",
                    formName: 'confirmvalue'
                }
                fileJS.fileUpload(uploadfileInfo, function (res) {
                    return typeof callback == 'function' && callback({ code: res.code })
                })
            } else return typeof callback == 'function' && callback({ code: res.code })
        } else return typeof callback == 'function' && callback({ code: res.code })
    });
}

// 打包提交附件、更改回款信息
function comitFileANDRecievedpay(
    recievedpayInfo = { formId: null, projectID: null, actualReceivAmount: null, actualReceivAt: null, },
    fileInfo = { file: null, fileName: null, },
    callback) {
    let updataData = {
        formId: recievedpayInfo.formId,
        projectID: recievedpayInfo.projectID,
        actualReceivAmount: recievedpayInfo.actualReceivAmount,
        actualReceivAt: recievedpayInfo.actualReceivAt,
    }
    recievedpayJS.updateRecievedpay(updataData, function (res) {
        if (res.code === 1) {
            if (null != fileInfo && null != fileInfo.file) {
                let uploadfileInfo = {
                    projectID: recievedpayInfo.projectID,
                    belongIdList: recievedpayInfo.formId,
                    file: fileInfo.file,
                    fileName: fileInfo.fileName,
                    fileBelong: "回款",
                    formName: 'recievedpay'
                }
                fileJS.fileUpload(uploadfileInfo, function (res) {
                    return typeof callback == 'function' && callback({ code: res.code })
                })
            } else return typeof callback == 'function' && callback({ code: res.code })
        } else return typeof callback == 'function' && callback({ code: res.code })
    });
}

module.exports = {
    comitFileANDConfirmValue: comitFileANDConfirmValue,
    comitFileANDRecievedpay: comitFileANDRecievedpay,
}