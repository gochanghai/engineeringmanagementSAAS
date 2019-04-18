<template>
  <div id="e_train">
    <div class="aside">
      <div class="work-list">
        <label
          v-for="(item, index) in workList"
          :key="index"
          @click="select(index)"
          :class="[workIndex==index?'active':'']"
        >{{item.name}}</label>
      </div>
    </div>
    <div class="content">
      <div class="top-nav">
        <div>
          <span v-for="(item, index) in filterList" :key="index" @click="select2(index, item)">
            {{item}}
            <label :class="[filterIndex==index?'active':'']"></label>
          </span>
        </div>
      </div>
      <div class="main">
        <div class="search-top operation-top">
          <div class="search">
            <el-input
              size="small"
              placeholder="请输入公司名称/关键字"
              v-model="searchForm"
              clearable
              class="search-input"
            ></el-input>
            <el-button size="small" class="search-btn" icon="el-icon-search"></el-button>
          </div>
          <div class="operation">
            <!-- <el-upload :action="uploadAction" :data="uploadFileData" :show-file-list="false" :on-success="uploadRes" :before-upload="beforeUpload">
              <el-button type="text" icon="el-icon-upload">上传</el-button>
            </el-upload> -->
            <el-button type="text" icon="el-icon-upload" @click="isVisible=true">上传</el-button>
            <el-button type="text" icon="el-icon-delete">删除</el-button>
          </div>
        </div>
        <div class="data-list">
          <div class="item" v-for="(item,index) in fileList" :key="index">
            <el-checkbox v-model="item.checked">{{item.filename}}</el-checkbox>
            <img :src="item.thumb" height="100px">
            <div class="item-info">
              <!-- <label>上传人：深圳市易元安全科技有限公司</label> -->
              <label>上传时间：{{item.uploadat}}</label>
              <label>文件大小：{{item.filesize}}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <upload @close="isVisible=false" :isVisible="isVisible"  @clickName="getListData(0,0)"></upload>
  </div>
