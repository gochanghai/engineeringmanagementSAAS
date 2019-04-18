<template>
  <div id="e_riskedit">
    <el-dialog :title="title" :visible.sync="isVisible" width="24%" :before-close="handleClose">
      <el-form label-width="120px" label-position="left" size="small" :model="riskeditForm" :rules="rules" ref="riskeditForm" status-icon style="flex: 1">
        <el-form-item label="危险源" prop="source">
          <el-input v-model="riskeditForm.source" clearable placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="安全风险" prop="risk">
          <el-input v-model="riskeditForm.risk" clearable placeholder="缺氧/有害气体"></el-input>
        </el-form-item>
        <el-form-item label="可能造成伤害" prop="damage">
          <el-input v-model="riskeditForm.damage" clearable placeholder="窒息/触电/误伤"></el-input>
        </el-form-item>
        <el-form-item label="风险值(L)" prop="l">
          <el-select v-model="riskeditForm.l" style="width: 210px">
              <el-option v-for=" (item,index ) in lList" :value="item.value" :key="index" :label="item.value+ '  ' + item.name"/>
            </el-select>
        </el-form-item>
        <el-form-item label="风险值(E)" prop="e">
          <el-select v-model="riskeditForm.e" style="width: 210px">
              <el-option v-for=" (item,index ) in eList" :value="item.value" :key="index" :label="item.value+ '  ' + item.name"/>
            </el-select>
        </el-form-item>
        <el-form-item label="风险值(C)" prop="c">
          <el-select v-model="riskeditForm.c" style="width: 210px">
              <el-option v-for=" (item,index ) in cList" :value="item.value" :key="index" :label="item.value+ '  ' + item.name"/>
            </el-select>
        </el-form-item>
        <el-form-item label="风险值(D)" prop="d">
          <el-input v-model="riskeditForm.d" clearable disabled></el-input>
        </el-form-item>
        <el-form-item label="风险等级" prop="level">
          <el-input v-model="riskeditForm.level" clearable disabled></el-input>
        </el-form-item>
        <el-form-item label="控制措施" prop="plan">
          <el-input v-model="riskeditForm.plan" clearable placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="riskeditForm.remarks" clearable placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" size="medium" @click="save">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>

