<template>
  <transition name="slide">
    <div class="preview" :style="{top:top+'px'}" v-show="see">
      <img :src="fileImage.thumb" alt="">
    </div>
  </transition>
</template>

<script>
const fileService = require('../../service/fileService.js');
export default {
  data() {
    return {
      fileImage:{
        thumb: null,
      },

    }
  },
  props: {
    top: {
      type: Number,
      default: 90
    },
    see: {
      type: Boolean,
      default: false
    },
    file: {
      type: String,
      default: null
    },
    fileType: {
      type: String,
      default: null,
    }
  },

  watch: {
    see: function(value){
      // this.resetForm();
      if(value){
        console.log(value)
        if(this.fileType === "企业安全组织架构图"){
          this.getFile("worker_group", 100);
        }
        if(this.fileType === "企业应急预案"){
          this.getFile("emergency_plan", 100);
        }

        if(this.fileType === "有限空间操作"){
          this.getFile("special_info", 100);
        }
        if(this.fileType === "粉尘涉爆操作"){
          this.getFile("special_info", 200);
        }
        if(this.fileType === "危险化学品操作"){
          this.getFile("special_info", 300);
        }
        if(this.fileType === "其他操作"){
          this.getFile("special_info", 400);
        }
        if(this.fileType === "涉氢操作"){
          this.getFile("special_info", 500);
        }
        if(this.fileType === "锂电池操作"){
          this.getFile("special_info", 600);
        }
        if(this.fileType === "特种设备操作"){
          this.getFile("special_info", 700);
        }

        if(this.fileType === "有限空间操作"){
          this.getFile("risk_identify_operate", 100);
        }
        if(this.fileType === "粉尘涉爆操作"){
          this.getFile("risk_identify_operate", 200);
        }
        if(this.fileType === "危险化学品操作"){
          this.getFile("risk_identify_operate", 300);
        }
        if(this.fileType === "其他操作"){
          this.getFile("risk_identify_operate", 400);
        }
        if(this.fileType === "涉氢操作"){
          this.getFile("risk_identify_operate", 500);
        }
        if(this.fileType === "锂电池操作"){
          this.getFile("risk_identify_operate", 600);
        }
        if(this.fileType === "特种设备操作"){
          this.getFile("risk_identify_operate", 700);
        }
        
      }else{
        this.fileImage = { thumb: null};
      }
      console.log("see image");
    }
  },

  methods: {
    /**
     * 获取安全培训数据
     */
    getFile(formname, type) {
      let _this = this;
      fileService.getSingleFile(formname,type,res => {
        console.log(res);
        if(res.file != null){
          _this.fileImage = res.file;
        }        
        console.log(res.file.filebelong);
      });
    },
  }
};
</script>

<style scoped>
.preview {
  position: absolute;
  right: 15px;
  width: 720px;
  height: 610px;
  font-size: 14px;
  background-color: #fff;
  box-shadow: #c7c7c7 0px 0px 18px;
  z-index: 999;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(15px);
  opacity: 0;
}
</style>


