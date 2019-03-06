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
export let comitFileANDConfirmValue = function (
    ffileInfo = { file: null, filename: null, },
    fconfirmvalueInfo = { confirmat: null, outputvalue: null, receivableamount: null, valueuploadat: null },
    cconfirmvalueformid = null, cprojectid = null,
    callback) {
    if (null != cconfirmvalueformid) {
        confirmvalueAction.updateConfirmvalue(fconfirmvalueInfo, cconfirmvalueformid, cprojectid, function (res) {
            if (res.code == 1) {
                if (null != ffileInfo && null != ffileInfo.file && '' != ffileInfo.file) {
                    let uploadfileInfo = {
                        projectid: cprojectid,
                        belongidlist: cconfirmvalueformid,
                        file: ffileInfo.file,
                        filename: ffileInfo.filename,
                        filebelong: "确认产值",
                        formname: 'dc_mng_project_confirmvalues'
                    }
                    fileAction.fileUpload(uploadfileInfo, function (res) {
                        return typeof callback == 'function' && callback({ code: res.code })
                    })
                } else return typeof callback == 'function' && callback({ code: res.code })
            } else return typeof callback == 'function' && callback({ code: res.code })
        });
    } else {
        fconfirmvalueInfo.projectid = cprojectid;
        confirmvalueAction.addConfirmvalue(fconfirmvalueInfo, function (res) {
            if (res.code == 1) {
                if (null != ffileInfo && null != ffileInfo.file && '' != ffileInfo.file) {
                    let uploadfileInfo = {
                        projectid: cprojectid,
                        belongidlist: res.formid,
                        file: ffileInfo.file,
                        filename: ffileInfo.filename,
                        filebelong: "确认产值",
                        formname: 'dc_mng_project_confirmvalues'
                    }
                    fileAction.fileUpload(uploadfileInfo, function (res) {
                        return typeof callback == 'function' && callback({ code: res.code })
                    })
                } else return typeof callback == 'function' && callback({ code: res.code })
            } else return typeof callback == 'function' && callback({ code: res.code })
        })
    }
}

/**
 * 打包提交附件、新建产值信息：
 * ffileInfo 文件实体类数据，file 文件本件、filename 文件名称；
 * fconfirmvalueInfo 产值实体类数据，其中：
 * fconfirmvalueInfo.confirmnodeformid 申报节点的表单id；
 * code 返回的服务器结果；
 **/
export let addFileANDConfirmValue = function (
    ffileInfo = { file: null, filename: null, },
    fconfirmvalueInfo = { confirmnodeformid: null, projectid: null, confirmat: null, outputvalue: null, receivableamount: null, valueuploadat: null },
    callback) {
    confirmvalueAction.addConfirmvaluebformid(fconfirmvalueInfo, fconfirmvalueInfo.confirmnodeformid, function (res) {
        if (res.code == 1) {
            if (null != ffileInfo && null != ffileInfo.file && '' != ffileInfo.file) {
                let uploadfileInfo = {
                    projectid: fconfirmvalueInfo.projectid,
                    belongidlist: res.formid,
                    file: ffileInfo.file,
                    filename: ffileInfo.filename,
                    filebelong: "确认产值",
                    formname: 'dc_mng_project_confirmvalues'
                }
                fileAction.fileUpload(uploadfileInfo, function (res) {
                    return typeof callback == 'function' && callback({ code: res.code })
                })
            } else return typeof callback == 'function' && callback({ code: res.code })
        } else return typeof callback == 'function' && callback({ code: res.code })
    })
}
