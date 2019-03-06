const httpJS = require('../../static/http.js');
const storageJS = require('../../static/storage.js');
const sendingSystemJS = require('../../utils/sendingSystem.js');
const dateUtilJS = require('../../utils/date.js');



/**
 * 新增绑定平台帐号与微信帐号：
 * fwxinfo 微信实体类数据；
 * code 返回的服务器结果；
 */
export let addUSERbindWXID = function (fwxinfo = {
    nickname: null,
    gender: null,
    language: null,
    city: null,
    province: null,
    country: null,
    avatarurl: null,
    signature: null,
    encrypteddata: null,
    iv: null,
    openid: null,
}, callback) {
    let datalist = {
        user: storageJS.getUser().account,
        action: "bound",
        fields: [{
            username: storageJS.getUser().account,
            nickname: fwxinfo.nickname,
            gender: fwxinfo.gender,
            language: fwxinfo.language,
            city: fwxinfo.city,
            province: fwxinfo.province,
            country: fwxinfo.country,
            avatarurl: fwxinfo.avatarurl,
            signature: fwxinfo.signature,
            encrypteddata: fwxinfo.encrypteddata,
            iv: fwxinfo.iv,
            openid: fwxinfo.openid || 0
        }],
        page: null,
        condition: null
    }
    httpJS.request('/openid', datalist, function (res) {
        return typeof callback == 'function' && callback({ code: res.data.code })
    });
}


/**
 * 解绑项管系统账户与已绑定微信号：
 * cwxopenid 微信openid；
 * code 返回的服务器结果；
 */
export let unboundUSERandWXID = function(cwxopenid,callback) {
    let datalist = {
        user: storageJS.getUser().account,
        action: "unbound",
        fields: [{
            "username": storageJS.getUser().account,
            "openid": cwxopenid
        }],
        page: null,
        condition: null
    }
    httpJS.request('/openid', datalist, function (res) {
        return typeof callback == 'function' && callback({ code: res.data.code })
    })
}


/**
 * 当前与微信绑定的平台帐号获取微信帐号详细信息：
 * bwxmnguser 返回的实体类数据；
 */
export let getUSERbindWXID = function (callback) {
    let bwxmnguser = {};
    let datalist = {
        user: storageJS.getUser().account,
        action: "get",
        fields: [
            "username",
            "nickname",
            "gender",
            "language",
            "city",
            "province",
            "country",
            "avatarurl",
            "signature",
            "encrypteddata",
            "iv",
        ],
        page: null,
        condition: [{
            "field": "username",
            "value": storageJS.getUser().account,
            "symbol": "="
        }]
    }
    httpJS.request('/openid', datalist, function (res) {
        if (JSON.parse(res.data).code > 0) {
            let resInfo = JSON.parse(res.data).datalist.dc_mng_user_wechat_info;
            if (null != resInfo) {
                bwxmnguser = resInfo[0];
            }
        }
        return typeof callback == 'function' && callback(bwxmnguser)
    });
}

/**
 * 项管系统账户已绑定微信号授权登录：
 * cwxopenid 微信openid；
 * bwxmnguser 返回的实体类数据；
 * fpwd 密码；
 * code 返回的服务器结果；
 */
export let wxopenidSignIn = function(cwxopenid,callback) {
    let datalist = {
        user: null,
        datetime: dateUtilJS.formatTime(),
        // IP: '',
        action: 'query',
        platform: sendingSystemJS._Agent().platform, //操作系统..
        browser: sendingSystemJS._Agent().brand + " " + sendingSystemJS._Agent().model + " " + sendingSystemJS._Agent().version, //浏览器...
        fields: {
            userAccount: null,
            userPassword: null,
            usermd5pswd: null,
            openid: cwxopenid
        },
        condition: null
    }
    httpJS.request('/mysaas/login', datalist, function (res) {
        if (res.data.code > 0) {
            storageJS.setProjectList(res.data.projectInfo);
            storageJS.setUser(res.data.userInfo);
        }
        return typeof callback == 'function' && callback({ code: res.data.code })
    })
}
