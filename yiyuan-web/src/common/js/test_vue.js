import { AxoisPost } from '../../common/js/request.js';

/**
 * 获取APP信息：
 * datalist 返回APP数据[{name,code,image}]；
 */
export let getAppInfo = function(user, page, appcode, para) {
  let datalist = {
    data: {
      user: user,
      datatype: "app",
      appcode: ""
    }
  }

  let url = "/api/admin/setting";
  let pagepara = {
    user: user,
    page: page,
    appcode: appcode,
    para: {}
  }
  let retData = AxoisPost(url, datalist, pagepara);
  console.log(retData);
  return retData;
}

/**
 * 获取APP配置信息：
 * datalist 返回APP配置数据{Database,BackServer,FrontServer,ClientType}；
 */
export let getAppSetting = function(user, page, appcode, para) {
  let datalist = {
    data: {
      user: user,
      datatype: "appsetting",
      appcode: appcode
    }
  }
  let url = "/api/admin/setting";
  let pagepara = {
    user: user,
    page: page,
    appcode: appcode,
    para: {}
  }
  let retData = AxoisPost(url, datalist, pagepara);
  return retData;
}

/**
 * 获取数据库信息：para{action:allTables/allFields,table:}
 * datalist 返回DB数据[{所有表名或者字段名}]；
 */
export let getDBInfo = function(user, page, appcode, para) {
  let datalist = {
    data: {
      user: user,
      action: para.action,
      table: para.table
    }
  }
  let url = "/api/db";
  let pagepara = {
    user: user,
    page: page,
    appcode: appcode,
    para: {}
  }
  let retData = AxoisPost(url, datalist, pagepara);
  return retData;
}

/**
 * 获取数据库记录信息：para{form:,psize:,condition,pages}
 * datalist 返回记录数据[{所有表名或者字段名}]；
 */
export let getDBRecordList = function(user, page, appcode, para) {
  if (para.form == null) {
    return null
  }
  let formFields = getDBInfo(user, page, appcode, {
    action: "allFields",
    table: para.form
  });
  if (para.psize = 0 || para.psize == null) {
    para.psize = 50
  }
  let datalist = {
    data: {
      user: user,
      form: para.form,
      action: "get",
      fields: formFields,
      condition: para.condition,
      page: {
        "pageSize": para.psize,
        "pageIndex": para.pages
      }
    }
  }
  let url = "/api/form";
  let pagepara = {
    user: user,
    page: page,
    appcode: appcode,
    para: {}
  }
  let retData = AxoisPost(url, datalist, pagepara);
  return retData;
}
