const httpJS = require('../utils/http.js');
const storageJS = require('../utils/storage.js');
const md5JS = require('../utils/md5.js');
const sendingSystemJS = require('../utils/sendingSystem.js');
const dateJS = require('../utils/date.js');


//用户登录
function signIn(account = null, pwd = null, callback) {
    let datalist = {
        // IP: '',
        action: 'query',
        platform: sendingSystemJS._Agent().platform, //操作系统..
        browser: sendingSystemJS._Agent().brand + " " + sendingSystemJS._Agent().model + " " + sendingSystemJS._Agent().version, //浏览器...
        fields: {
            userAccount: account,
            userPassword: pwd,
            usermd5pswd: md5JS.hexMD5(pwd),
        }
    }
    httpJS.request('/user/login', datalist, function (res) {
        let code;
        if (res.data.code > 0) {
            storageJS.setProjectList(res.data.datalist.manager);
            storageJS.setUser(account, res.data.userName);
            code = 1;
        } else {
            code = -1;
        }
        return typeof callback == 'function' && callback({ code: code })
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
            }else return typeof callback == 'function' && callback({ code: res.data.code })
        })
    }
    else return typeof callback == 'function' && callback({ code: -1, reason: "user's not logined!" })

};


// 修改密码
function modifyPWD(oldPassword = null, newPassword = null, callback) {
    let datalist = {
        user: storageJS.getUser().account,
        datetime: dateJS.formatTime(),
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