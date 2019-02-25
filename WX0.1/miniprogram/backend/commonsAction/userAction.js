const httpJS = require('../net/http.js');
const storageJS = require('../../static/storage.js');
const md5JS = require('../../utils/md5.js');
const sendingSystemJS = require('../../utils/sendingSystem.js');
const dateUtilJS = require('../../utils/date.js');

/**
 * 用户登录并缓存项目列表与用户信息：
 * faccount 用户名；
 * fpwd 密码；
 * code 返回的服务器结果；
 */
function signIn(faccount = null, fpwd = null, callback) {
    let datalist = {
        user: null,
        datetime: dateUtilJS.formatTime(),
        // IP: '',
        action: 'query',
        platform: sendingSystemJS._Agent().platform, //操作系统..
        browser: sendingSystemJS._Agent().brand + " " + sendingSystemJS._Agent().model + " " + sendingSystemJS._Agent().version, //浏览器...
        fields: {
            userAccount: faccount,
            userPassword: fpwd,
            usermd5pswd: md5JS.hexMD5(fpwd),
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

function restoreProjectList(callback) {
    if (null != storageJS.getUser().account && 'undefined' != typeof (storageJS.getUser().account)) {
        let datalist = {
            user: storageJS.getUser().account
        }
        httpJS.request('/user/plist', datalist, function (res) {
            if (res.data.code > 0) {
                storageJS.setProjectList(res.data.datalist.manager);
                return typeof callback == 'function' && callback({ code: res.data.code, reason: "ProjectList Recaching Successfully", projectList: storageJS.getProjectList() })
            } else return typeof callback == 'function' && callback({ code: res.data.code })
        })
    }
    else return typeof callback == 'function' && callback({ code: -1, reason: "user's not logined!" })

};


/**
 * 登录账户修改密码：
 * oldPassword 旧密码；
 * newPassword 新密码；
 * code 返回的服务器结果；
 */
function modifyPWD(oldPassword = null, newPassword = null, callback) {
    let datalist = {
        user: storageJS.getUser().account,
        datetime: dateUtilJS.formatTime(),
        // IP: '',
        platform: sendingSystemJS._Agent().platform, //操作系统..
        browser: sendingSystemJS._Agent().brand + " " + sendingSystemJS._Agent().model + " " + sendingSystemJS._Agent().version, //浏览器...
        action: "modify",
        fields: {
            userName: storageJS.getUser().userName, //用户名
            userAccount: storageJS.getUser().account,
            userPassword: md5JS.hexMD5(oldPassword), //用户旧密码
            newPassword: md5JS.hexMD5(newPassword) //用户新密码
        },
        condition: null
    };
    httpJS.request('/user', datalist, function (res) {
        return typeof callback == 'function' && callback({ code: res.data.code })
    });
}

module.exports = {
    signIn: signIn,
    modifyPWD: modifyPWD,
    restoreProjectList: restoreProjectList,
}