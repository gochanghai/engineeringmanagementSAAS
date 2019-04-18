<template>
  <div id="e_workdetail">
    <el-dialog title="作业详情" :visible.sync="isVisible" width="39%" :before-close="handleClose">
      <div style="display: flex;">
        <div class="type">
          <label :style="{color:index==0? '#1B88F5' : ''}" @click="select(0)">作业详情</label>
          <label :style="{color:index==1? '#1B88F5' : ''}" @click="select(1)">作业流程</label>
          <label :style="{color:index==2? '#1B88F5' : ''}" @click="select(2)">作业时间列表</label>
        </div>
        <div class="data" v-if="index==0">
          <div class="work-item" v-for="(item,index) in workList" :key="index">
            <label>{{item.label}}</label>
            {{item.value}}
          </div>
        </div>
        <div class="data" v-else-if="index==1">
          <div class="nav-list">
            <span class="item" v-for="(item,index) in header" :key="index" @click="change(index)">
              {{item}}
              <label class="active" v-show="navIndex==index"></label>
            </span>
          </div>
          <div class="content" v-if="navIndex==0">
            <div class="work-item" v-for="(item,index) in workList" :key="index">
              <label>{{item.label}}</label>
              {{item.value}}
            </div>
          </div>
          <div class="content" v-if="navIndex==1">
            <div class="work-item" v-for="(item,index) in approval" :key="index">
              <label style="width: 83px">{{item.label}}</label>
              {{item.value}}
            </div>
          </div>
          <div class="content" v-if="navIndex==2">
            <el-radio-group v-model="selModule" size="mini" style="margin-top: 7px;">
              <el-radio :label="0">全部</el-radio>
              <el-radio :label="1">照片</el-radio>
              <el-radio :label="2">视频</el-radio>
              <el-radio :label="3">文件</el-radio>
            </el-radio-group>
            <div class="file-list">
              <div class="file-item" v-for="(item, index) in aFlielist" :key="index">
                <img :src="item.thumb">
              </div>
              <div class="file-item" v-for="(item, index) in aFlielist" :key="index">
                <img src="../../../common/images/test_img2.png">
              </div>
            </div>
          </div>
          <div class="content" v-if="navIndex==3">
            <el-radio-group v-model="selModule2" size="mini" style="margin-top: 7px;">
              <el-radio :label="0">全部</el-radio>
              <el-radio :label="1">照片</el-radio>
              <el-radio :label="2">文件</el-radio>
            </el-radio-group>
            <div class="file-list">
              <div class="file-item" v-for="(item, index) in onFileList" :key="index">
                <img :src="item.thumb">
              </div>
              <div class="file-item" v-for="(item, index) in onFileList" :key="index">
                <img src="../../../common/images/test_img2.png">
              </div>
            </div>
          </div>
          <div class="content" v-if="navIndex==4">
            <div class="state-item" v-for="(item,index) in stateList" :key=" index">
              <label style="width: 83px;font-size: 14px;">{{item.label}}</label>
              {{item.value}}
            </div>
          </div>
        </div>
        <div class="data" v-else-if="index==2">
          <el-table :data="dateList" style="width: 100%;background-color: #f2f4f6" height="100%">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="date" label="日期" width="100"></el-table-column>
            <el-table-column prop="start_datetime" label="开始时间" width="160"></el-table-column>
            <el-table-column prop="over_datetime" label="结束时间" width="160"></el-table-column>
            <el-table-column prop="time_long" label="作业时长"></el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
