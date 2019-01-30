// miniprogram/testpages/test/test.js
const httpJS = require('../../utils/http.js');
const messageCenterJS = require('../../action/messageCenter.js');
const projectlistJS = require('../../action/projectlist.js');
const statisticalJS = require('../../action/statistical.js');
const personnelJS = require('../../action/personnel.js');
const calendarJS = require('../../action/calendar.js');
const fileJS = require('../../action/file.js');
const progressJS = require('../../action/progress.js');
const managerJS = require('../../action/manager.js');
const workerJS = require('../../action/worker.js');
const fireGroupJS = require('../../action/fireGroup.js');
const contractJS = require('../../action/contract.js');
const projectNodeJS = require('../../action/projectNode.js');
const declaretimeJS = require('../../action/declaretime.js');
const confirmvalueJS = require('../../action/confirmvalue.js');
const recievedPayJS = require('../../action/recievedpay.js');
const userJS = require('../../action/user.js');
const addtaskJS = require('../../action/addtask.js');
const fileWorkerJS = require('../../action/file_worker.js');
const fileProgressJS = require('../../action/file_progress.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数==监听页面加载
   */
  onLoad: function (options) {
    // ==============================messageCenter消息中心===============================
    // 所有项目风险消息-2019/1/21
    // messageCenterJS.mountedRiskMessage(function (res){
    //   var riskmessage = res;
    //   console.log("riskmessage");
    //   console.log(riskmessage);
    // });
    // 所有项目任务消息-2019/1/21
    // messageCenterJS.mountedTaskMessage(function (res){
    //   var taskmessage = res;
    //   console.log("taskmessage");
    //   console.log(taskmessage);
    // });
    // 所有项目的所有消息-2019/1/29
    // messageCenterJS.mountedAllMessage(function(res){
    //   console.log(res);
    // })
    // 消息忽略-2019/1/22-2019/1/25-2019/1/30
    // let message = { };
    // messageCenterJS.mesIgnore(message,function(res){
    //   console.log(res);
    // })
    // 获取消息总条数-2019/1/29
    // messageCenterJS.countMessageNo(function(countTotal){
    //   console.log(countTotal);
    // })
    // ==============================messageCenter消息中心===============================


    // ================================projectlist项目列表页===============================
    // 获取项目列表及详细数据-2019/1/21-2019/1/23-2019/1/25
    // projectlistJS.getProjectList(function(res){
    //   var projectPageList = res;
    //   console.log("projectPageList");
    //   console.log(projectPageList);
    // })
    // ================================projectlist项目列表页===============================

    // ===================================statistical首页================================
    // 获取风险消息-2019/1/21
    // statisticalJS.getRiskMessage(function (res) {
    //   var riskMessageList = res;
    //   console.log("riskMessageList");
    //   console.log(riskMessageList);
    // });
    // 获取任务消息-2019/1/21
    // statisticalJS.getTaskMessage(function (res) {
    //   var taskMessageList = res;
    //   console.log("taskMessageList");
    //   console.log(taskMessageList);
    // });
    // 合计信息-2019/1/21
    // statisticalJS.sumProjectMoney(function(res){
    //   var sumgroup = res;
    //   console.log("sumgroup");
    //   console.log(sumgroup);
    // })
    // 产值饼图-2019/1/21
    // statisticalJS.getGraphOutputValue(function(res){
    //   var graphOutputValue = res;
    //     console.log("graphOutputValue");
    //     console.log(graphOutputValue);
    // })
    // 人员饼图-2019/1/21
    // statisticalJS.getGraphSecurity(function (res) {
    //   var graphSecurity = res;
    //   console.log("graphSecurity");
    //   console.log(graphSecurity);
    // })
    // ===================================statistical首页=================================

    // ==================================personnel项目人员页===============================
    // 获取施工人员列表-2019/1/21
    // personnelJS.getConstructionList('SHXF-201810102',function(res){
    //   var construction = res;
    //   console.log(construction);
    //   console.log("construction");
    // })
    // 获取班组人员列表-2019/1/21
    // personnelJS.getGroupList('SHXF-201810102',function(res){
    //   var groupList = res;
    //   console.log(groupList);
    //   console.log("groupList");
    // })
    // 获取管理人员列表数据-2019/1/21
    // personnelJS.getManagerList('SHXF-201810102',function(res){
    //   var managerlist = res;
    //   console.log(managerlist);
    //   console.log("managerlist");
    // })
    // =================================personnel项目人员页================================

    // =================================fileJS文件操作=====================================
    // 文件上传-2019/1/21
    // wx.chooseImage({
    //   count: 1, //只允许上传一张图片
    //   success(res) {
    //     console.log(res);
    //     let tempFilePaths = res.tempFilePaths;
    //     let fileInfo = {
    //       projectID = 'SHXF-201810102',
    //       belongIdList = '1',
    //       file = tempFilePaths[0],
    //       fileName = '文件.jpg',
    //       fileBelong = '确认产值',
    //       formName = 'confirmvalue'
    //     }
    //     fileJS.fileUpload(fileInfo, function (res) {
    //       console.log(res);
    //     })
    //   }
    // })
    // 获取文件数据并缓存-2019/1/21
    // let fileInfo = {
    //   formName: 'confirmvalue',
    //   formobjId: '37',
    //   fileId: '81',
    //   fileName: 'wxe1b5f774eaa1913c.o6zAJs2BSxyXus59ulSeA-rlHAe4.yL1IApkDAO74e5df9ad27a8438e876b094061791b68e.jpg'
    // }
    // fileJS.fileGetPath(fileInfo, function (res) {
    //   const downloadTask = wx.downloadFile({
    //     url: res.fileURL,
    //     success(res) {
    //       // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
    //       console.log(res);
    //       if (res.statusCode === 200) {
    //         // .....................................preview文件预览.................................     
    //         // 预览-2019/1/22
    //         let previewFileInfo = {
    //           fileName: 'wxe1b5f774eaa1913c.o6zAJs2BSxyXus59ulSeA-rlHAe4.yL1IApkDAO74e5df9ad27a8438e876b094061791b68e.jpg',
    //           filePath: res.tempFilePath,
    //           fileType: "jpg",
    //         }
    //         fileJS.previewFile(previewFileInfo)
    //         // .....................................preview文件预览.................................     
    //       }
    //     },
    //     fail(res) { }
    //   })
    //   downloadTask.onProgressUpdate((res) => {
    //     console.log('下载进度', res.progress)
    //     console.log('已经下载的数据长度', res.totalBytesWritten)
    //     console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
    //   })
    // })
    // 分类获取文件列表-2019/1/21-2019/1/28
    // let fileInfo = {
    //   projectID: '',
    //   formName: '',
    //   belongIdList: '',
    //   fileBelong: '',
    // }
    // fileJS.getFileList(fileInfo, function (res) {
    //   console.log(res);
    // })
    // ..................................file文件页........................................
    // 统计多项目6大文件类型条数-2019/1/22
    // fileJS.countFileListSortType(function(res){
    //   console.log(res);
    // })
    // 统计多项目时间类型的文件条数-2019/1/22
    // fileJS.countFileListSortTime(function(res){
    //   console.log(res)
    // })
    // 根据文件类型返回多项目的文件列表-2019/1/22
    // fileJS.getFileListByType('安全交底',function(res){
    //   console.log(res);
    // });
    // 根据年=月返回多项目的文件列表-2019/1/22    
    // fileJS.getFileListByTime('2019-01',function(res){
    //   console.log(res);
    // })
    // ..................................file文件页........................................
    // =================================fileJS文件操作=====================================

    // =================================calendar万年历=====================================
    // 统计按日多项目的消息数据-2019/1/21
    // calendarJS.countCelendarMessage(function(res){
    //   console.log(res);
    // })
    // 按日返回消息列表-2019/1/23
    // calendarJS.getMessageByDate('2019-01-19',function(res){
    //   console.log(res);
    // })
    // =================================calendar万年历=====================================

    // ==================================progress进度页====================================
    // 产值列表-2019/1/21-2019/1/29
    // progressJS.getConfirmValueList('SHXF-201810102', function (res) {
    //   console.log(res);
    // })
    // 产值单条-2019/1/21
    // progressJS.getConfirmValuePage('1',function(res){
    //   console.log(res);
    // })
    // 回款列表-2019/1/21-2019/1/29
    // progressJS.getRecievedPayList('SHXF-201810102', function (res) {
    //   console.log(res);
    // })
    // 回款单条-2019/1/21
    // progressJS.getRecievedPayPage('1',function(res){
    //   console.log(res);
    // })
    // 更新单条产值-2019/1/21-已失效
    // let confirmvalueRow = {}
    // progressJS.updateConfirmValue(confirmvalueRow, function (res) {
    //   console.log(res)
    // })
    // 更新单条回款-2019/1/21-已失效
    // let recievedPay = { }
    // progressJS.updateRecievedPay(recievedPay,function(res){
    //   console.log(res);
    // })
    // ==================================progress进度页====================================

    // ==================================managerJS管理人员=================================
    // 新增管理人员-2019/1/21
    // let manager = {};
    // managerJS.addManage(manager,function(res){
    //   console.log(res);
    // })
    // ==================================managerJS管理人员=================================

    // ==================================worker劳务施工人员================================
    // 新增劳务施工人员-2019/1/21
    // let worker = {};
    // workerJS.addWorker(worker,function(res){
    //   console.log(res);
    // })
    // 更新劳务施工人员-2019/1/23
    // let workerInfo = {};
    // workerJS.updateWorker(workerInfo,function(res){
    //   console.log(res);
    // })
    // 获取班组下拉列表-2019/1/23
    // workerJS.getTeamNameList('SHXF-201810102',function(res){
    //   console.log(res);
    // })
    // ==================================worker劳务施工人员================================

    // ===================================fireGroup消防班组================================
    // 消防班组列表-2019/1/21
    // fireGroupJS.getGroupList('SHXF-201810102',function(res){
    //   console.log(res)
    // })
    // 新增班组-2019/1/21
    // let fireGroup = {};
    // fireGroupJS.addFireGroup(fireGroup,function(res){
    //   console.log(res);
    // })
    // ===================================fireGroup消防班组================================

    // =================================project单个项目操作=================================
    // ..............................projectSetting项目信息修改页...........................
    // 获取项目合同信息-2019/1/22
    // contractJS.getContractInfo('SHXF-201810102',function(res){
    //   console.log(res);
    // })
    // 更新项目合同信息-2019/1/22
    // let contractInfo = {}
    // contractJS.updateContract(contractInfo,function(res){
    //   console.log(res)
    // })
    // ..............................projectSetting项目信息修改页...........................
    // .................................addproject新建项目页................................
    // 新建项目-2019/1/23
    // let managerList = [{},{}],contractInfo = {};
    // contractJS.addContract(managerList,contractInfo,function(res){
    //   console.log(res);
    // });
    // .................................addproject新建项目页................................
    // =================================project单个项目操作=================================

    // =============================projectnode项目进度节点页===============================
    // 获取项目进度节点-2019/1/23
    // projectNodeJS.getProjectNodeList('SHXF-201810102',function(res){
    //   console.log(res);
    // })
    // 提交项目进度节点-2019/1/23
    // let nodeList = [{},{}]
    // projectNodeJS.postProjectNode('SHXF-201810102',nodeList,function(res){
    //   console.log(res)
    // })
    // =============================projectnode项目进度节点页===============================

    // ===========================declaretime项目申报时间节点页=============================
    // // 获取合同信息-2019/1/23
    // declaretimeJS.getContractInfo('SHXF-201810102', function (res) {
    //   console.log(res);
    // });
    // // 获取项目申报时间列表-2019/1/23
    // declaretimeJS.getDeclaretimeList('SHXF-201810102', function (res) {
    //   console.log(res);
    // });
    //提交申报时间列表变化-2019/1/23
    // let dateList = [{},{}];
    // declaretimeJS.postDeclaretiemList('SHXF-201810102',dateList,function(res){
    //   console.log(res);
    // })
    // ===========================declaretime项目申报时间节点页=============================

    // ===============================confirmvalue产值登记页===============================
    // 获取产值信息-2019/1/23
    // confirmvalueJS.getConfirmvalue('1', function (res) {
    //   console.log(res);
    // });
    // 更新产值登记-2019/1/23
    // let confirmvalue = {}
    // confirmvalueJS.updateConfirmvalue(confirmvalue,function(res){
    //   console.log(res)
    // });
    // 打包提交附件与产值信息-2019/1/29
    // let confirmvalueInfo = {}, fileInfo = {};
    // fileProgressJS.comitFileANDConfirmValue(confirmvalueInfo, fileInfo, function (res) {
    //   console.log(res);
    // })
    // ===============================confirmvalue产值登记页===============================

    // ================================recievedpay回款登记页===============================
    // 获取回款信息-2019/1/24
    // recievedPayJS.getRecievedpay('1',function(res){
    //   console.log(res);
    // })
    // 更新回款登记-2019/1/24
    // let recievedpay = {};
    // recievedPayJS.updateRecievedpay(recievedpay,function(res){
    //   console.log(res);
    // })
    // 打包提交附件与回款信息-2019/1/29
    // let recievedpayInfo = {}, fileInfo = {};
    // fileProgressJS.comitFileANDRecievedpay(recievedpayInfo, fileInfo, function (res) {
    //   console.log(res);
    // })
    // ================================recievedpay回款登记页===============================

    // =====================================user用户操作===================================
    // 用户登录缓存项目列表与用户信息-2019/1/25
    // userJS.signIn('shangwjl','123456',function(res){
    //   console.log(res)
    // })
    // 修改密码-2019/1/25
    // userJS.modifyPWD('','',function(res){
    //   console.log(res)
    // })
    // 根据登录用户重新缓存项目列表-2019/1/30
    // userJS.restoreProjectList(function(res){
    //   console.log(res)
    // })
    // =====================================user用户操作===================================

    // ===================================addtask新建任务页================================
    // 获取项目下拉列表-2019/1/25
    // addtaskJS.getProjectNameList(function(res){
    //   console.log(res)
    // })
    // 提交任务-2019/1/25
    // let taskInfo = {};
    // addtaskJS.postTask(taskInfo,function(res){
    //   console.log(res);
    // })
    // 获取项目管理人员-2019/1/25
    // addtaskJS.getAssignUser('SHXF-201810102',function(res){
    //   console.log(res);
    // })
    // ===================================addtask新建任务页================================

    // ================================教育、交底、保险上传附件=============================
    // 获取未上传附件劳务人员列表-2019/1/28
    // let fileSign = "insurance";// "disclose"||"education"||"insurance"
    // fileWorkerJS.getUnSignWorkerList('SHXF-201810102',fileSign,function(res){
    //   console.log(res);
    // });
    // 提交附件并更新劳务人员文件标志-2019/1/28
    // let packageData = [];
    // fileWorkerJS.packageComitFileANDWorkerSignList(packageData, function (res) {
    //   console.log(res);
    // })
    // ================================教育、交底、保险上传附件=============================


    // 接口产生或修改时间列表
    // 已失效
    // 2019/1/21
    // 2019/1/22
    // 2019/1/23
    // 2019/1/24
    // 2019/1/25
    // 2019/1/28
    // 2019/1/29
    // 2019/1/30
  },

})