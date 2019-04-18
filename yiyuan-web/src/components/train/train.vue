<template>
  <div id="train">
    <div class="top-nav">
      <div>
        <span v-for="(nav,index) in navList" :key="index" @click="select(index)">
          {{nav.name}}
          <label class="active" v-show="navIndex==index"></label>
        </span>
      </div>
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
    </div>
    <div class="main">
      <div class="search-top operation-top">
        <div class="filters">
          <span
            class="filte-item"
            v-for="(item, index) in filterList"
            :key="index"
            @click="filterClick(index, item)"
            :class="[filterIndex==index?'active':'']"
          >{{item}}</span>
        </div>
        <div class="operation">
          <!-- <el-upload :action="uploadAction" :data="uploadFileData" :show-file-list="false" :on-success="uploadRes" :before-upload="beforeUpload">
            <el-button type="text" icon="el-icon-upload">上传</el-button>
          </el-upload> -->
          <el-button type="text" icon="el-icon-upload" @click="isVisible=true">上传</el-button>
          <el-button type="text" icon="el-icon-delete" @click="deleteFile">删除</el-button>
        </div>
      </div>
      <div class="data-list">
        <div class="item" v-for="(item,index) in fileList" :key="index">
          <el-checkbox v-model="item.checked">{{item.filename}}</el-checkbox>
          <img :src="item.thumb" height="100px">
          <div class="item-info">
            <label>上传时间：{{item.uploadat}}</label>
            <label>文件大小：{{item.filesize}}</label>
          </div>
        </div>
      </div>
    </div>
    <upload @close="isVisible=false" :isVisible="isVisible" @clickName="getListData(0,0)"></upload>
  </div>
</template> 
<script>
const securitytrainingService = require('../../service/securitytrainingService.js');
const util = require('../../service/utils/util.js');
import upload from "../train/module/upload.vue";
export default {
  data() {
    return {
      isVisible: false,
      navIndex: 0,
      filterIndex: 0,
      searchForm: "",
      navList: [
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
      filterList: ["全部", "视频", "文档"],
      loading: null,
      fileList:[],
      delIds: "", // "1,2,3..."
      uploadAction: "/api/file/upload/security_train_file/100/",
      uploadFileData:{
        user: localStorage.getItem("username"),
        formname: "security_train_file",
        workid: localStorage.getItem("areaid"),
        filebelong: "安全培训",
        platform: "PCW",
      }
    };
  },
  created() {
    this.getListData(0, 0);
  },
  components: {
    upload
  },

  methods: {
    select(index) {
      this.navIndex = index;
      this.getListData(index,this.filterIndex);
    },

    /**
     * 根据类型获取文件
     */
    filterClick(index, item) {
      this.filterIndex = index;
      this.getListData(this.navIndex,index);
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
     * 获取视频培训数据
     */
    getListVideoData() {
      let _this = this;
      this.openLoading();
      securitytrainingService.listVideo(res => {
        console.log(res);
        _this.fileList = res.list;
        // _this.pageTotal = res.list.length;
        _this.closeLoading();
      });
    },

    /**
     * 获取文档培训数据
     */
    getListDocData() {
      let _this = this;
      this.openLoading();
      securitytrainingService.listDocument(res => {
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
#train {
  padding: 0 0px;
  display: flex;
  flex-direction: column;
}

.top-nav {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.main {
  padding: 0 20px;
  background-color: #fff;
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

.top-nav span label.active {
  margin: 2px auto;
  display: block;
  width: 100%;
  height: 2px;
  background-color: #007ed7;
  border-radius: 6px;
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
  height: 60px;
  /*padding-bottom: 4px;*/
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
  /*justify-content: space-between;*/
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

.filters span {
  margin-left: 20px;
  padding: 0 8px;
  font-size: 12px;
  color: #555;
  border: 1px solid #fff;
  cursor: pointer;
}

.filters span.active {
  border: 1px solid;
  border-radius: 6px;
  color: #1b88f5;
}
</style>
<style>
#train .search /deep/.el-input__inner {
  border: 1px solid #ccc !important;
  border-radius: 0;
  border-right: none;
}

#train .search /deep/.el-button {
  border: 1px solid #007ed7 !important;
  border-radius: 0;
}
</style>
