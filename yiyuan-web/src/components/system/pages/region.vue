<template>
  <div id="region">
    <div class="search-top operation-top">
      <div class="search">
        <el-input size="small" placeholder="请输入关键字" v-model="searchForm" clearable class="search-input" clearable></el-input>
        <el-button size="small" class="search-btn" icon="el-icon-search"></el-button>
      </div>
      <div class="operation">
        <el-button type="text" icon="el-icon-refresh">刷新</el-button>
        <el-button type="text" icon="el-icon-delete">删除</el-button>
        <el-button type="text" icon="el-icon-plus" @click="edit('add')">添加</el-button>
        <el-button type="text" icon="el-icon-edit-outline" @click="edit('edit')">修改</el-button>
      </div>
    </div>
    <div class="tabelData">
      <div class="options">
        <el-select v-model="value" placeholder="请选择" size="mini">
          <el-option></el-option>
        </el-select>
        <el-select v-model="value" placeholder="请选择" size="mini">
          <el-option></el-option>
        </el-select>
        <el-select v-model="value" placeholder="请选择" size="mini">
          <el-option></el-option>
        </el-select>
        <el-select v-model="value" placeholder="请选择" size="mini">
          <el-option></el-option>
        </el-select>
        <el-button size="small" type="text" style="margin-left: 20px;">删除</el-button>
      </div>
      <el-table :data="List" style="margin-top: 10px;">
      </el-table>
    </div>
    <div class="paging">
      <el-pagination background :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400" class="paging-detail">
      </el-pagination>
    </div>
    <region-edit :title="titleEdit" :isVisible="isVisible" @close="isVisible=false"></region-edit>
  </div>
</template>
<script>
import regionEdit from '../module/regionedit.vue' 

export default {
  data() {
    return {
      titleEdit: "",
      isVisible: false,
      searchForm: "",
      form: {

      }
    }
  },

  components: {
    regionEdit
  },

  methods: {
    edit(flag) {
      if (flag == 'add') {
        this.titleEdit = "新增区域信息"
      } else {
        this.titleEdit = "修改区域信息"
      }
      this.isVisible = true;
    }
  }
}

</script>
<style scoped>
#region {
  /*padding: 0 20px;*/
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.operation {
  position: relative;
  width: 235px;
  display: flex;
  justify-content: space-between;
}

.operation span {
  color: #1B88F5;
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
}

.search {
  align-items: center;
  display: flex;
}

.search-input {
  width: 210px;
}

.search-btn {
  background-color: #007ED7;
  color: #fff;
}

.tabelData {
  width: 100%;
  display: flex;
  flex-direction: column;
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
#region .search /deep/.el-input__inner {
  border: 1px solid #ccc !important;
  border-radius: 0;
  border-right: none;
}

#region .search /deep/.el-button {
  border: 1px solid #007ED7 !important;
  border-radius: 0;
}

.options /deep/ .el-input--mini .el-input__inner {
  width: 110px;
  border-radius: 0;
  border-bottom: 1px solid #CCC;
  border-left: none;
  border-right: none;
  border-top: none;
}

</style>
