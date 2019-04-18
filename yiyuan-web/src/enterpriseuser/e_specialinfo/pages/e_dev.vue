<template>
  <div id="e_dev">
    <div class="search-top operation-top">
      <div class="search">
        <el-input size="small" placeholder="查询" v-model="searchForm" clearable class="search-input"></el-input>
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
        >设备图片</el-button>
        <el-button type="text" icon="el-icon-circle-plus-outline" @click="edit('add')">添加</el-button>
      </div>
    </div>
    <div class="tabelData">
      <el-table :data="listEquipment">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="type" label="设备类型"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="code" label="代码"></el-table-column>
        <el-table-column prop="number" label="数量"></el-table-column>
        <el-table-column prop="place" label="场所"></el-table-column>
        <el-table-column prop="worker_num" label="作业人数"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit('edit',scope.row.id)">修改</el-button>
            <el-button type="text" size="small" @click="del(scope.row.id)">删除</el-button>
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
    <dev-edit
      :title="titleEdit"
      :isVisible="isVisible"
      @close="isVisible=false"
      @clickName="getListData"
      :updateId="updateId"
    ></dev-edit>
    <!-- 架构图 -->
    <preview :see="isPreview" :fileType="fileType"></preview>
  </div>
</template>
<script>
import devEdit from "../module/e_devedit.vue";

const specialInfoService = require("../../../service/specialInfoService.js");
export default {
  data() {
    return {
      titleEdit: "",
      searchForm: "",
      isVisible: false,
      isPreview: false,
      pageTotal: 0,
      listEquipment: [],
      // 更新id
      updateId: null,
      fileType: "特种设备操作",
      uploadAction: "/api/file/upload/special_info/700/",
      uploadFileData:{
        user: localStorage.getItem("username"),
        formname: "special_info",
        workid: localStorage.getItem("groupid"),
        filebelong: "特种设备操作",
        platform: "PCW",
      }
    };
  },
  created() {
    this.getListData();
  },
  components: {
    devEdit
  },
  methods: {
    edit(flag, id) {
      if (flag == "add") {
        this.titleEdit = "添加特种设备基本信息";
      } else {
        this.titleEdit = "修改特种设备基本信息";
      }
      this.isVisible = true;
      this.updateId = id;
    },

    /**
     * 获取列表数据
     */
    getListData() {
      let _this = this;
      specialInfoService.listEquipment(res => {
        console.log(res);
        if (1 == res.code) {
          _this.listEquipment = res.list;
          _this.pageTotal = res.list.length;
        }
        console.log(_this.list);
      });
    },

    /**
     * 删除
     */
    del(id) {
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          specialInfoService.deleteEquipmentById(id, res => {
            if (1 == res.code) {
              this.$message({
                type: "success",
                message: "操作成功!"
              });
              this.getListData();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
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
#e_dev {
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
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
#e_dev .search /deep/.el-input__inner {
  border: 1px solid #ccc !important;
  border-radius: 0;
  border-right: none;
}

#e_dev .search /deep/.el-button {
  border: 1px solid #007ed7 !important;
  border-radius: 0;
}
</style>
