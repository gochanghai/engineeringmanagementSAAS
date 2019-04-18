const httpServer = require('./server/http.js');
const md5Util = require('./server/md5.js');
const sendingSystem = require('./server/sendingSystem.js');
const dateUtil = require('./server/date.js');
const username = localStorage.getItem("username");
/**
 * 用户登录接口
 * date: 2019-3-18 pm
 * auther: liuchanghai
 * verion: 0.10
 */ 
export let login = function (username, password, callback){
    // console.log("www: " + username + password + dateUtil.formatTime());
    let data = {
        user: null,
        datetime: dateUtil.formatTime(),
        action: 'query',
        platform: sendingSystem._Agent().platform, //操作系统..
        browser: sendingSystem._Agent().brand + " " + sendingSystem._Agent().model + " " + sendingSystem._Agent().version, //浏览器...
        fields: {
            userAccount: username,
            userPassword: password,
            usermd5pswd: md5Util.hexMD5(password),
        },
        condition: null
    };
    console.log(data);
    httpServer.request('yysecurity/login', data , res =>{
        console.log("www: " + username + password + dateUtil.formatTime());
        console.log(res.data);
        var result = {
            code: res.data.code,
            usertype:  res.data.datalist.worker.type,
        }
        if(1 === res.data.code){
            // 把用户信息存入session缓存
            console.log("把用户信息存入session缓存")
            localStorage.setItem("username", username);
            localStorage.setItem("nickname", res.data.datalist.user.nickname);
            localStorage.setItem("userId", res.data.datalist.userId);
            localStorage.setItem("groupid", res.data.datalist.worker.group_no);
            localStorage.setItem("usertype", res.data.datalist.worker.type);
            localStorage.setItem("areaid",res.data.datalist.company.area_id);
            if("政府" == res.data.datalist.worker.type){
                localStorage.setItem("groupid",1);
                if("admin" == username){
                    localStorage.setItem("areaid",0);
                    localStorage.setItem("role","admin");
                }else{
                    localStorage.setItem("areaid",res.data.datalist.company.area_id);
                    localStorage.setItem("role","manager");
                }

            }
        }
        return typeof callback == 'function' && callback(result);
    });        
}

/**
 * 用户登出接口
 */
export let logout = function (username, password){
    console.log("www: " + username + password);

    // 清空缓存
    
    return "ok"
}

/**
 * 修改密码接口
 */
export let changepassword = function (oldPassword, newPassword, callback){
    console.log("www: " + oldPassword + newPassword);    
    let data = {
        user: localStorage.getItem("username"),
        datetime: dateUtil.formatTime(),
        platform: sendingSystem._Agent().platform, //操作系统..
        browser: sendingSystem._Agent().brand + " " + sendingSystem._Agent().model + " " + sendingSystem._Agent().version, //浏览器...
        action: "modify",
        fields: {
            userName: localStorage.getItem("username"), //用户名
            userAccount: localStorage.getItem("username"),
            userPassword: md5Util.hexMD5(oldPassword), //用户旧密码
            newPassword: md5Util.hexMD5(newPassword) //用户新密码
        },
        condition: null
    };
    httpServer.request('user', data, res => {
        return typeof callback == 'function' && callback({ code: res.data.code })
    });
}

/**
 * 检查手机号码否存在
 */
export let checkOldPassword = function (oldPassword, callback){
    console.log("www: " + oldPassword);
    let data = {
        user: username,
        form: 'user',
        action: "get",
        fields: ["username","password"],
        condition: [{
            field: "username",            
            symbol: "=",
            value: username,
        }]
    };
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            code: res.data.code,
            message: "原始密码不正确"
        }
        if(1 === res.data.code && null != res.data.datalist.user){
            if(md5Util.hexMD5(oldPassword) === res.data.datalist.user[0].password){
                result.code = 2;
                result.message = "原始密码正确"
            }
            
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}


/**
 * 检查手机号码否存在
 */
export let getPhoneValiCode = function (phone, callback){
    let data = {
        user: null,
        action: "vcode",
        cellphone: phone,
    };
    console.log(data);
    httpServer.request('password', data, res => {
        console.log(res);
        return typeof callback == 'function' && callback(res.data.userID)
    })
}


/**
 * 检查手机号码否存在
 */
export let settingNewPassword = function (pdata, callback){
    let data = {
        user: pdata.username,
        sms_code: pdata.code,
        action: "reset",
        cellphone: pdata.phone,
        newPassword: md5Util.hexMD5(pdata.password),
    };
    console.log(data);
    httpServer.request('password', data, res => {
        console.log(res.data);
        let result = {
            code: res.data.code,
            message: "密码修改失败"
        }
        if(1 === res.data.code){
            result.message = "密码修改成功"          
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}


