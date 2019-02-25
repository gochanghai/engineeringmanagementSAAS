const httpJS = require('../net/http.js');
const storageJS = require('../../static/storage.js');

/**
 * 获取项目的基本信息：
 * cprojectid 项目id；
 * bprojectInfo 返回的实体类数据；
 */
function getProjectInfo(cprojectid, callback) {
    let bprojectInfo = {};
    let datalist = {
        user: storageJS.getUser().account,
        form: "dc_projects",
        action: "leftJoin",
        fields: {
            "dc_projects": [
                "name as projectname", // 项目名称
                "code", // 项目编码
                "project_type as projecttype", // 项目类型
                "contract_amount as contractamount", // 合同金额
                "start_date as startdate", // 开始日期
                "end_date as enddate", // 结束日期
                "building_category as buildingcategory", // 建筑类型
                "payment_mode as paymentmode", // 付款方式
                "date_register as dateregister" // 登记日期
            ],
            "dc_partners_a": [
                "name as partnera", // 甲方公司
                "partner_a", // 是否甲方公司
            ],
            "dc_partners_b": [
                "name as partnerb", // 乙方公司
                "partner_b", // 是否乙方公司
            ]
        },
        join: [{
            "dc_projects": "partner_a_id",
            "dc_partners as dc_partners_a": "id"
        }, {
            "dc_projects": "partner_b_id",
            "dc_partners as dc_partners_b": "id"
        }],
        page: null,
        condition: {
            "dc_projects": [{
                "field": "id",
                "value": cprojectid,
                "symbol": "="
            }],
        },
    };
    httpJS.request('/mform', datalist, function (res) {
        if (res.data.code > 0) {
            let resprojectinfo = res.data.datalist.dc_projects;
            if (null != resprojectinfo) {
                bprojectInfo = resprojectinfo[0];
            }
        }
        return typeof callback == 'function' && callback(bprojectInfo)
    });
};

/**
 * 获取项目详情的其他模块数据：
 * bmoduleinfo 返回的实体类数据；
 */
function getModuleInfo(cprojectid, callback) {
    let bmoduleinfo = {};
    let datalist = {
        user: storageJS.getUser().account,
        projectIDList: cprojectid
    }
    httpJS.request('/mysaas/project/liststatis/get/all', datalist, function (res) {
        if (res.data.code > 0) {
            let resdatalist = res.data.datalist;
            if (null != resdatalist) {
                // 账户可用余额
                bmoduleinfo.usablemoney = resdatalist[cprojectid].recievedpay[0].usable_money || 0;
                // 经营保证金账户
                bmoduleinfo.marginmoney = resdatalist[cprojectid].recievedpay[0].project_margin || 0;
                // 未交底
                bmoduleinfo.undisclosecount = resdatalist[cprojectid].worker_undisclose[0].sumundisclose;
                // 未教育
                bmoduleinfo.uneductioncount = resdatalist[cprojectid].worker_uneduction[0].sumuneducation;
                // 未参保
                bmoduleinfo.uninsurecount = resdatalist[cprojectid].worker_uninsure[0].sumuninsurance;
                // 已交底
                bmoduleinfo.disclosecount = resdatalist[cprojectid].worker[0].workercount - resdatalist[cprojectid].worker_undisclose[0].sumundisclose;
                // 已教育
                bmoduleinfo.eductioncount = resdatalist[cprojectid].worker[0].workercount - resdatalist[cprojectid].worker_uneduction[0].sumuneducation;
                // 已参保
                bmoduleinfo.insurecount = resdatalist[cprojectid].worker[0].workercount - resdatalist[cprojectid].worker_uninsure[0].sumuninsurance;
                // 总产值比例
                bmoduleinfo.confirmvalueratio = null != resdatalist[cprojectid].confirmvalue[0].outputvaluesum && null != resdatalist[cprojectid].contract_amount[0].contractamountsum && resdatalist[cprojectid].contract_amount[0].contractamountsum != 0
                    ? resdatalist[cprojectid].confirmvalue[0].outputvaluesum / resdatalist[cprojectid].contract_amount[0].contractamountsum
                    : 0;
                // 总回款比例
                bmoduleinfo.receivedpayratio = resdatalist[cprojectid].recievedpay[0].returned_ratio || 0;
                // 可收款比例
                bmoduleinfo.receivableamountratio = null != resdatalist[cprojectid].confirmvalue[0].outputvaluesum && null != resdatalist[cprojectid].recievedpay[0].usable_money && resdatalist[cprojectid].confirmvalue[0].outputvaluesum != 0
                    ? resdatalist[cprojectid].confirmvalue[0].outputvaluesum - resdatalist[cprojectid].recievedpay[0].returned_amount / resdatalist[cprojectid].confirmvalue[0].outputvaluesum
                    : 0;
                // 管理人员总数
                bmoduleinfo.managercount = resdatalist[cprojectid].manager[0].managercount;
                // 劳务人员总数
                bmoduleinfo.workercount = resdatalist[cprojectid].worker[0].workercount;
                // 施工班组总数
                bmoduleinfo.groupcount = resdatalist[cprojectid].project_group[0].groupcount;
            }
        }
        return typeof callback == 'function' && callback(bmoduleinfo)
    })
}


module.exports = {
    getProjectInfo: getProjectInfo,
    getModuleInfo: getModuleInfo,
}