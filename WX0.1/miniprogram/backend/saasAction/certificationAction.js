/**
 * 对接SaaS系统的认证信息页
 */
const httpJS = require('../net/http.js');
const storageJS = require('../../static/storage.js');

/**
 * 获取认证信息：
 * bsertification 返回的实体类数据；
 */
function getSertification(callback) {
    let bsertification = {};
    let datalist = {
        user: storageJS.getUser().account,
        form: "dc_bm_authentication",
        action: "leftJoin",
        fields: {
            "dc_bm_authentication": [
                "name as username", // 用户姓名
                "email", // 邮箱
                // 所属部门
                "phone", // 手机号码
                "identification", // 身份证号码
                "level", // 级别定位
                "address", // 省份
                // 城市
                // 风险保证金
                "start_time", // 责任有效期开始
                "end_time", // 责任有效期结束
                "working_years", // 从业年限
                "emergency_contact", // 紧急联系人
                "emergency_phone", // 紧急联系人电话
            ]
        },
        join: [{
            "dc_bm_authentication": "user_id",
            "dc_users": "id"
        }],
        page: null,
        condition: {
            "dc_users": [{
                "field": "username",
                "value": storageJS.getUser().account,
                "symbol": "="
            }]
        },
    };
    httpJS.request('/mform', datalist, function (res) {
        if (res.data.code > 0) {
            let resauthentication = res.data.datalist.dc_bm_authentication;
            if (null != resauthentication) {
                bsertification = resauthentication[0];
            }
        }
        return typeof callback == 'function' && callback(bsertification)
    });
}

module.exports = {
    getSertification: getSertification,
}