/**
 * 对接首页
 */
const httpJS = require('../../static/http.js');
const storageJS = require('../../static/storage.js');

/**
 * 获取所有项目的统计数据——合同金额、产值、回款：
 * bstatis 返回的实体类数据；
 */
export let getPStatis = function (callback) {
  let bstatis = {};
  let projectList = storageJS.getProjectList();
  let ids = "";
  for (let item of projectList) {
    ids += item.projectid + ",";
  }
  //去掉最后一个逗号(如果不需要去掉，就不用写)
  if (ids.length > 0) {
    ids = ids.substr(0, ids.length - 1);
  }
  let datalist = {
    user: storageJS.getUser().account,
    projectIDList: ids
  }
  httpJS.request('/mysaas/pstatis/total/get/all', datalist, function (res) {
    if (res.data.code > 0) {
      let resdatalist = res.data.datalist;
      if (null != resdatalist) {
        // 合同金额
        bstatis.contractamountsum = resdatalist.project.dc_projects[0].contractamountsum;
        // 产值
        bstatis.outputvaluesum = resdatalist.confirmvalue.dc_mng_project_confirmvalues[0].outputvaluesum;
        // 回款
        bstatis.actualreceivamountsum = resdatalist.recievedpay.dc_project_statistics[0].actualreceivamountsum;
      }
    }
    return typeof callback == 'function' && callback(bstatis)
  })
}

/**
 * 获取所有项目的绘图进度数据——未完成产值、累计回款、可回款：
 * bprogressData 返回的实体类数据；
 */
export let getGraphProgressData = function (callback) {
  let bprogressData = {};
  let projectList = storageJS.getProjectList();
  let ids = "";
  for (let item of projectList) {
    ids += item.projectid + ",";
  }
  //去掉最后一个逗号(如果不需要去掉，就不用写)
  if (ids.length > 0) {
    ids = ids.substr(0, ids.length - 1);
  }
  let datalist = {
    user: storageJS.getUser().account,
    projectIDList: ids
  }
  httpJS.request('/mysaas/pstatis/total/get/all', datalist, function (res) {
    if (res.data.code > 0) {
      let resdatalist = res.data.datalist;
      if (null != resdatalist) {
        // 未完成产值
        bprogressData.outputvaluerest = null != resdatalist.project.dc_projects[0].contractamountsum || null != resdatalist.confirmvalue.dc_mng_project_confirmvalues[0].outputvaluesum
          ? resdatalist.project.dc_projects[0].contractamountsum - resdatalist.confirmvalue.dc_mng_project_confirmvalues[0].outputvaluesum : 0;
        // 累计回款
        bprogressData.actualreceivamountsum = resdatalist.recievedpay.dc_project_statistics[0].actualreceivamountsum || 0;
        // 可收款
        bprogressData.receivablepaysum = null != resdatalist.confirmvalue.dc_mng_project_confirmvalues[0].outputvaluesum || resdatalist.recievedpay.dc_project_statistics[0].actualreceivamountsum
          ? resdatalist.confirmvalue.dc_mng_project_confirmvalues[0].outputvaluesum - resdatalist.recievedpay.dc_project_statistics[0].actualreceivamountsum : 0;
      }
    }
    return typeof callback == 'function' && callback(bprogressData)
  })
}