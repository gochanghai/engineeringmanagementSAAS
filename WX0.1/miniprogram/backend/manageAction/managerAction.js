const httpJS = require('../net/http.js');
const storageJS = require('../../static/storage.js');

/**
 * 新增管理人员：
 * fmanager 实体类数据；
 * code 返回的服务器结果；
 *  */
function addManager(fmanager = { projectid: null, managerName: null, telphoneNo: null, managerType: null }, callback) {
    let datalist = {
        user: storageJS.getUser().account,
        addUser: {
            "projectid": fmanager.projectid,
            "managername": fmanager.managerName,
            "manmgertype": fmanager.managerType,//职位
            "telephone": fmanager.telphoneNo //电话号码就是账号，默认密码123456
        }
    }
    httpJS.request('/mysaas/project/addprojectmnguser/add/0', datalist, function (res) {
        return typeof callback == 'function' && callback(res.data.code);
    });
}

module.exports = {
    addManager: addManager
}