const riskIdentifyService = require('../../../service/riskIdentifyService.js');
export default {
  data() {
    var checkIsNumber = (rule, value, callback) => {
      // 正则表达式校验
      var reg = /(^[\-0-9][0-9]*(.[0-9]+)?)$/;
      if(!reg.test(value)){
        callback(new Error('只能是数字'));
      }
      return callback(); 
    };
    var checkSource = (rule, value, callback) => {
      if(this.riskeditForm.id != ''){
        return callback();
      }
      riskIdentifyService.checkSourceBySource(value, res => {
        if(2 == res.code){
          return callback(new Error('危险源已经存在'));
        }else{
         return callback();
        }
      })
    };
    return {
      lList: [
        {value:10,name:'完全可以预料'},
        {value:6,name:'相当可能'},
        {value:3,name:'可能，但不经常'},
        {value:1,name:'可能性小'},
        {value:0.5,name:'很不可能'},
        {value:0.1,name:'及不可能'}],

      eList: [
        {value:10,name:'连续暴露'},
        {value:6,name:'每天工作事件暴露'},
        {value:3,name:'每月一次暴露'},
        {value:1,name:'每年几次暴露'},
        {value:0.5,name:'非常罕见暴露'}],
      cList: [
        {value:100,name:'10人以上死亡'},
        {value:40,name:'3~9人死亡'},
        {value:15,name:'1~2人死亡'},
        {value:7,name:'严重'},
        {value:3,name:'重大，伤残'},
        {value:1,name:'引起注意'}],
      dList: [
        {value:'>=720',name:'极高',level: "V级", color: "red"},
        {value:'720>D>=240',name:'高',level: "IV级", color: "orange"},
        {value:'240>D>=150',name:'中等', level: "III级", color: "yellow"},
        {value:'70>D>=150',name:'低', level: "II级", color: "blue"},
        {value:'70>D',name:'低', level: "I级", color: "white"}],
      riskeditForm: {
        id: '',
        source: '',
        risk: '',
        plan: '',
        l: '',
        e: '',
        c: '',
        d: '',
        level: '',
        color: '',
        damage: '',
        remarks: ''
      },

      rules: {
        source: [
          { required: true, message: '危险源不能为空', trigger: 'blur' },
          { validator: checkSource, trigger: 'blur' }
        ],
        risk: [
          { required: true, message: '安全风险不能为空', trigger: 'blur' }
        ],
        damage: [
          { required: true, message: '可能造成伤害不能为空', trigger: 'blur' }
        ],
        l: [
          { required: true, message: '风险值(L)不能为空', trigger: 'blur' },
          // { validator: checkIsNumber, trigger: 'blur' }
        ],
        e: [
          { required: true, message: '风险值(E)不能为空', trigger: 'blur' },
          // { validator: checkIsNumber, trigger: 'blur' }
        ],
        c: [
          { required: true, message: '风险值(C)不能为空', trigger: 'blur' },
          // { validator: checkIsNumber, trigger: 'blur' }
        ],
        d: [
          { required: true, message: '风险值(D)不能为空', trigger: 'blur' },
          // { validator: checkIsNumber, trigger: 'blur' }
        ],
        level: [
          { required: true, message: '风险等级不能为空', trigger: 'blur' }
        ],
        plan: [
          { required: true, message: '控制措施不能为空', trigger: 'blur' }
        ]
      },
    }
  },

  props: {
    title: {
      type: String,
      default: null
    },
    isVisible: {
      type: Boolean,
      default: false
    },
    riskType: {
      type: String,
      default: null
    },
    updateId: {
      type: Number,
      default: null
    },
  },

  watch: {
    isVisible: function(value){
      // this.resetForm();
      if(value){
        console.log(value)
        this.getRiskIdentifyInfo();
      }else{
        this.resetForm();
      }
      console.log("getRiskIdentifyInfo");
    },
    'riskeditForm.c': function(value){
      this.dValueCompute();
    },
    'riskeditForm.e': function(value){
      this.dValueCompute();
    },
    'riskeditForm.l': function(value){
      this.dValueCompute();
    },
    
  },

  methods: {
    handleClose() {
      this.$emit('close', false);
    },

    /**
     * 表单重置
     */
    resetForm() {
        this.$refs['riskeditForm'].resetFields();
    },

    /**
     * 获取数据
     */
    getRiskIdentifyInfo(){
      let _this = this;
      if("修改作业风险标识" === this.title && null != this.updateId){
        let id = this.updateId;
        riskIdentifyService.getById(id, res => {
          console.log(res);
          _this.riskeditForm = res.risk;
        });
      }      
      
    },

    /**
     * D值计算
     */
    dValueCompute(){
      let c = this.riskeditForm.c;
      let l = this.riskeditForm.l;
      let e = this.riskeditForm.e;
      if(null == c || "" == c){
        this.riskeditForm.d = ''
        return;
      }
      if(null == l || "" == l){
        this.riskeditForm.d = ''
        return;
      }
      if(null == e || "" == e){
        this.riskeditForm.d = ''
        return;
      }
      let num = c*l*e;
      this.riskeditForm.d = num;
      let dList = this.dList;
      if(720 <= num){
        this.riskeditForm.level = dList[0].level;
        this.riskeditForm.color = dList[0].color;
        return;
      }
      if(720 > num && 240 <= num){
        this.riskeditForm.level = dList[1].level;
        this.riskeditForm.color = dList[1].color;
        return;
      }
      if(240 > num && 150 <= num){
        this.riskeditForm.level = dList[2].level;
        this.riskeditForm.color = dList[2].color;
        return;
      }
      if(150 > num && 70 <= num){
        this.riskeditForm.level = dList[3].level;
        this.riskeditForm.color = dList[3].color;
      }
      if(70 > num){
        this.riskeditForm.level = dList[4].level;
        this.riskeditForm.color = dList[4].color;
      }
    },

    save() {
      let _this = this;
      this.$refs['riskeditForm'].validate((valid) => {
        if (!valid) {
            return;
        }

        let riskIdentify = {
          id: this.riskeditForm.id,
          source: this.riskeditForm.source,
          risk: this.riskeditForm.risk,
          level: this.riskeditForm.level,
          l: this.riskeditForm.l,
          e: this.riskeditForm.e,
          c: this.riskeditForm.c,
          d: this.riskeditForm.d,
          plan: this.riskeditForm.plan,
          color: this.riskeditForm.color,
          damage: this.riskeditForm.damage,
          remarks: this.riskeditForm.remarks,
        }

        this.$confirm('确认提交信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         // 判断添加还是更新
          if("添加作业风险标识" === this.title){
            riskIdentify.type = this.riskType;
            riskIdentifyService.add(riskIdentify, res => {
              console.log(res);
              _this.$emit('clickName', true);
              _this.handleClose();
            });
          }

          if("修改作业风险标识" === this.title){
            riskIdentifyService.updateById(riskIdentify, res => {
              console.log(res);
              _this.$emit('clickName', true);
              _this.handleClose();
            });
          }      
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
          // this.resetForm();
          this.handleClose();
        });        
      });        
    },
  }
}

</script>
<style scoped>
</style>
<style>
#e_riskedit /deep/ .el-input__inner {
  border: none !important;
  border-bottom: 1px solid #CCC !important;
  border-radius: 0;
}

</style>
