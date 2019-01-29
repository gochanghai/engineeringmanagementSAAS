const httpJS = require('../utils/http.js');
const storageJS = require('../utils/storage.js');

//新增管理人员
function addManage(manager = { projectID: null, managerName: null, telphoneNo: null, managerType: null }, callback) {
    let datalist = {
        user: storageJS.getUser().account,
        action: "add",
        form: "manager",
        fields: [{
            projectID: manager.projectID,
            managerAccount: manager.telphoneNo,
            managerName: manager.managerName,
            managerType: manager.managerType,
            telphoneNo: manager.telphoneNo,
        }],
        condition: null
    }
    httpJS.request('/form', datalist, function (res) {
        return typeof callback == 'function' && callback({ code: JSON.parse(res.data).code });
    });
}

module.exports = {
    addManage: addManage
}