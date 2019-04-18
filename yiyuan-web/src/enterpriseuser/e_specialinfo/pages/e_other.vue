<template>
  <div id="e_other">
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
        >其他设备或特殊场所图</el-button>
        <el-button type="text" icon="el-icon-circle-plus-outline" @click="edit('add')">添加</el-button>
      </div>
    </div>
    <div class="tabelData">
      <el-table :data="listOther">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="place" label="场所"></el-table-column>
        <el-table-column prop="danger" label="安全隐患"></el-table-column>
        <el-table-column prop="property" label="属性"></el-table-column>
        <el-table-column prop="number" label="数量"></el-table-column>
        <el-table-column prop="product_reason" label="产生原因"></el-table-column>
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
    <other-edit
      :title="titleEdit"
      :isVisible="isVisible"
      @close="isVisible=false"
      @clickName="getListData"
      :updateId="updateId"
    ></other-edit>
    <!-- 架构图 -->
    <preview :see="isPreview" :fileType="fileType"></preview>
  </div>
</template>
<script>
import otherEdit from "../module/e_otheredit";
const specialInfoService = require("../../../service/specialInfoService.js");
export default {
  data() {
    return {
      titleEdit: "",
      isVisible: false,
      isPreview: false,
      searchForm: "",
      pageTotal: 0,
      listOther: [],
      // 更新id
      updateId: null,
      fileType: "其他操作",
      uploadAction: "/api/file/upload/special_info/400/",
      uploadFileData:{
        user: localStorage.getItem("username"),
        formname: "special_info",
        workid: localStorage.getItem("groupid"),
        filebelong: "其他操作",
        platform: "PCW",
      }
    };
  },
  created() {
    this.getListData();
  },
  components: {
    otherEdit
  },
  methods: {
    edit(flag, id) {
      if (flag == "add") {
        this.titleEdit = "添加其他设备或特殊场所基本信息";
      } else {
        this.titleEdit = "修改其他设备或特殊场所基本信息";
      }
      this.isVisible = true;
      this.updateId = id;
    },

    /**
     * 获取列表数据
     */
    getListData() {
      let _this = this;
      specialInfoService.listOther(res => {
        console.log(res);
        if (1 == res.code) {
          _this.listOther = res.list;
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
          specialInfoService.deleteOtherById(id, res => {
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
#e_other {
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.operation {
  position: relative;
  width: 355px;
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
#e_other .search /deep/.el-input__inner {
  border: 1px solid #ccc !important;
  border-radius: 0;
  border-right: none;
}

#e_other .search /deep/.el-button {
  border: 1px solid #007ed7 !important;
  border-radius: 0;
}
</style>
