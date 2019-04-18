<template>
  <div id="user">
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
        <el-button
          type="text"
          icon="el-icon-picture"
          @mouseover.native="isPreview=true"
          @mouseout.native="isPreview=false"
        >组织架构图</el-button>
      </div>
    </div>
    <div class="tabelData">
      <el-table :data="userList">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="companyname" label="企业名称"></el-table-column>
        <el-table-column prop="account" label="用户名"></el-table-column>
        <el-table-column prop="cellphone" label="电话"></el-table-column>
        <el-table-column prop="idcard" label="身份证"></el-table-column>
        <el-table-column prop="loginat" label="登录时间"></el-table-column>
        <el-table-column prop="position" label="职务"></el-table-column>
        <el-table-column prop="duty" label="职责"></el-table-column>
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
      @clickName="getListData"
      :updateId="updateId"
      :title="titleEdit"
      :isVisible="isVisible"
      @close="isVisible = false"
    />
    <!-- 架构图 -->
    <preview :see="isPreview" :top="177" :fileType="fileType"></preview>
  </div>
</template>
<script>
import userEdit from "../module/useredit.vue";
const workerService = require("../../../service/workerService.js");
const fileService = require("../../../service/fileService.js");
export default {
  data() {
    return {
      groupImageVisible: false,
      searchForm: "",
      pageTotal: 0,
      isPreview: false,
      userList: [],
      titleEdit: "",
      isVisible: false,
      // 更新id
      updateId: null,
      fileType: "企业安全组织架构图",
    };
  },
  created() {
    this.getListData(this.companyId);
  },
  components: {
    userEdit
  },
  props: {
    // 获取值
    companyId: {
      type: String,
      default: null
    }
  },
  watch: {
    companyId(val) {
      this.getListData(val);
    }    
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
    getListData(id) {
      let _this = this;
      workerService.getUserListByid(id, res => {
        console.log(res);
        if (1 == res.code) {
          _this.userList = res.list;
          _this.pageTotal = res.list.length;
        }
        console.log(_this.userList);
      });
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
#user {
  padding: 0 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.operation {
  position: relative;
  width: 155px;
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
#user .search /deep/.el-input__inner {
  border: 1px solid #ccc !important;
  border-radius: 0;
  border-right: none;
}

#user .search /deep/.el-button {
  border: 1px solid #007ed7 !important;
  border-radius: 0;
}
</style>
