/**
 * 对接回款-流水线
 */
const httpJS = require('../net/http.js');
const storageJS = require('../../static/storage.js');

/**
 * 获取单项目的回款流水线列表：
 * cprojectid 项目id；
 * blinesList 返回的实体类数据；
 */
function getLinesList(cprojectid, callback) {
    let blinesList = [];
    let datalist = {
        user: storageJS.getUser().account,
        form: "dc_project_lines",
        action: "get",
        fields: [
            "id",
            "amount",
            "date",
        ],
        page: null,
        condition: [{
            field: "contract_id",
            value: cprojectid,
            symbol: "="
        }, {
            field: "deleted",
            value: '0',
            symbol: "="
        }, {
            field: "type",
            value: 'returned',
            symbol: "="
        }, {
            field: "sub_type",
            value: 'returned',
            symbol: "="
        }],
    }
    httpJS.request('/form', datalist, function (res) {
        if (JSON.parse(res.data).code > 0) {
            let reslinesList = JSON.parse(res.data).datalist.dc_project_lines;
            if (null != reslinesList)
                blinesList = reslinesList;
        }
        return typeof callback == 'function' && callback(blinesList);
    });
};

/**
 * 获取单项目的单条回款流水线记录：
 * cprojectid 项目id；
 * cid 表单id；
 * blines 返回的实体类数据；
 */
function getLinesLPage(cprojectid, cid, callback) {
    let blines = {};
    let datalist = {
        user: storageJS.getUser().account,
        form: "dc_project_lines",
        action: "get",
        fields: [
            "id",
            "amount",
            "date",
        ],
        page: null,
        condition: [{
            field: "contract_id",
            value: cprojectid,
            symbol: "="
        }, {
            field: "deleted",
            value: '0',
            symbol: "="
        }, {
            field: "id",
            value: cid,
            symbol: "="
        }, {
            field: "type",
            value: 'returned',
            symbol: "="
        }, {
            field: "sub_type",
            value: 'returned',
            symbol: "="
        }],
    }
    httpJS.request('/form', datalist, function (res) {
        if (JSON.parse(res.data).code > 0) {
            let reslinesList = JSON.parse(res.data).datalist.dc_project_lines;
            if (null != reslinesList)
                blines = reslinesList[0];
        }
        return typeof callback == 'function' && callback(blines);
    });
};

module.exports = {
    getLinesList: getLinesList,
    getLinesLPage: getLinesLPage,
}