const workService = require("../../../service/workService.js");
export default {
  data() {
    return {
      index: 0,
      navIndex: 0,
      selModule: 0,
      selModule2: 0,
      workList: [
        {
          label: "作业名称",
          value: ""
        },
        {
          label: "作业时间",
          value: ""
        },
        {
          label: "作业地址",
          value: ""
        },
        {
          label: "主要负责人",
          value: ""
        },
        {
          label: "安全管理人员",
          value: ""
        },
        {
          label: "作业人数(人)",
          value: ""
        },
        {
          label: "现场作业人员",
          value: ""
        },
        {
          label: "开始时间",
          value: ""
        },
        {
          label: "结束时间",
          value: ""
        }
      ],

      header: [
        "申请信息",
        "审批信息",
        "上传准备材料",
        "落实工作",
        "作业环境状态"
      ],

      //审批信息
      approval: [
        {
          label: "审批人",
          value: "王兵间"
        },
        {
          label: "审批时间",
          value: "2018-09-08 16:20:00"
        },
        {
          label: "审批意见",
          value: "通过，按方案作业"
        }
      ],

      stateList: [
        {
          label: "一氧化碳",
          value: "9"
        },
        {
          label: "硫化氢",
          value: "3"
        },
        {
          label: "氧气",
          value: "90"
        },
        {
          label: "人体感应",
          value: "1"
        }
      ],

      // 上传准备材料
      aFlielist: [],
      // 现场落实
      onFileList: [],
      dateList: [],
    };
  },

  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    detailId: {
      type: Number,
      default: null
    }
  },

  watch: {
    isVisible: function(value) {
      if (value) {
        console.log(value);
        this.getWorkingDetails(this.detailId);
        this.getWorkApply(this.detailId);
      } else {
        this.index = 0;
        this.navIndex = 0;
        this.selModule = 0;
        this.selModule2 = 0;
      }
      console.log("getWorkingDetails");
    }
  },

  methods: {
    select(index) {
      this.index = index;
      if(index === 2){
        this.getWorkingDateList(this.detailId);
      }
    },

    handleClose() {
      this.$emit("close", false);
    },

    change(index) {
      this.navIndex = index;
      let id = this.detailId;
      if (0 === index) {
        this.getWorkingDetails(id);
        this.getWorkApply(id);
      }
      if (1 === index) {
        this.getExamineApprove(id);
      }
      if (2 === index) {
        this.getWorkingPrepareFile(id);
      }
      if (3 === index) {
        this.getWorkingOnsiteFile(id);
      }
      if (4 === index) {
        // this.getOnsiteEnvironment(id);
      }
    },

    /**
     * 获取作业详情信息
     */
    getWorkingDetails(id) {
      let _this = this;
      workService.getById(id, res => {
        console.log(res);
        _this.workList[0].value = res.work.name;
        _this.workList[1].value = res.work.work_datetime;
        _this.workList[2].value = res.work.work_place_text;
        _this.workList[5].value = res.work.operator_no;
        _this.workList[6].value = res.work.operator_names;
        _this.workList[7].value = res.work.onsite_start_datetime;
        _this.workList[8].value = res.work.onsite_over_datetime;
      });
    },
    getWorkApply(id){
      let _this = this;
      workService.getWorkApplyById(id, res => {
        if(null != res.data){
          _this.workList[3].value = res.data.repname;
          _this.workList[4].value = res.data.smname;
        }        
      })
    },

    /**
     * 获取作业审批信息
     */
    getExamineApprove(workid) {
      workService.examineApproveByapplyId(workid, res => {
        console.log(res);
        if (null != res.work_check) {
          this.approval[0].value = res.work_check.name;
          this.approval[1].value = res.work_check.check_time;
          this.approval[2].value = res.work_check.check_opinion;
        }
      });
    },

    /**
     * 获取上传准备材料
     */
    getWorkingPrepareFile(workid) {
      workService.getWorkingPrepareFileByWorkId(workid, res => {
        console.log(res);
        this.aFlielist = res.list;
      });
    },

    /**
     * 获取现场落实文件
     */
    getWorkingOnsiteFile(workid) {
      workService.getWorkingOnsiteFileByWorkId(workid, res => {
        console.log(res);
        this.onFileList = res.list;
      });
    },

    /**
     * 获取作业环境状态信息
     */
    getOnsiteEnvironment(id) {
      workService.siteEnvironmentById(id, res => {
        console.log(res);
        // if(null != res.work_check){
        //     this.stateList[0].value= res.work_check.reviewer;
        //     this.stateList[1].value= res.work_check.check_time;
        //     this.stateList[2].value= res.work_check.check_opinion;
        //     this.stateList[3] = res.data;
        //   }
      });
    },

    /**
     * 获取作业时间表
     */
    getWorkingDateList(workid) {
      workService.getWorkingDateListByWorkId(workid, res => {
        console.log(res);
        this.dateList = res.list;
      });
    },


  }
};
</script>
<style scoped>
.type {
  width: 15%;
}

.type > label {
  display: block;
  line-height: 37px;
  color: #555;
  cursor: pointer;
}

.data {
  width: 87%;
  height: 365px;
  padding: 5px 15px;
  background-color: #f2f4f6;
  overflow: auto;
}

.work-item {
  line-height: 36px;
  font-size: 14px;
}

.work-item > label {
  display: inline-block;
  width: 112px;
  color: #555;
}

.nav-list {
  width: 80%;
  display: flex;
  justify-content: space-between;
  color: black;
}

.nav-list > span {
  padding-top: 7px;
  display: inline-block;
  cursor: pointer;
}

.nav-list span label {
  display: block;
  margin: 3px auto;
  width: 66%;
  height: 2px;
  border-radius: 10px;
  background-color: #fff;
}

.nav-list span label.active {
  background-color: #56a5f4;
}

.content {
  margin-top: 2px;
}

.file-list {
  margin-top: 33px;
}

.file-item img {
  width: 100%;
}

.file-item {
  margin-right: 18px;
  width: 80px;
  float: left;
}

.state-item {
  font-size: 20px;
  line-height: 37px;
  color: #56a5f4;
}

.state-item label {
  display: inline-block;
  font-size: 14;
  color: #555;
}

</style>
<style>
 
#e_workdetail .el-table th{
  background-color: #f2f4f6 !important;
}
</style>

