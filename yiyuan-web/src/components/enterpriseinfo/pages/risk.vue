<template>
  <div id="risk">
    <div class="search-top operation-top">
      <div class="filters">
        <span v-for="(item, index) in filterList" :key="index" :class="[filterIndex==index?'active':'']" @click="select(index, item)">{{item}}</span>
      </div>
      <div class="operation">
        <el-button type="text" icon="el-icon-refresh" @click="getListData(riskType)">刷新</el-button>
      </div>
    </div>
    <div class="tabelData">
      <el-table :data="riskList" style="flex:1">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" label="序号">
        </el-table-column>
        <el-table-column prop="level" label="风险等级">
          <template slot-scope="scope">
            <span :style="{backgroundColor:scope.row.color}" class="bg-color">{{scope.row.level}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="source" label="危险源">
        </el-table-column>
        <el-table-column prop="risk" label="安全风险">
        </el-table-column>
        <el-table-column prop="damage" label="可能造成伤害">
        </el-table-column>
        <el-table-column prop="l" label="L">
        </el-table-column>
        <el-table-column prop="e" label="E">
        </el-table-column>
        <el-table-column prop="c" label="C">
        </el-table-column>
        <el-table-column prop="d" label="D">
        </el-table-column>
        <el-table-column prop="plan" label="预防措施">
        </el-table-column>
        <el-table-column prop="remarks" label="备注">
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
const riskIdentifyService = require('../../../service/riskIdentifyService.js')
export default {
  data() {
    return {
      pageTotal: 0,
      riskList: [],
      condition: "",
      searchForm: "",
      filterIndex: 0,
      filterList: [
        "有限空间",
        "粉尘涉爆",
        "危险化学品",
        "其他",
        "涉氢",
        "锂电池",
        "特种设备"
      ],
      riskType: "有限空间",      
    }
  },

  created() {
    this.getListData('有限空间');
  },
  methods: {
    select(index, item) {
      [this.filterIndex, this.condition] = [index, item];
      this.riskType = item;
      this.getListData(item);
    },

    /**
     * 获取风险识别列表数据
     */
    getListData(type) {
      let _this = this;
      riskIdentifyService.list(type, res => {
        console.log(res);
        _this.riskList = res.list;
        _this.pageTotal = res.list.length;
      });
    },

    seldelete(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    }
  }
}

</script>
<style scoped>
#risk {
  padding: 0 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.filters {
  /*padding-top: 20px;*/
}

.filters span {
  margin-left: 20px;
  padding: .5px 8px;
  font-size: 12px;
  color: #555;
  border: 1px solid #fff;
  cursor: pointer;
}

.filters span.active {
  border: 1px solid;
  border-radius: 6px;
  color: #1B88F5;
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
  height: 60px;
  /*padding-bottom: 4px;*/
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
#risk .search /deep/.el-input__inner {
  border: 1px solid #ccc !important;
  border-radius: 0;
  border-right: none;
}

#risk .search /deep/.el-button {
  border: 1px solid #007ED7 !important;
  border-radius: 0;
}

.bg-color {
  display: block;
  /* color:#fff; */
  width: 100%;
  text-align: center
}

</style>
