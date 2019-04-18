<template>
  <div id="user">
    <div class="search-top operation-top">
      <div class="search">
        <el-input size="small" placeholder="企业名称" v-model="searchForm" clearable class="search-input" clearable></el-input>
        <el-button size="small" class="search-btn" icon="el-icon-search"></el-button>
      </div>
      <div class="operation">
        <el-button type="text" icon="el-icon-refresh" @click="getListData">刷新</el-button>
        <el-button type="text" icon="el-icon-plus" @click="edit('add', null)">添加</el-button>
      </div>
    </div>
    <div class="tabelData">
      <el-table :data="userList">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" label="序号">
        </el-table-column>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="cellphone" label="手机号">
        </el-table-column>
        <el-table-column prop="" label="分值">
          <template slot-scope="scope">
            <div>0.00</div>
          </template>
        </el-table-column>
        <el-table-column prop="cellphone" label="登录时间">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="del(scope.row.id)">删除</el-button>
            <el-button type="text" size="small" @click="edit('edit',scope.row.id)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paging">
      <el-pagination background :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal" class="paging-detail">
      </el-pagination>
    </div>
    <user-edit @close="isVisible=false" :title="title" :isVisible="isVisible" @clickName="getListData" :updateId="updateId"></user-edit>
  </div>
</template>
<script>
import userEdit from '../module/useredit.vue'

const userManagerService = require('../../../service/userManagerService.js');
export default {
  data() {
    return {
      title: "",
      isVisible: false,
      searchForm: "",
      pageTotal: 0,
      userList: [],
      // 更新id
      updateId: null,
      loading: null,
    }
  },
  created(){
    this.getListData();
  },
  components: {
    userEdit
  },

  methods: {
    edit(flag, id) {
      if (flag == 'add') {
        this.title = "添加企业人员名单"
      } else {
        this.title = "修改企业人员名单"
      }
      this.isVisible = true;
      this.updateId = id;
    },


    /**
     * 获取列表数据
     */
    getListData() {
      let _this = this;
      this.openLoading();
      userManagerService.listUser2(res => {
        console.log(res);
        if (1 == res.code) {
          _this.userList = res.list;
          _this.pageTotal = res.list.length;
        }
        _this.closeLoading();
        console.log(_this.userList);
      });
    },

    /**
     * 删除
     */
    del(id){
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        userManagerService.deleteUserById(id, res => {
          if (1 == res.code) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.getListData();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },

    openLoading(){
      this.loading = this.$loading({
        lock: true,
        text: '正在加载中...',
        spinner: 'el-icon-loading',
        // fullscreen: false,
        background: 'rgba(0, 0, 0, 0.7)'
      });      
    },
    closeLoading(){
      this.loading.close();     
    },
  }
}

</script>
<style scoped>
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
