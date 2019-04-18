<template>
  <div id="enterpriselist">
    <el-tree :data="areas" :indent="12" :props="defaultProps" @node-click="handleNodeClick" icon-class="el-icon-arrow-right"></el-tree>
  </div>
</template>
<script>
const areaService = require('../../service/areaService.js');
export default {
  data() {
    return {      
      data: [{
        label: '广东省',
        children: [{
          label: '深圳市',
          children: [{
            label: '宝安区',
            children: [{
              label: '新安街道',
              children: [{
                label: 'a公司'
              }, {
                label: 'b公司'
              }, {
                label: 'c公司'
              }, {
                label: 'd公司'
              }, ]
            }]
          }, {
            label: '福田区'
          }]
        }, {
          label: '广州市',
          children: [{
            label: '海珠区',
            children: [{
              label: '东胜新街',
              children: [{
                label: 'a公司'
              }, {
                label: 'b公司'
              }, {
                label: 'c公司'
              }, {
                label: 'd公司'
              }, ]
            }]
          }]
        }]
      }, {
        label: '湖南省',
        children: [{
          label: '长沙市'
        }, {
          label: '岳阳市',
        }]
      }],
      areas: [],
      /**
       * 树状图数据结构设计
       */
      defaultProps: {
        children: 'list',
        label: 'name'
      }
    };
  },

  created() {
    this.getareaList();
  },

  methods: {
    handleNodeClick(data) {
      
      if ("企业" === data.type) {
        // localStorage.setItem("groupid", data.id);
        // localStorage.setItem("groupid", data.groupid);
        // this.$router.go(0);
        this.$emit('on-change', "C-" + data.id);
      }else{
        this.$emit('on-change', "A-" + data.id);
      }
    },

    /**
     * 获取省份信息
     */
    getareaList() {
      areaService.getAreasList(res => {
        console.log(res);
        if (-1 === res.code) {
          this.$router.go(0);
        }        
        this.areas = res.list;
        for(let item of res.list){
          if(item.type === "政府"){
            this.$emit('on-change', "A-" + item.id);
            return;
          }
        }
      });
    },
  }
};

</script>
<style scoped>
#enterpriselist {
  margin-top: 15px;
}

</style>
<style>
#enterpriselist /deep/.el-tree-node__content {
  height: 38px !important;
}

#enterpriselist /deep/.el-tree-node:focus>.el-tree-node__content {
  background-color: #D4E9FF;
  border-right: 4px solid #56A5F4;
}

</style>
