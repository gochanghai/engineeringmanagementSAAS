<template>
  <div id="e_user">
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
        <el-button
          type="text"
          icon="el-icon-picture"
          @mouseover.native="isPreview=true"
          @mouseout.native="isPreview=false"
        >企业安全组织架构图</el-button>
        <el-button type="text" icon="el-icon-circle-plus-outline" @click="edit('add')">添加</el-button>
      </div>
    </div>
    <div class="tabelData">
      <el-table :data="userList" height="100%" style="flex:1">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="companyname" label="企业名称"></el-table-column>
        <el-table-column prop="account" label="用户名"></el-table-column>
        <el-table-column prop="cellphone" label="电话"></el-table-column>
        <el-table-column prop="idcard" label="身份证"></el-table-column>
        <el-table-column prop="loginat" label="登录时间"></el-table-column>
        <el-table-column prop="position" label="职务"></el-table-column>
        <el-table-column prop="duty" label="职责"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit('edit',scope.row.id)">修改</el-button>
            <el-button type="text" size="small" @click="deleteUser(scope.row.id)">删除</el-button>
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
    <user-edit
      @close="isVisible=false"
      :isVisible="isVisible"
      :title="titleEdit"
      @clickName="getListData"
      :updateId="updateId"
    ></user-edit>

    <!-- 架构图 -->
    <preview :see="isPreview" :fileType="fileType"></preview>
  </div>
</template>
<script>
import userEdit from "../module/e_useredit.vue";
const workerService = require("../../../service/workerService.js");
const fileService = require("../../../service/fileService.js");

export default {
  data() {
    return {
      isPreview: false,
      isVisible: false,
      titleEdit: "",
      searchForm: "",
      pageTotal: 400,
      userList: [],
      // 更新id
      updateId: null,
      fileType: "企业安全组织架构图",
      uploadAction: "/api/file/upload/worker_group/100/",
      uploadFileData:{
        user: localStorage.getItem("username"),
        formname: "worker_group",
        workid: localStorage.getItem("groupid"),
        filebelong: "组织架构图",
        platform: "PCW",
      }
    };
  },
  created() {
    this.getListData();
  },
  components: {
    userEdit,
    // preview
  },
  methods: {
    edit(flag, id) {
      if (flag == "add") {
        this.titleEdit = "添加企业人员名单";
      } else {
        this.titleEdit = "修改企业人员名单";
      }
      this.isVisible = true;
      this.updateId = id;
    },

    /**
     * 获取组织架构列表数据
     */
    getListData() {
      let _this = this;
      workerService.getUserList2(res => {
        console.log(res);
        if (1 == res.code) {
          _this.userList = res.list;
          _this.pageTotal = res.list.length;
        }
        console.log(_this.userList);
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

    /**
     * 删除用户
     */
    deleteUser(id) {
      let ids = id;
      let _this = this;
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          workerService.deleteUserByFormids(ids, res => {
            if (1 == res.code) {
              _this.$message({
                type: "success",
                message: "删除成功!"
              });
              _this.getListData();
            } else {
              _this.$message({
                type: "success",
                message: "删除成功!"
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
    }
  }
};
</script>
<style scoped>
#e_user {
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.operation {
  position: relative;
  width: 340px;
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

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(15px);
  opacity: 0;
}

.preview {
  position: absolute;
  top: 90px;
  right: 15px;
  width: 720px;
  height: 610px;
  font-size: 14px;
  background-color: #fff;
  box-shadow: #c7c7c7 0px 0px 18px;
  z-index: 999;
}
</style>
<style>
#e_user .search /deep/.el-input__inner {
  border: 1px solid #ccc !important;
  border-radius: 0;
  border-right: none;
}

#e_user .search /deep/.el-button {
  border: 1px solid #007ed7 !important;
  border-radius: 0;
}
</style>
