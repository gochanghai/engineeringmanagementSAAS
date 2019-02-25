const httpJS = require('../net/http.js');
const storageJS = require('../../static/storage.js');
const dateUtilJS = require('../../utils/date.js')

/**
 * 获取单项目的多条产值登记数据：
 * cprojectid 项目id；
 * bconfirmvalueList 返回实体类数组数据；
 */
function getConfirmvalueList(cprojectid, callback) {
    let bconfirmvalueList = [];
    let datalist = {
        user: storageJS.getUser().account,
        form: "dc_mng_project_confirmvalues",
        action: "get",
        distinct: false,
        fields: [
            "formid",
            "confirmat",
            "outputvalue",
            "receivableamount",
            "valueuploadat",
        ],
        page: null,
        condition: [{
            field: "projectid",
            value: cprojectid,
            symbol: "="
        }]
    };
    httpJS.request('/form', datalist, function (res) {
        try {
            bconfirmvalueList = JSON.parse(res.data).datalist.dc_mng_project_confirmvalues || null;
        } catch (error) { }
        return typeof callback == 'function' && callback(bconfirmvalueList);
    });
};

/**
 * 获取产值登记数据：
 * cformid 对象id；
 * cprojectid 项目id；
 * bconfirmvalue 返回实体类数据；
 */
function getConfirmvalue(cformid, cprojectid, callback) {
    let bconfirmvalue = {};
    let datalist = {
        user: storageJS.getUser().account,
        form: "dc_mng_project_confirmvalues",
        action: "get",
        distinct: false,
        fields: [
            "formid",
            "confirmat",
            "outputvalue",
            "receivableamount",
            "valueuploadat",
        ],
        page: {
            "pageSize": 1,
            "pageIndex": 0
        },
        condition: [{
            field: "formid",
            value: cformid,
            symbol: "="
        }, {
            field: "projectid",
            value: cprojectid,
            symbol: "="
        }]
    };
    httpJS.request('/form', datalist, function (res) {
        try {
            bconfirmvalue = JSON.parse(res.data).datalist.dc_mng_project_confirmvalues[0] || null;
        } catch (error) { }
        return typeof callback == 'function' && callback(bconfirmvalue);
    });
};

/**
 * 更新产值登记数据：
 * fconfirmvalue 实体类数据；
 * cformid 对象id；
 * cprojectid 项目id；
 * code 返回服务器的结果；
 */
function updateConfirmvalue(fconfirmvalue = { confirmat: null, outputvalue: null, receivableamount: null, valueuploadat: null }, cformid = null, cprojectid = null, callback) {
    let datalist = {
        user: storageJS.getUser().account,
        form: "dc_mng_project_confirmvalues",
        action: "updateList",
        fields: {
            confirmat: dateUtilJS.formatTime(fconfirmvalue.confirmat),
            outputvalue: fconfirmvalue.outputvalue,
            receivableamount: fconfirmvalue.receivableamount,
            valueuploadat: dateUtilJS.formatTime(fconfirmvalue.valueuploadat),
        },
        page: null,
        condition: [{
            field: "formid",
            value: cformid,
            symbol: "="
        }, {
            field: "projectid",
            value: cprojectid,
            symbol: "="
        }]
    };
    httpJS.request('/form', datalist, function (res) {
        return typeof callback == 'function' && callback({ code: JSON.parse(res.data).code })
    });
};


/**
 * 删除产值登记数据：
 * cformid 对象id；
 * cprojectid 项目id；
 * code 返回服务器的结果；
 */
function deleteConfirmvalue(cformid = null, cprojectid = null, callback) {
    let datalist = {
        user: storageJS.getUser().account,
        form: "dc_mng_project_confirmvalues",
        action: "deleteList",
        fields: null,
        page: null,
        condition: [{
            field: "formid",
            value: cformid,
            symbol: "="
        }, {
            field: "projectid",
            value: cprojectid,
            symbol: "="
        }]
    };
    httpJS.request('/form', datalist, function (res) {
        return typeof callback == 'function' && callback({ code: JSON.parse(res.data).code })
    });
};

/**
 * 新增产值登记数据：
 * fconfirmvalue 实体类数据；
 * code 返回服务器的结果；
 */
function addConfirmvalue(fconfirmvalue = { confirmat: null, outputvalue: null, receivableamount: null, valueuploadat: null, projectid: null }, callback) {
    let datalist = {
        user: storageJS.getUser().account,
        form: "dc_mng_project_confirmvalues",
        action: "add",
        fields: [{
            confirmat: dateUtilJS.formatTime(fconfirmvalue.confirmat),
            outputvalue: fconfirmvalue.outputvalue,
            receivableamount: fconfirmvalue.receivableamount,
            valueuploadat: dateUtilJS.formatTime(fconfirmvalue.valueuploadat),
            projectid: fconfirmvalue.projectid
        }],
        page: null,
        condition: null
    };
    console.log(datalist);
    httpJS.request('/form', datalist, function (res) {
        return typeof callback == 'function' && callback({ code: JSON.parse(res.data).code })
    });
};



module.exports = {
    updateConfirmvalue: updateConfirmvalue,
    addConfirmvalue: addConfirmvalue,
    getConfirmvalue: getConfirmvalue,
    getConfirmvalueList: getConfirmvalueList,
    deleteConfirmvalue: deleteConfirmvalue,
}