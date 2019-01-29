const httpJS = require('../utils/http.js');
const storageJS = require('../utils/storage.js');


function getProjectList(callback) {
  var projectPageList = [];
  let projectList = storageJS.getProjectList();
  let ids = "";
  let projectIdArray = [];
  for (let item of projectList) {
    ids += item.projectID + ",";
    projectIdArray.push(item.projectID);
  }
  //去掉最后一个逗号(如果不需要去掉，就不用写)
  if (ids.length > 0) {
    ids = ids.substr(0, ids.length - 1);
  }
  let datalist = {
    user: storageJS.getUser().account,
    batchFun: "projectStatis",
    projectIdList: ids
  };
  httpJS.request('/sbatch', datalist, function(res) {
    console.log(JSON.parse(res.data));
    if (JSON.parse(res.data).code > 0) {
      for (var i = 0; i < projectIdArray.length; i++) {
        console.log("hello");
        let resPage = JSON.parse(res.data).datalist[projectIdArray[i]];
        let projectPage = {
          projectID: projectIdArray[i],
          ProjectAbbreviation: resPage.contract[0].projectAbbreviation,
          totalAmount: resPage.contract[0].contractAmountSum,
          status: resPage.contract[0].status,
          outputValue: resPage.confirmvalue[0].outputValueSum,
          actualReceivAmount: resPage.recievedpay[0].actualReceivAmountSum,
          receivableAmount: resPage.confirmvalue[0].receivableAmountSum -
            resPage.recievedpay[0].actualReceivAmountSum,
          managerPer: resPage.manager[0].managercount,
          group: resPage.project_group[0].groupcount,
          constructionPer: resPage.worker[0].workercount,
          sumUnDisclose: resPage.worker_undisclose[0].sumUnDisclose, // 2019/1/23
          sumUnEducation: resPage.worker_uneduction[0].sumUnEducation, // 2019/1/23
          sumUnInsurance: resPage.worker_uninsure[0].sumUnInsurance, // 2019/1/23
          outputValueTage: parseFloat((
            ((resPage.confirmvalue[0].outputValueSum /
                resPage.contract[0].contractAmountSum) *
              100) |
            0
          ).toFixed(2)), //总产值percent = 总产值/合同金额
          recievedPayTage: parseFloat((
            ((resPage.recievedpay[0].actualReceivAmountSum /
                resPage.contract[0].contractAmountSum) *
              100) |
            0
          ).toFixed(2)), //总回款pecent = 总回款/合同金额
          receivableAmountTage: parseFloat((
            (((resPage.confirmvalue[0].receivableAmountSum -
                  resPage.recievedpay[0].actualReceivAmountSum) /
                resPage.confirmvalue[0].receivableAmountSum) *
              100) |
            0
          ).toFixed(2)), //可收款percent = 已收款/总可收款
          allmessage: resPage.allmessage[0].allmessagecount, //总消息条数
          notdealmessage: resPage.notdealmessage[0].notdealcount, // 未处理消息条数
          dealmessage: resPage.allmessage[0].allmessagecount -
            resPage.notdealmessage[0].notdealcount, // 已处理(已处理+已忽略)消息条数
          lightSign: resPage.redlight[0].redcount > 0 ?
            1 : (resPage.redlight[0].redcount =
              0 && resPage.yewlight[0].yewcount > 0) ?
            2 : 0, // 警灯标志：0-绿，1-红，2-黄
        };
        projectPageList.push(projectPage);
        // countWorkerFileUnSign(projectIdArray[i], projectPage, function (res) {
        //     projectPageList.push(res);
        // })
      }
    }
    return typeof callback == 'function' && callback(projectPageList)
  });
};

function countWorkerFileUnSign(projectID, projectPage, callback) {
  let datalist = {
    user: storageJS.getUser().account,
    form: "worker",
    action: "get",
    fields: [
      "SUM(if(discloseFileSign = 'false',1,0)) as sumUnDisclose", //安全交底
      "SUM(if(educationFileSign = 'false',1,0)) as sumUnEducation", //安全教育
      "SUM(if(insuranceFileSign = 'false',1,0)) as sumUnInsurance" //保险
    ],
    page: null,
    condition: [{
      field: "projectID",
      symbol: "=",
      value: projectID
    }]
  };
  httpJS.request('/form', datalist, function(res) {
    let resWorkerData = JSON.parse(res.data).datalist.worker[0];
    projectPage.DiscloseData = resWorkerData.sum1;
    projectPage.EducationData = resWorkerData.sum2;
    projectPage.InsuranceData = resWorkerData.sum3;
    return typeof callback == 'function' && callback(projectPage)
  });
};

module.exports = {
  getProjectList: getProjectList,
}