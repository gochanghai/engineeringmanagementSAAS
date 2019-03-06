// miniprogram/testpages/test/test.js
const userAction = require('../../backend/commonsAction/userAction.js');
const userWechatAction = require('../../backend/commonsAction/user_wechatAction.js');

const messageCenterAction = require('../../backend/manageAction/messageCenterAction.js');
const personnelAction = require('../../backend/manageAction/personnelAction.js');
const calendarAction = require('../../backend/manageAction/calendarAction.js');
const fileAction = require('../../backend/manageAction/fileAction.js');
const managerAction = require('../../backend/manageAction/managerAction.js');
const workerAction = require('../../backend/manageAction/workerAction.js');
const fireGroupAction = require('../../backend/manageAction/fireGroupAction.js');
const projectManageAction = require('../../backend/manageAction/projectManageAction.js');
const projectNodeAction = require('../../backend/manageAction/projectNodeAction.js');
const declaretimeAction = require('../../backend/manageAction/declaretimeAction.js');
const confirmvalueAction = require('../../backend/manageAction/confirmvalueAction.js');
const addtaskAction = require('../../backend/manageAction/addtaskAction.js');
const fileWorkerAction = require('../../backend/manageAction/file_workerAction.js');
const fileConfirmvalueAction = require('../../backend/manageAction/file_confirmvalueAction.js');
const statisticalAction = require('../../backend/manageAction/statisticalAction.js');

