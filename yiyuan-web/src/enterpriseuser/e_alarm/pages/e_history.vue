<template>
  <div id="e_history">
    <div class="search-top operation-top">
      <div class="search">
        <el-input size="small" placeholder="企业名称" v-model="searchForm" clearable class="search-input" clearable></el-input>
        <el-button size="small" class="search-btn" icon="el-icon-search"></el-button>
        <span class="date-txt">时间范围</span>
        <el-date-picker v-model="date1" size="mini" type="date" placeholder="选择日期" style="width: 130px;"></el-date-picker>
        <span class="date-txt">至</span>
        <el-date-picker v-model="date2" size="mini" type="date" placeholder="选择日期" style="width: 130px;"></el-date-picker>
      </div>
      <div class="operation">
        <el-button type="text" icon="el-icon-refresh">刷新</el-button>
      </div>
    </div>
    <div class="tabelData">
      <el-table :data="historyList" height="100%">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" label="序号">
        </el-table-column>
        <el-table-column prop="status" label="状态">
        </el-table-column>
        <el-table-column prop="name" label="告警名称">
        </el-table-column>
        <el-table-column prop="hazardsource" label="危险源">
        </el-table-column>
        <el-table-column prop="date" label="告警时间">
        </el-table-column>
        <el-table-column prop="rangeMin" label="告警范围（最小）">
        </el-table-column>
        <el-table-column prop="rangeMax" label="告警范围（最大）">
        </el-table-column>
        <el-table-column prop="number" label="告警值">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paging">
      <el-pagination background :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400" class="paging-detail">
      </el-pagination>
    </div>
  </div>
</template>
<script>

const alarmInfoService = require('../../../service/alarmInfoService.js');
export default {
  data() {
    return {
      searchForm: "",
      date1: "",
      date2: "",
      historyList: []
    }
  },
  created() {
    // this.getHistoryInfo();
  },
  methods: {
    /**
     * 获取历史警告数据
     */
    getHistoryInfo(){
      let _than = this;
      alarmInfoService.listHistoryInfo(res => {
        _than.historyList = res;
      });
    },
  },
}

</script>
<style scoped>
#e_history {
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.operation {
  position: relative;
  width: 55px;
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

.date-txt {
  padding: 0 13px;
  color: #555;
  font-size: 13px;
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
#e_history .search /deep/.el-input__inner {
  border: 1px solid #ccc !important;
  border-radius: 0;
  border-right: none;
}

#e_history .search /deep/.el-button {
  border: 1px solid #007ED7 !important;
  border-radius: 0;
}

</style>
