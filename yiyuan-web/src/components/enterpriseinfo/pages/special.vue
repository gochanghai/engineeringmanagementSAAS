<template>
  <div id="special">
    <div class="search-top operation-top">
      <div class="filters">
        <span
          v-for="(item, index) in filterList"
          :key="index"
          :class="[filterIndex==index?'active':'']"
          @click="select(index, item)"
        >{{item.name}}</span>
      </div>
      <div class="operation">
        <el-button type="text" icon="el-icon-refresh">刷新</el-button>
        <!-- <el-upload action>
          <el-button type="text" icon="el-icon-upload">上传</el-button>
        </el-upload> -->
        <el-button
          type="text"
          icon="el-icon-picture"
          @mouseover.native="isPreview=true"
          @mouseout.native="isPreview=false"
        >有限空间分部图</el-button>
      </div>
    </div>
    <div class="components">
      <div class="components">
        <space v-if="filterIndex==0" :companyId="companyId"/>
        <dust v-else-if="filterIndex==1" :companyId="companyId"/>
        <chemistry v-else-if="filterIndex==2" :companyId="companyId"/>
        <other v-else-if="filterIndex==3" :companyId="companyId"/>
        <ammonia v-else-if="filterIndex==4" :companyId="companyId"/>
        <lithium v-else-if="filterIndex==5" :companyId="companyId"/>
        <dev v-else/>
      </div>
    </div>
    <!-- 架构图 -->
    <preview :see="isPreview" :top="168" :fileType="fileType"></preview>
  </div>
</template>
<script>
import space from "../module/space.vue"; //有限空间
import dust from "../module/dust.vue"; //粉尘涉爆
import chemistry from "../module/chemistry.vue"; //危险化学品
import other from "../module/other.vue"; //其他
import ammonia from "../module/ammonia.vue"; //涉氢
import lithium from "../module/lithium.vue"; //锂电池
import dev from "../module/dev.vue"; //特种设备

export default {
  data() {
    return {
      List: [{ type: "粉尘涉爆" }, { type: "有限空间" }],
      condition: "",
      searchForm: "",
      filterIndex: 0,
      isPreview: false,
      filterList: [
        {name:"有限空间", id: 100},
        {name:"粉尘涉爆",id: 200},
        {name:"危险化学品",id: 300},
        {name:"其他",id: 400},
        {name:"涉氢",id: 500},
        {name:"锂电池",id: 600},
        {name:"特种设备",id: 700}
      ],
      fileType: "有限空间操作",
      uploadType: "100",
      uploadAction: "/api/file/upload/special_info/100/",
      uploadFileData:{
        user: localStorage.getItem("username"),
        formname: "special_info",
        workid: localStorage.getItem("groupid"),
        filebelong: "有限空间操作",
        platform: "PCW",
      }
    };
  },

  components: {
    space,
    dust,
    chemistry,
    other,
    ammonia,
    lithium,
    dev
  },
  props: {
    // 获取值
    companyId: {
      type: String,
      default: null
    }
  },

  methods: {
    select(index, item) {
      [this.filterIndex, this.condition] = [index, item];
      this.fileType = item.name + "操作";
    },

    seldelete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
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
#special {
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
  padding: 0.5px 8px;
  font-size: 12px;
  color: #555;
  border: 1px solid #fff;
  cursor: pointer;
}

.filters span.active {
  border: 1px solid;
  border-radius: 6px;
  color: #1b88f5;
}

.operation {
  position: relative;
  width: 230px;
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
  height: 60px;
  /*padding-bottom: 4px;*/
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
#special .search /deep/.el-input__inner {
  border: 1px solid #ccc !important;
  border-radius: 0;
  border-right: none;
}

#special .search /deep/.el-button {
  border: 1px solid #007ed7 !important;
  border-radius: 0;
}
</style>
