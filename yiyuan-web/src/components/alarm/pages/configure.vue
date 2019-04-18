<template>
  <div id="configure">
    <div class="for-item" v-for="(item, index) in list" :key="index">
      <label class="name">{{item.name}}</label>
      <div class="list">
        <label>
          <span>警告类型</span>
          {{item.type}}
        </label>
        <label>
          <span>最大值</span>
          {{item.max_value}}
        </label>
        <label>
          <span>最小值</span>
          {{item.min_value}}
        </label>
      </div>
    </div>
  </div>
</template>
<script>

const alarmConfigService = require('../../../service/alarmConfigService.js');
export default {
  data() {
    return {
      list: [],
    }
  },
  created() {
    this.getListData(this.companyId);
  },
  props: {
    // 获取值
    companyId: {
      type: String,
      default: null
    }
  },
  watch: {
    companyId(val) {
      this.getListData(val);
    }    
  },
  methods: {
    /**
     * 获取数据
     */
    getListData(id){
      let _this = this;
      alarmConfigService.listByCompanyId(id, res => {
        console.log(res);
        _this.list = res.list;
      });
    },
  }
}

</script>
<style scoped>
#configure {
	overflow: hidden;
	padding-bottom: 26px;
  background-color: #fff;
}

.for-item {
	float: left;
	margin-right: 44px;
	margin-top: 26px;
  width: 153px;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  border: 1px solid #D4E9FF;
}

.for-item:last-child{
	margin-right: 0;
}

.for-item label.name {
	padding-left: 12px;
  display: block;
  line-height: 24px;
  background-color: #56A5F4;
  color: #fff;
}

.list {
	padding: 0 12px 12px 12px;
}

.list label {
  margin-top: 12px;
  display: block;
  color: #202020;
}

.list label span {
  color: #555555;
  width: 67px;
  display: inline-block;
  text-align: left;
}

</style>
