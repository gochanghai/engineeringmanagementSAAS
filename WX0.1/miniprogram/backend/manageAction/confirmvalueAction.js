const httpJS = require('../../static/http.js');
const storageJS = require('../../static/storage.js');
const dateUtilJS = require('../../utils/date.js')
/**
 * 获取单项目的多条产值登记数据：
 * cprojectid 项目id；
 * bconfirmvalueList 返回实体类数组数据；
 */
export let getConfirmvalueList = function (cprojectid, callback) {
    let bconfirmvalueList = [];
    let datalist = {
        user: storageJS.getUser().account,
        form: "dc_mng_project_confirmvalues",
        action: "leftJoin",
        fields: {
            dc_mng_project_confirmvalues: [
                "formid",
                "confirmat",
                "outputvalue",
                "receivableamount",
                "valueuploadat",
            ],
            dc_mng_contract: ["ownerpaypercent"],
            dc_mng_project_confirmnodes: ["datenode"]
        },
        join: [{
            dc_mng_project_confirmvalues: "projectid",
            dc_mng_contract: "projectid"
        }, {
            dc_mng_project_confirmvalues: "formid",
            dc_mng_project_confirmnodes: "confirmvaluesid"
        }],
        page: null,
        condition: {
            dc_mng_project_confirmvalues: [{
                field: "projectid",
                value: cprojectid,
                symbol: "="
            }]
        }
    };
    httpJS.request('/mform', datalist, function (res) {
        try {
            bconfirmvalueList = res.data.datalist.dc_mng_project_confirmvalues || null;
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
export let getConfirmvalue = function (cformid, cprojectid, callback) {
    let bconfirmvalue = {};
    let datalist = {
        user: storageJS.getUser().account,
        form: "dc_mng_project_confirmvalues",
        action: "leftJoin",
        fields: {
            dc_mng_project_confirmvalues: [
                "formid",
                "confirmat",
                "outputvalue",
                "receivableamount",
                "valueuploadat",
            ],
            dc_mng_contract: ["ownerpaypercent"],
            dc_mng_project_confirmnodes: ["datenode"]
        },
        join: [{
            dc_mng_project_confirmvalues: "projectid",
            dc_mng_contract: "projectid"
        }, {
            dc_mng_project_confirmvalues: "formid",
            dc_mng_project_confirmnodes: "confirmvaluesid"
        }],
        page: {
            "pageSize": 1,
            "pageIndex": 0
        },
        condition: {
            dc_mng_project_confirmvalues: [{
                field: "formid",
                value: cformid,
                symbol: "="
            }, {
                field: "projectid",
                value: cprojectid,
                symbol: "="
            }]
        }
    };
    httpJS.request('/mform', datalist, function (res) {
        try {
            bconfirmvalue = res.data.datalist.dc_mng_project_confirmvalues[0] || null;
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
export let updateConfirmvalue = function (fconfirmvalue = { confirmat: null, outputvalue: null, receivableamount: null, valueuploadat: null }, cformid = null, cprojectid = null, callback) {
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
export let deleteConfirmvalue = function (cformid = null, cprojectid = null, callback) {
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
export let addConfirmvalue = function (fconfirmvalue = { confirmat: null, outputvalue: null, receivableamount: null, valueuploadat: null, projectid: null }, callback) {
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

/**
 * 获取单项目的未申报时间节点列表：
 * cprojectid 项目id；
 * bnodeList 返回实体类数组数据；
 */
export let getUnConfirmNode = function (cprojectid, callback) {
    let bnodeList = [];
    let datalist = {
        user: storageJS.getUser().account,
        form: "dc_mng_project_confirmnodes",
        action: "get",
        distinct: false,
        fields: ["formid", "datenode"],
        page: null,
        condition: [{
            field: "projectid",
            value: cprojectid,
            symbol: "="
        }, {
            field: "confirmvaluesid",
            value: null,
            symbol: "="
        }]
    };
    httpJS.request('/form', datalist, function (res) {
        if (JSON.parse(res.data).code > 0) {
            let DateList = JSON.parse(res.data).datalist.dc_mng_project_confirmnodes;
            if (null != DateList) {
                bnodeList = DateList;
            }
        }
        return typeof callback == 'function' && callback(bnodeList);
    });
};

/**
 * 新增单条产值登记数据并返回formid：
 * fconfirmvalue 实体类数据；
 * cconfirmnodeformid  项目节点表单id；
 * code 返回服务器的结果；
 * formid 返回新增记录的表单id；
 */
export let addConfirmvaluebformid = function (fconfirmvalue = { confirmat: null, outputvalue: null, receivableamount: null, valueuploadat: null, projectid: null }, cconfirmnodeformid = null, callback) {
    let datalist = {
        user: storageJS.getUser().account,
        form: "dc_mng_project_confirmvalues",
        action: "add",
        retFields: ["formid"],
        fields: [{
            confirmat: dateUtilJS.formatTime(fconfirmvalue.confirmat),
            outputvalue: fconfirmvalue.outputvalue,
            receivableamount: fconfirmvalue.receivableamount,
            valueuploadat: null != fconfirmvalue.valueuploadat && '' != fconfirmvalue.valueuploadat ? dateUtilJS.formatTime(fconfirmvalue.valueuploadat) : null,
            projectid: fconfirmvalue.projectid
        }],
        page: null,
        condition: null
    };
    httpJS.request('/form', datalist, function (res) {
        let bformid, resData = JSON.parse(res.data).datalist.dc_mng_project_confirmvalues;
        if (null != resData) {
            bformid = resData[0].formid;
        }
        if (JSON.parse(res.data).code > 0) {
            let datalist = {
                user: storageJS.getUser().account,
                form: "dc_mng_project_confirmvalues",
                action: "updateList",
                fields: [{
                    confirmvaluesid: bformid,
                }],
                page: null,
                condition: [{
                    field: "formid",
                    value: cconfirmnodeformid,
                    symbol: "="
                }]
            };
            httpJS.request('/form', datalist, function (updateres) {
                return typeof callback == 'function' && callback({ code: JSON.parse(res.data).code, formid: bformid });
            })
        }
    });
};
