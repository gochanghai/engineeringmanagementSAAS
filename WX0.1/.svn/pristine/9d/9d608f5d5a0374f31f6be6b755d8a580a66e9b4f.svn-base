const httpJS = require('../utils/http.js');
const storageJS = require('../utils/storage.js');

function addWorker(worker = { projectID: null, groupId: null, name: null, age: null, repay: null, telNo: null, IDCard: null, admissionAt: null, emergencyContract: null, leavingAt: null, }, callback) {
    let datalist = {
        user: storageJS.getUser().account,
        form: "worker",
        action: "add",
        fields: [{
            projectID: worker.projectID,
            groupId: worker.groupId,
            name: worker.name,
            age: worker.age,
            repay: worker.repay,
            telNo: worker.telNo,
            IDCard: worker.IDCard,
            admissionAt: worker.admissionAt,
            emergencyContract: worker.emergencyContract,
            leavingAt: worker.leavingAt,
            discloseFileSign: false,
            educationFileSign: false,
            insuranceFileSign: false
        }],
        page: null,
        condition: null
    }
    httpJS.request('/form', datalist, function (res) {
        return typeof callback == 'function' && callback({ code: JSON.parse(res.data).code });
    });
};

//提交编辑人员的数据
function updateWorker(workerInfo = { formId: null, IDCard: null, admissionAt: null, age: null, emergencyContract: null, groupId: null, leavingAt: null, name: null, projectID: null, repay: null, telNo: null, }, callback) {
    let datalist = {
        user: storageJS.getUser().account,
        form: "worker",
        action: "updateList",
        fields: {
            IDCard: workerInfo.IDCard,
            admissionAt: workerInfo.admissionAt,
            age: workerInfo.age,
            emergencyContract: workerInfo.emergencyContract,
            groupId: workerInfo.groupId,
            leavingAt: workerInfo.leavingAt,
            name: workerInfo.name,
            projectID: workerInfo.projectID,
            repay: workerInfo.repay,
            telNo: workerInfo.telNo
        },
        page: null,
        condition: [{
            field: "formId",
            value: workerInfo.formId,
            symbol: "="
        }]
    }
    httpJS.request('/form', datalist, function (res) {
        return typeof callback == 'function' && callback({ code: JSON.parse(res.data).code });
    });
};

//获取班组List
function getTeamNameList(projectID, callback) {
    let fireGroup = [];
    let datalist = {
        user: storageJS.getUser().account,
        form: "project_group",
        action: "get",
        fields: [
            "formId",
            "groupName"
        ],
        page: null,
        condition: [{
            field: "projectID",
            value: projectID,
            symbol: "="
        }]
    };
    httpJS.request('/form', datalist, function (res) {
        if (JSON.parse(res.data).code > 0) {
            fireGroup = JSON.parse(res.data).datalist.project_group;
        }
        return typeof callback == 'function' && callback(fireGroup);
    });
};

module.exports = {
    addWorker: addWorker,
    updateWorker: updateWorker,
    getTeamNameList: getTeamNameList,
}