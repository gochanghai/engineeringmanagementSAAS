const httpJS = require('../net/http.js');
const storageJS = require('../../static/storage.js');

/**
 * 获取单个项目的施工班组统计数据：
 * cprojectid 项目id；
 * bstatisdata 返回的实体类数据；
 */
function getWorkerstatis(cprojectid, callback) {
    let bstatisdata = [];
    let datalist = {
        user: storageJS.getUser().account,
        projectID: cprojectid
    };
    httpJS.request('/mysaas/project/workerstatis/get/all', datalist, function (res) {
        if (res.data.code > 0) {
            let resdatalist = res.data.datalist
            if (null != resdatalist)
                bstatisdata = resdatalist;
        }
        return typeof callback == 'function' && callback(bstatisdata);
    });
};


module.exports = {
    getWorkerstatis: getWorkerstatis,
}