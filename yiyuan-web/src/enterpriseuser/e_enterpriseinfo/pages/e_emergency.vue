<template>
  <div id="e_emergency">
    <div class="top-nav">
      <div>
        <span>深圳易元安全技术有限公司安全生产事故应急预案已经龙岗区安监局备案通过，取得安全生产事故应急预案备案登记证。</span>
      </div>
    </div>
    <div class="main">
      <div class="search-top operation-top">
        <div class="search">
          <el-input
            size="small"
            placeholder="企业名称"
            v-model="searchForm"
            clearable
            class="search-input"
          ></el-input>
          <el-button size="small" class="search-btn" icon="el-icon-search"></el-button>
        </div>
        <div class="operation">
          <el-button type="text" icon="el-icon-refresh" @click="getListData">刷新</el-button>
          <el-upload :action="uploadAction" :data="uploadFileData" :show-file-list="false" :on-success="uploadRes">
            <el-button type="text" icon="el-icon-upload">上传</el-button>
          </el-upload>
          <el-button type="text" icon="el-icon-circle-plus-outline" @click="edit('add')">添加</el-button>
          <el-button
            type="text"
            icon="el-icon-picture-outline"
            @mouseover.native="isPreview=true"
            @mouseout.native="isPreview=false"
          >应急预案</el-button>
        </div>
      </div>
      <div class="tabelData">
        <el-table :data="emergencyList" height="100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="division" label="专业分工"></el-table-column>
          <el-table-column prop="command" label="应急指挥职务"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="position" label="行政职务"></el-table-column>
          <el-table-column prop="phone" label="手机号"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="edit('edit',scope.row.id)">修改</el-button>
              <el-button type="text" size="small" @click="deleteEmergency(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paging">
        <el-pagination
          background
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageTotal"
          class="paging-detail"
        ></el-pagination>
      </div>
    </div>
    <emergency-edit
      :isVisible="isVisible"
      :title="titleEdit"
      @close="isVisible=false"
      @clickName="getListData"
      :updateId="updateId"
    ></emergency-edit>
    <!-- 架构图 -->
    <preview :see="isPreview" :top="128" :fileType="fileType"></preview>
  </div>
</template>
<script>
import emergencyEdit from "../module/e_emergencyedit.vue";
const emergencyManagementService = require("../../../service/emergencyManagerService.js");
export default {
  data() {
    return {
      titleEdit: "",
      isPreview: false,
      isVisible: false,
      searchForm: "",
      pageTotal: 0,
      emergencyList: [],
      // 更新id
      updateId: null,
      fileType: "企业应急预案",
      uploadAction: "/api/file/upload/emergency_plan/100/",
      uploadFileData:{
        user: localStorage.getItem("username"),
        formname: "emergency_plan",
        workid: localStorage.getItem("groupid"),
        filebelong: "应急预案",
        platform: "PCW",
      }
    };
  },
  created() {
    this.getListData();
  },
  components: {
    emergencyEdit
  },
  methods: {
    /**
     * 获取应急管理添加or编辑
     */
    edit(type, id) {
      if (type == "add") {
        this.titleEdit = "添加应急救援人员";
      } else {
        this.titleEdit = "修改应急救援人员";
      }
      this.updateId = id;
      this.isVisible = true;
    },

    /**
     * 获取应急管理列表数据
     */
    getListData() {
      let _this = this;
      emergencyManagementService.list(res => {
        console.log(res);
        _this.emergencyList = res.list;
        _this.pageTotal = res.list.length;
      });
    },

    /**
     * 删除应急救援人员
     */
    deleteEmergency(id) {
      let ids = id;
      let _this = this;
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        emergencyManagementService.batchDeleteByIds(ids, res => {
          if (1 == res.code) {
            _this.$message({
              type: "success",
              message: "删除成功!"
            });
            _this.getListData();
          } else {
            _this.$message({
              type: "error",
              message: "删除失败!"
            });
          }
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
    },

    /**
     * 上传结果
     */
    uploadRes(res, file, fileList){
      let _this = this;
      console.log(res);
      if(res.code == 1 && "上传成功" == res.reason){
        this.$notify.success({ title: '提示', message: '上传成功', duration: 2000 });
      }else {
        this.$notify.error({ title: '上传失败', message: '错误', duration: 2000 });
      }
    },
  }
};
</script>
<style scoped>
#e_emergency {
  /*padding: 0 20px;*/
  display: flex;
  flex-direction: column;
  /*background-color: #fff;*/
}

.top-nav {
  margin-bottom: 17px;
}

.top-nav span {
  margin-left: 6px;
  padding: 0 20px;
  display: inline-block;
  cursor: pointer;
  font-size: 14px;
  color: #202020;
}

.top-nav span label.active {
  margin: 2px auto;
  display: block;
  width: 42px;
  height: 2px;
  background-color: #007ed7;
  border-radius: 6px;
}

.top-nav {
  display: flex;
  justify-content: space-between;
}

.main {
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: #fff;
  padding: 0 20px;
}

.operation {
  position: relative;
  width: 275px;
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

.tabelData {
  width: 100%;
  display: flex;
  flex: 1;
}

.paging {
  text-align: center;
  display: flex;
  align-items: center;
  height: 80px;
}

.paging-detail {
  width: 100%;
}
</style>
<style>
#e_emergency .search /deep/.el-input__inner {
  border: 1px solid #ccc !important;
  border-radius: 0;
  border-right: none;
}

#e_emergency .search /deep/.el-button {
  border: 1px solid #007ed7 !important;
  border-radius: 0;
}
</style>
