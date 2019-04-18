<template>
  <div id="e_dust">
    <div class="tabelData">
      <el-table :data="listDust">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" label="序号">
        </el-table-column>
        <el-table-column prop="name" label="车间名称">
        </el-table-column>
        <el-table-column prop="type" label="粉尘类型">
        </el-table-column>
        <el-table-column prop="worker_num" label="作业人数">
        </el-table-column>
        <el-table-column prop="area" label="车间面积">
        </el-table-column>
      </el-table>
    </div>
    <div class="paging">
      <el-pagination background :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal" class="paging-detail">
      </el-pagination>
    </div>
  </div>
</template>
<script>
const specialInfoService = require('../../../service/specialInfoService.js');
export default {
  data() {
    return {
      searchForm: "",
      pageTotal: 0,
      listDust: [],
    }
  },
  created(){
    this.getListData();
  },
  methods:{
    /**
     * 获取列表数据
     */
    getListData() {
      let _this = this;
      specialInfoService.listDust(res => {
        console.log(res);
        if (1 == res.code) {
          _this.listDust = res.list;
          _this.pageTotal = res.list.length;
        }
        console.log(_this.list);
      });
    },
  }
}

</script>
<style scoped>
#e_dust {
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.operation {
  position: relative;
  width: 350px;
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
  border-bottom: 1px solid #CCC;
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
#e_dust .search /deep/.el-input__inner {
  border: 1px solid #ccc !important;
  border-radius: 0;
  border-right: none;
}

#e_dust .search /deep/.el-button {
  border: 1px solid #007ED7 !important;
  border-radius: 0;
}

</style>