const workerSaaSAction = require('../../backend/saasAction/workerAction.js');
const receivepaylinesSaaSAction = require('../../backend/saasAction/receivepaylinesAction.js');
const projectlistSaaSAction = require('../../backend/saasAction/projectlistAction.js');
const statisticalSaaSAction = require('../../backend/saasAction/statisticalAction.js');
const projectSaaSAction = require('../../backend/saasAction/projectAction.js');
const certificationSaaSAction = require('../../backend/saasAction/certificationAction.js');

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
    // 所有项目的所有消息-2019/2/14
    // messageCenterAction.mountedAllMessage(function(bmessageList){
    //   console.log(bmessageList);
    // })
    // 获取单条消息详情-2019/2/19
    // messageCenterAction.getMessagePage('15e183f0-f2ac-4a35-bfa1-aec84a2e7fb0',"8",function(bmessageInfo){
    //   console.log(bmessageInfo);
    // })
    // 消息忽略-2019/2/14
    // messageCenterAction.mesIgnore('','','',function(res){
    //   console.log(res.code);
    // })
    // 消息/任务置为已处理-2019/3/5
    // messageCenterAction.mesSolve('','','',function(res){
    //   console.log(res.code);
    // })
    // 获取消息总条数-2019/2/14
    // messageCenterAction.countMessageNo(function(bcountNo){
    //   console.log(bcountNo);
    // })
    // ==============================messageCenter消息中心===============================

    // ==================================personnel项目人员页===============================
    // 获取施工人员列表-2019/2/14
    // personnelAction.getConstructionList('5',function(bconstructionList){
    //   console.log(bconstructionList);
    // })
    // 获取班组人员列表-2019/2/14
    // personnelAction.getGroupList('5', function (bgroupList) {
    //   console.log(bgroupList);
    // })
    // 获取管理人员列表数据-2019/2/14
    // personnelAction.getManagerList('5',function(bmanagerList){
    //   console.log(bmanagerList);
    // })
    // =================================personnel项目人员页================================

    // =================================fileAction文件操作=====================================
    // 文件上传-2019/2/14
    // wx.chooseImage({
    //   count: 1, //只允许上传一张图片
    //   success(res) {
    //     console.log(res.code);
    //     let tempFilePaths = res.tempFilePaths;
    //     let fileInfo = {
    //       projectID = '5',
    //       belongIdList = '1',
    //       file = tempFilePaths[0],
    //       fileName = '文件.jpg',
    //       fileBelong = '确认产值',
    //       formName = 'confirmvalue'
    //     }
    //     fileAction.fileUpload(fileInfo, function (res) {
    //       console.log(res.code);
    //     })
    //   }
    // })
    // 获取文件数据并缓存-2019/2/14
    // let fileInfo = {
    //   formName: 'confirmvalue',
    //   formobjId: '37',
    //   fileId: '81',
    //   fileName: 'wxe1b5f774eaa1913c.o6zAJs2BSxyXus59ulSeA-rlHAe4.yL1IApkDAO74e5df9ad27a8438e876b094061791b68e.jpg'
    // }
    // fileAction.fileGetPath(fileInfo, function (res) {
    //   const downloadTask = wx.downloadFile({
    //     url: res.fileURL,
    //     success(res) {
    //       // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
    //       console.log(res.code);
    //       if (res.statusCode === 200) {
    //         // .....................................preview文件预览.................................     
    //         // 预览-2019/2/14
    //         let previewFileInfo = {
    //           fileName: 'wxe1b5f774eaa1913c.o6zAJs2BSxyXus59ulSeA-rlHAe4.yL1IApkDAO74e5df9ad27a8438e876b094061791b68e.jpg',
    //           filePath: res.tempFilePath,
    //           fileType: "jpg",
    //         }
    //         fileAction.previewFile(previewFileInfo)
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
    // 分类获取文件列表-2019/2/14-2019/2/26
    // let fileInfo = {
    //   projectid: '5',
    //   formname: 'confirmvalue',
    //   belongidlist: '4',
    //   filebelong: '确认产值',
    // }
    // fileAction.getFileList(fileInfo, function (bfileList) {
    //   console.log(bfileList);
    // })
    // ..................................file文件页........................................
    // 统计多项目6大文件类型条数
    // fileAction.countFileListSortType(function(res){
    //   console.log(res.code);
    // })
    // 统计多项目时间类型的文件条数
    // fileAction.countFileListSortTime(function(res){
    //   console.log(res)
    // })
    // 根据文件类型返回多项目的文件列表
    // fileAction.getFileListByType('安全交底',function(res){
    //   console.log(res.code);
    // });
    // 根据年=月返回多项目的文件列表    
    // fileAction.getFileListByTime('2019-01',function(res){
    //   console.log(res.code);
    // })
    // ..................................file文件页........................................
    // =================================fileAction文件操作=====================================

    // =================================calendar万年历=====================================
    // 统计按日多项目的消息数据-2019/2/14
    // calendarAction.countCelendarMessage(function(bcalendarData){
    //   console.log(bcalendarData);
    // })
    // 按日返回消息列表-2019/2/14
    // calendarAction.getMessageByDate('2019-02-26',function(bmessageSortList){
    //   console.log(bmessageSortList);
    // })
    // =================================calendar万年历=====================================

    // ==================================managerJS管理人员=================================
    // 新增管理人员-2019/2/18
    // let fmanager = {};
    // managerAction.addManager(fmanager,function(res){
    //   console.log(res.code);
    // })
    // ==================================managerJS管理人员=================================

    // ==================================worker劳务施工人员================================
    // 新增劳务施工人员-2019/2/14
    // let fworker = {};
    // workerAction.addWorker(fworker,function(res){
    //   console.log(res.code);
    // })
    // 更新劳务施工人员-2019/2/14
    // let workerInfo = {}, cformid = '';
    // workerAction.updateWorker(workerInfo, cformid, function (res) {
    //   console.log(res.code);
    // })
    // 获取班组下拉列表-2019/2/14
    // workerAction.getTeamNameList('5',function(bfireGroup){
    //   console.log(bfireGroup);
    // })
    // 获取单条劳务人员信息-2019/2/21
    // workerAction.getWorkerPage('5','92050814-035e-46d1-b3d2-3d043663ca2b',function(bworkerInfo){
    //   console.log(bworkerInfo);
    // })
    // 获取多条劳务人员信息-2019/2/21
    // workerAction.getWorkerList('5','92050814-035e-46d1-b3d2-3d043663ca2b,25758845-6347-4731-a2da-fc5fc148979a',function(bworkerList){
    //   console.log(bworkerList);
    // })
    // 获取三类文件已提交标志劳务人员-2019/2/22
    // workerAction.getSignedWorkerList('5', 'disclose', function (bWorkerList) {
    //   console.log(bWorkerList);
    // })
    // ==================================worker劳务施工人员================================

    // ===================================fireGroup消防班组================================
    // 获取消防班组列表-2019/2/18
    // fireGroupAction.getGroupList('5',function(bgroupList){
    //   console.log(bgroupList)
    // })
    // 新增班组时获取基础班组列表-2019/2/18
    // fireGroupAction.getBaseGroupList(function(bbasegroupList){
    //   console.log(bbasegroupList)
    // })
    // 新增班组-2019/2/18-2019/2/20
    // let ffireGroup = {};
    // fireGroupAction.addFireGroup(ffireGroup,function(res){
    //   console.log(res.code);
    // })
    // ===================================fireGroup消防班组================================

    // =================================project单个项目操作=================================
    // ..............................projectSetting项目设置页...........................
    // 获取项目管理设置信息-2019/2/14
    // projectManageAction.getManageInfo('1',function(bmangageInfo){
    //   console.log(bmangageInfo);
    // })
    // 更新项目管理设置信息-2019/2/14
    // let contractInfo = {
    //   projectabbreviation: "q201811",
    //   ownerapprovaltime: 8,
    //   ownerpaypercent: 0.8,
    //   ownerpaytime: 10,
    // }, cprojectid = '1';
    // projectManageAction.updateManageInfo(contractInfo, cprojectid, function (res) {
    //   console.log(res)
    // })
    // ..............................projectSetting项目信息修改页...........................
    // =================================project单个项目操作=================================

    // =============================projectnode项目进度节点页===============================
    // 获取项目进度节点-2019/2/19
    // projectNodeAction.getProjectNodeList('5',function(bNodeList){
    //   console.log(bNodeList);
    // })
    // 提交项目进度节点-2019/2/19-已失效
    // let fnodeList = [{}, {}]
    // projectNodeAction.postProjectNode('5', fnodeList, function (res) {
    //   console.log(res)
    // })
    // 提交项目进度结点设置-2019/3/1
    // let nodeList = [{}]
    // projectNodeAction.postProjectNode_2(nodeList,function(res){
    //   console.log(res.code);
    // })
    // =============================projectnode项目进度节点页===============================

    // ===========================declaretime项目申报时间节点页=============================
    // // 获取项目的合同启止与申报类型,节点个数-2019/2/14-2019/2/28
    // declaretimeAction.getDeclaretimeBaseInfo('5', function (bdeclaretimeBaseInfo) {
    //   console.log(bdeclaretimeBaseInfo);
    // });
    // // 获取项目申报时间列表-2019/2/14
    // declaretimeAction.getDeclaretimeList('5', function (bdeclaretimeList) {
    //   console.log(bdeclaretimeList);
    // });
    //提交申报时间列表变化-2019/2/14
    // let dateList = [{},{}];
    // declaretimeAction.postDeclaretiemList(dateList,function(res){
    //   console.log(res.code);
    // })
    // 申报节点个数为0的时候更新申报日并新建申报时间列表-2019/2/28
    // let fconfirmdate, fdateList = [{}], cprojectid = '';
    // declaretimeAction.bornDeclaretiemList(fconfirmdate, fdateList, cprojectid, function (res) {
    //   console.log(res.code)
    // })
    // ===========================declaretime项目申报时间节点页=============================

    // ===============================confirmvalue产值登记===============================
    // 获取单项目多条产值信息-2019/2/14-2019/2/25-2019/2/28
    // confirmvalueAction.getConfirmvalueList('5', function (bconfirmvalueList) {
    //   console.log(bconfirmvalueList);
    // });
    // 删除单条产值信息-2019/2/14
    // confirmvalueAction.deleteConfirmvalue('4d9c1134-2f44-4104-9642-229949975c6e','5', function (res) {
    //   console.log(res.code);
    // });
    // 获取单条产值信息-2019/2/14-2019/2/25-2019/2/28
    // confirmvalueAction.getConfirmvalue('a301fec0-3956-4f83-a89a-339a8bfeeb61','5', function (bconfirmvalue) {
    //   console.log(bconfirmvalue);
    // });
    // 新增产值登记-2019/2/14
    // let fconfirmvalue = {
    //   confirmat: new Date(),
    //   outputvalue: '143232',
    //   receivableamount: '231231',
    //   valueuploadat: new Date(),
    //   projectid: '5'
    // }
    // confirmvalueAction.addConfirmvalue(fconfirmvalue, function (res) {
    //   console.log(res)
    // });
    // 更新产值登记-2019/2/14
    // let fconfirmvalue = {
    //   confirmat: new Date(),
    //   outputvalue: '00000',
    //   receivableamount: '00000',
    //   valueuploadat: new Date(),
    // }, cformid = '4d9c1134-2f44-4104-9642-229949975c6e', cprojectID = '5';
    // confirmvalueAction.updateConfirmvalue(fconfirmvalue, cformid, cprojectID, function (res) {
    //   console.log(res)
    // });
    // 获取单项目的未申报时间节点列表-2019/2/28
    // confirmvalueAction.getUnConfirmNode('5', function (bnodeList) {
    //   console.log(bnodeList)
    // })
    // 打包提交附件与产值信息-2019/2/19
    // let fconfirmvalueInfo = {}, ffileInfo = {} , cconfirmvalueformid = '', cprojectid = '';
    // fileConfirmvalueAction.comitFileANDConfirmValue(fconfirmvalueInfo, ffileInfo, cconfirmvalueformid, cprojectid, function (res) {
    //   console.log(res.code);
    // })
    // 打包提交附件、新建产值信息-2019/2/26-2019/2/28
    // fileConfirmvalueAction.addFileANDConfirmValue(fconfirmvalueInfo, ffileInfo,function(res){
    //   console.log(res.code);
    // })
    // ===============================confirmvalue产值登记页===============================

    // ===================================addtask新建任务页================================
    // 从缓存中获取项目下拉列表-2019/2/14
    // addtaskAction.getProjectNameList(function(bprojectNameList){
    //   console.log(bprojectNameList)
    // })
    // 提交任务-2019/2/14
    // let ftaskInfo = {};
    // addtaskAction.postTask(ftaskInfo,function(res){
    //   console.log(res.code);
    // })
    // 获取项目管理人员-2019/2/14-2019/2/20
    // addtaskAction.getAssignUser('5',function(bassignUser){
    //   console.log(bassignUser);
    // })
    // addtaskTestAction.getAssignUser('5', function (bassignUser) {
    //   console.log(bassignUser);
    // })
    // ===================================addtask新建任务页================================

    // ================================教育、交底、保险上传附件=============================
    // 获取未上传附件劳务人员列表-2019/2/19-2019/2/20
    // let fileSign = "insurance"; // "disclose"||"education"||"insurance"
    // fileWorkerAction.getUnSignWorkerList('5', "insurance", function (bWorkerList) {
    //   console.log(bWorkerList);
    // });
    // 提交附件并更新劳务人员文件标志-2019/2/19
    // let packageData = [];
    // fileWorkerAction.packageComitFileANDWorkerSignList(packageData, function (res) {
    //   console.log(res.code);
    // })
    // ================================教育、交底、保险上传附件=============================

    // ===================================statistical首页================================
    // 产值曲线图-2019/2/18
    // statisticalAction.getGraphOutputValue(function(bgraphOutputValueData){
    //     console.log(bgraphOutputValueData);
    // })
    // 人员饼图-2019/2/18
    // statisticalAction.getGraphSecurity(function (bgraphSecurityData) {
    //   console.log(bgraphSecurityData);
    // })
    // ===================================statistical首页=================================



    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SaaS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // 获取单个项目的施工班组统计数据-2019/2/14-确认后使用
    // workerSaaSAction.getWorkerstatis('5', function (bstatisdata) {
    //   console.log(bstatisdata);
    // })

    // ================================projectlist项目列表页===============================
    // 获取项目列表及详细数据-2019/2/15
    // projectlistSaaSAction.getProjectList(function(bprojectList){
    //   console.log(bprojectList);
    // })
    // ================================projectlist项目列表页===============================

    // ================================projectInfo项目详情页===============================
    // 获取项目详情-2019/2/18
    // projectSaaSAction.getProjectInfo('8',function(bprojectInfo){
    //   let projectInfo = bprojectInfo;
    // })
    // 获取项目详情的其他模块数据-2019/2/20
    // projectSaaSAction.getModuleInfo('5', function (bmoduleinfo) {
    //   console.log(bmoduleinfo);
    // })
    // ================================projectInfo项目详情页===============================

    // ===============================recievedpaylines回款流水页===========================
    // 获取单项目的回款流水线列表-2019/2/15
    // receivepaylinesSaaSAction.getLinesList('5', function (blinesList) {
    //   console.log(blinesList);
    // })
    // 获取单项目的单条回款流水线记录-2019/2/15
    // receivepaylinesSaaSAction.getLinesLPage('5','',function(res){
    //   console.log(res.code);
    // })
    // ===============================recievedpaylines回款流水页===========================
    // ===================================statistical首页================================
    // 获取所有项目的统计数据——合同金额、产值、回款：-2019/2/18
    // statisticalSaaSAction.getPStatis(function (bstatis) {
    //   console.log(bstatis);
    // })
    // 获取所有项目的绘图进度数据——未完成产值、累计回款、可回款：-2019/2/18
    // statisticalSaaSAction.getGraphProgressData(function (bprogressData) {
    //   console.log(bprogressData);
    // })
    // ===================================statistical首页=================================
    // ===============================certification认证信息页==============================
    // 获取认证信息-2019/2/18
    // certificationSaaSAction.getSertification(function(bsertification){
    //   console.log(bsertification)
    // })
    // ===============================certification认证信息页==============================
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SaaS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~commons~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
    // =====================================user用户操作===================================
    // 用户登录并缓存项目列表与用户信息-2019/2/15
    // userAction.signIn('test001','123456',function(res){
    //   console.log(res)
    // })
    // 修改密码-2019/2/22
    // userAction.modifyPWD('','',function(res){
    //   console.log(res)
    // })
    // 根据登录用户重新缓存项目列表
    // userAction.restoreProjectList(function(res){
    //   console.log(res)
    // })
    // 新增绑定平台帐号与微信帐号-2019/2/27
    // let fwxinfo = {
    //   nickname: 1,
    //   gender: 1,
    //   language: 1,
    //   city: 1,
    //   province: 1,
    //   country: 1,
    //   avatarurl: 1,
    //   signature: 1,
    //   encrypteddata: 1,
    //   iv: 1,
    //   openid: 1,
    // }
    // userWechatAction.addUSERbindWXID(fwxinfo,function(res){
    //   console.log(res.code)
    // })
    // 用户授权获取平台帐号及其他信息-2019/3/1-2019/3/5
    // userWechatAction.getUSERbindWXID(function(bwxmnguser){
    //   console.log(bwxmnguser)
    // })
    // 项管系统账户已绑定微信号授权登录-2019/3/1
    // userWechatAction.wxopenidSignIn('ofSPN4kcsTD90fQVr6wO5uULktFY',function(res){
    //   console.log(res.code);
    // })
    // 解绑项管系统账户与已绑定微信号-2019/3/5
    // userWechatAction.unboundUSERandWXID('',function(res){
    //   console.log(res.code);
    // })
    // =====================================user用户操作===================================
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~commons~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // 接口产生或修改时间列表
    // 确认后使用
    // 已失效
    // 2019/2/14
    // 2019/2/15
    // 2019/2/18
    // 2019/2/19
    // 2019/2/20
    // 2019/2/21
    // 2019/2/22
    // 2019/2/26
    // 2019/2/27
    // 2019/2/28
    // 2019/3/1
    // 2019/3/5
  },

})