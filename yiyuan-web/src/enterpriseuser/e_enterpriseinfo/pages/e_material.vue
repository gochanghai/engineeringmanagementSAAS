<template>
  <div id="e_material">
    <div class="search-top operation-top">
      <div class="search">
        <el-input size="small" placeholder="企业名称" v-model="searchForm" clearable class="search-input" clearable></el-input>
        <el-button size="small" class="search-btn" icon="el-icon-search"></el-button>
      </div>
      <div class="operation">
        <el-button type="text" icon="el-icon-refresh" @click="getListData">刷新</el-button>
        <el-button type="text" icon="el-icon-circle-plus-outline" @click="edit('add')">添加</el-button>
      </div>
    </div>
    <div class="tabelData">
      <el-table :data="materialList" height="100%">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" label="序号">
        </el-table-column>
        <el-table-column prop="name" label="器材名称" />
        <el-table-column prop="model" label="型号/规格" />
        <el-table-column prop="risks" label="安全风险" />
        <el-table-column prop="location" label="存放位置" />
        <el-table-column prop="number" label="数量" />
        <el-table-column prop="status" label="状态" />
        <el-table-column prop="person" label="责任人" />
        <el-table-column prop="phone" label="联系方式" />
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit('edit',scope.row.id)">修改</el-button>
            <el-button type="text" size="small" @click="deleteEmergency(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paging">
      <el-pagination background :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal" class="paging-detail">
      </el-pagination>
    </div>
    <materialEdit :title="titleEdit" :isVisible="isVisible" @close="isVisible=false" @clickName="getListData" :updateId="updateId"></materialEdit>
  </div>
</template>
<script>
import materialEdit from '../module/e_materialedit.vue'
const equipmentService = require('../../../service/equipmentService.js');
export default {
  data() {
    return {
      titleEdit: "",
      isVisible: false,
      searchForm: "",
      pageTotal: 0,
      materialList: [],
      // 更新id
      updateId: null,  
    }
  },
  created() {
    this.getListData();
  },
  components: {
    materialEdit
  },
  methods: {
    edit(type, id) {
      if (type == "add") {
        this.titleEdit = '添加设备器材'
      } else {
        this.titleEdit = '修改设备器材'
      }
      this.updateId = id;
      this.isVisible = true;
    },

    /**
     * 获取器材列表数据
     */
    getListData() {
      let _this = this;
      equipmentService.list(res => {
        console.log(res);
        if (1 == res.code) {
          _this.materialList = res.list;
          _this.pageTotal = res.list.length;
        }
      });
    },
    /**
     * 删除器材
     */
    deleteEmergency(id) {
      let ids = id;
      let _this = this;
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        equipmentService.batchDeleteByIds(ids, res => {
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
    }
  }
}

</script>
<style scoped>
#e_material {
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.operation {
  position: relative;
  width: 115px;
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
#e_material .search /deep/.el-input__inner {
  border: 1px solid #ccc !important;
  border-radius: 0;
  border-right: none;
}

#e_material .search /deep/.el-button {
  border: 1px solid #007ED7 !important;
  border-radius: 0;
}

</style>