</template>
<script>
const securitytrainingService = require('../../service/securitytrainingService.js');
const util = require('../../service/utils/util.js');
import upload from "../e_train/module/e_upload";
export default {
  data() {
    return {
      isVisible: false,
      searchForm: "",
      workIndex: 0,
      workList: [
        {
          name: "全部"
        },
        {
          name: "省"
        },
        {
          name: "市"
        },
        {
          name: "区"
        },
        {
          name: "街道"
        }
      ],
      filterIndex: 0,
      filterList: ["全部","视频","文档"],
      list: [{
        name: "安全生产警示教育培训",
        file: require("../../common/images/test_img2.png"),
        uploadAt: '2019-04-12 17:20:00',
        fileSize: '12M',
        checked: false
      }],
      loading: null,
      fileList:[],
      delIds: "", // "1,2,3..."
      uploadAction: "/api/file/upload/security_train_file/200/",
      fileType: "video/",
      uploadFileData:{
        user: localStorage.getItem("username"),
        formname: "security_train_file",
        belongidlist: "video",
        workid: localStorage.getItem("groupid"),
        filebelong: "安全培训",
        platform: "PCW",
      }
    }
  },
  created() {
    this.getListData(0,0);
  },
  components: {
    upload
  },

  methods: {
    /**
     * 根据区域获取文件
     */
    select(index) {
      this.workIndex = index;
      this.getListData(index,this.filterIndex);
    },
    /**
     * 根据类型获取文件
     */
    select2(index, item) {
      [this.filterIndex, this.condition] = [index, item];
      this.getListData(this.workIndex,index);
    },

    /**
     * 获取安全培训数据
     */
    getListData(area, type) {
      let _this = this;
      this.openLoading();
      securitytrainingService.listAreaDataByTypeAndArea(area, type, res => {
        console.log(res);
        _this.fileList = res.list;
        // _this.pageTotal = res.list.length;
        _this.closeLoading();
      });
    },

    /**
     * 删除文件
     */
    deleteFile(id) {
      let ids = "";
      for(let item of this.fileList){
        if(item.checked === true){
          ifs += item.id + ","
        }
      }
      // 去掉最后一个','
      ids = ids.substring(0, ids.length-1);
      let _this = this;
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        securitytrainingService.batchDeleteByIds(ids, res => {
          if (1 == res.code) {
            _this.$message({
              type: 'success',
              message: '删除成功!'
            });
            _this.getListData();
          } else {
            _this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    /**
     * 文件上传前处理函数
     */
    beforeUpload(file){
      let type = util.fileMatchType(file.name)
      this.uploadFileData.filebelong = "安全培训_" + type;
      console.log(file);
      console.log(file.name);
      console.log(type);      
    },

    /**
     * 上传结果
     */
    uploadRes(res, file, fileList){
      let _this = this;
      console.log(res);
      if(res.code == 1 && "上传成功" == res.reason){
        this.$notify.success({ title: '提示', message: '上传成功', duration: 2000 });
        setTimeout(function(){
          _this.getListData();
        },1000);
      }else {
        this.$notify.error({ title: '上传失败', message: '错误', duration: 2000 });
      }
    },

    openLoading(){
      this.loading = this.$loading({
        lock: true,
        text: '正在加载中...',
        spinner: 'el-icon-loading',
        // fullscreen: false,
        background: 'rgba(0, 0, 0, 0.7)'
      });      
    },
    closeLoading(){
      this.loading.close();     
    },
  }
};
</script>
<style scoped>
#e_train {
  position: absolute;
  width: calc(100% - 260px);
  height: calc(100% - 50px);
  left: 260px;
  top: 50px;
  display: flex;
}

.aside {
  z-index: 99;
  position: fixed;
  left: 0;
  height: 100%;
  padding-top: 15px;
  width: 260px;
  text-align: center;
  background-color: #fff;
}

.work-list label {
  display: block;
  line-height: 38px;
  color: #555;
  font-size: 15px;
  cursor: pointer;
  border-right: 3px solid #fff;
}

.work-list label.active {
  background-color: #d4e9ff;
  color: #1b88f5;
  border-right: 3px solid #56a5f4;
}

.top-nav {
  margin-bottom: 10px;
}

.top-nav span {
  margin-left: 6px;
  padding: 0 20px;
  display: inline-block;
  cursor: pointer;
  font-size: 14px;
  text-align: center;
  color: #202020;
}

.top-nav span label {
  margin: 2px auto;
  display: block;
  width: 34px;
  height: 2px;
  border-radius: 6px;
}

.top-nav span label.active {
  margin: 2px auto;
  display: block;
  width: 34px;
  height: 2px;
  background-color: #007ed7;
  border-radius: 6px;
}

.top-nav {
  display: flex;
  justify-content: space-between;
}

.content {
  margin: 15px;
  flex: 1;
}

.main {
  background-color: #fff;
  padding: 0 20px;
}

.operation {
  position: relative;
  width: 115px;
  display: flex;
  justify-content: space-between;
}

.operation span {
  color: #1b88f5;
  font-size: 14px;
}

.operation img {
  width: 17px;
  height: 17px;
  margin-right: 5px;
}

.search-top {
  height: 70px;
  padding-bottom: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}

.search {
  align-items: center;
  display: flex;
}

.search-input {
  width: 210px;
}

.search-btn {
  background-color: #007ed7;
  color: #fff;
}

.data-list {
  padding-bottom: 22px;
  display: flex;
  flex-wrap: wrap;
}

.data-list div.item {
  margin-right: 47px;
  margin-top: 32px;
  flex-direction: column;
  width: 300px;
}

.item img {
  display: block;
  margin-top: 6px;
}

.item div.item-info label {
  margin-top: 4px;
  display: block;
  font-size: 12px;
  color: #aaa;
}
</style>
<style>
#e_train .search /deep/.el-input__inner {
  border: 1px solid #ccc !important;
  border-radius: 0;
  border-right: none;
}

#e_train .search /deep/.el-button {
  border: 1px solid #007ed7 !important;
  border-radius: 0;
}
</style>
