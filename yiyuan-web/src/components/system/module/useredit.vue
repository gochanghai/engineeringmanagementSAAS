<template>
  <div id="user-system-edit">
    <el-dialog :title="title" :visible.sync="isVisible" width="20%" :before-close="handleClose">
      <el-form v-if="title === '添加企业人员名单'" label-width="85px" label-position="left" size="small" ref="form" :model="form" :rules="rules" status-icon  style="flex: 1">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" clearable placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" clearable placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" clearable placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="管辖区域" prop="area_id">
          <div style="display: flex;margin-bottom: 8px;">
            <el-select v-model="area_id1" placeholder="请选择" style="margin-right: 12px;">
              <el-option v-for="(item,index) in areaList1" :key="index" :label="item.region_name" :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="area_id2" placeholder="请选择">
              <el-option v-for="(item,index) in areaList2" :key="index" :label="item.region_name" :value="item.id">
              </el-option>
            </el-select>            
          </div>
          <div style="display: flex;margin-bottom: 8px;">
            <el-select v-model="area_id3" placeholder="请选择" style="margin-right: 12px;">
              <el-option v-for="(item,index) in areaList3" :key="index" :label="item.region_name" :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="area_id4" placeholder="请选择">
              <el-option v-for="(item,index) in areaList4" :key="index" :label="item.region_name" :value="item.id">
              </el-option>
            </el-select>
          </div>          
          <!-- <el-input v-model="infoList.administer" clearable placeholder="请输入"></el-input> -->
        </el-form-item>
      </el-form>
      <el-form v-else label-width="85px" label-position="left" size="small" ref="form2" :model="form2" :rules="rules2" status-icon  style="flex: 1">
        <el-form-item label="管辖区域" prop="area_id">
          <div style="display: flex;margin-bottom: 8px;">
            <el-select v-model="area_id1" placeholder="请选择" style="margin-right: 12px;">
              <el-option v-for="(item,index) in areaList1" :key="index" :label="item.region_name" :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="area_id2" placeholder="请选择">
              <el-option v-for="(item,index) in areaList2" :key="index" :label="item.region_name" :value="item.id">
              </el-option>
            </el-select>            
          </div>
          <div style="display: flex;margin-bottom: 8px;">
            <el-select v-model="area_id3" placeholder="请选择" style="margin-right: 12px;">
              <el-option v-for="(item,index) in areaList3" :key="index" :label="item.region_name" :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="area_id4" placeholder="请选择">
              <el-option v-for="(item,index) in areaList4" :key="index" :label="item.region_name" :value="item.id">
              </el-option>
            </el-select>
          </div>          
          <!-- <el-input v-model="infoList.administer" clearable placeholder="请输入"></el-input> -->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" size="medium" @click="save">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>

const areaService = require('../../../service/areaService.js');
const userManagerService = require('../../../service/userManagerService.js');
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (value === null) {
        callback(new Error('手机号不能为空'));
      } else {
        // 正则表达式校验
        var reg=/^1[34578]\d{9}$/;
        if (!reg.test(value)) {
          callback(new Error('请输入正确的手机号'));
        }else{
          userManagerService.checkUsername(value, res => {
            if(2 == res.code){
              callback(new Error('此手机号已被注册'));
            }else{
              callback();
            }
          });
        } 
      }
    };
    return {
      form: {
        name: "",
        password: "",
        phone: "",
        area_id: '',
        mergerName: '',        
      },
      areaList1:[],
      areaList2:[],
      areaList3:[],
      areaList4:[],
      area_id1: '',
      area_id2: '',
      area_id3: '',
      area_id4: '',

      rules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        area_id: [
          { required: true, message: '管辖区域不能为空', trigger: 'blur' },
          
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      },

      form2: {
        area_id: '',
        mergerName: '',        
      },
      rules2: {
        area_id: [
          { required: true, message: '管辖区域不能为空', trigger: 'blur' },
          
        ],
      }
    }
  },

  props: {
    title: {
      type: String,
      default: ""
    },

    isVisible: {
      typeL: Boolean,
      default: false
    }
  },

  watch:{
    isVisible: function(value){
      if(value){
        this.getAreaist1();
      }else{
        this.$refs['form'].resetFields();
        this.$refs['form2'].resetFields();
        this.area_id1 = '';
        this.area_id2 = '';
        this.area_id3 = '';
        this.area_id4 = '';
      }
    },
    area_id1: function(value){
      this.area_id2 = '';
      this.area_id3 = '';
      this.area_id4 = '';
      this.getAreaist2(value);
      this.Areaist3= [];
      this.Areaist4= [];
      this.setAreaId();  
    },
    area_id2: function(value){      
      this.form.address3 = '';
      let fid = null;
      this.getAreaist3(value);
      this.Areaist4= [];
      this.setAreaId();
    },
    area_id3: function(value){
      this.setAreaId(); 
      this.getAreaist4(value);    
    },
    area_id4: function(value){
      this.setAreaId();     
    },
  },

  methods: {
    handleClose() {
      this.$emit('close', false);
    },

    /**
     * 获取省份信息
     */
    getAreaist1(){
      areaService.getChildAreasList(localStorage.getItem("areaid"),res => {
        console.log(res)
        if(-1 === res.code){
          this.$router.go(0);
        }
        this.areaList1 = res.list;
      });
      
    },

    /**
     * 获取城市信息
     */
    getAreaist2(fid){
      areaService.getChildAreasList(fid, res => {
        console.log(res)
        this.areaList2 = res.list;
      });
    },

    /**
     * 获取县区信息
     */
    getAreaist3(fid){
      areaService.getChildAreasList(fid, res => {
        console.log(res)
        this.areaList3 = res.list;
      });
    },

    /**
     * 获取县区信息
     */
    getAreaist4(fid){
      areaService.getChildAreasList(fid, res => {
        console.log(res)
        this.areaList4 = res.list;
      });
    },

    /**
     * 获取临近区域ID
     */
    setAreaId(){
      let _this = this;
      let isAdd = true;
      if(this.title != "添加企业人员名单"){
        isAdd = false;
      }
      if(_this.area_id4){
        if(isAdd){
          _this.form.area_id = _this.area_id4;
        }else{
          _this.form2.area_id = _this.area_id4;
        }        
        this.setMergerName(isAdd);
        return;
      }
      if(_this.area_id3){
        if(isAdd){
          _this.form.area_id = _this.area_id3;
        }else{
          _this.form2.area_id = _this.area_id3;
        }
        this.setMergerName(isAdd);
        return;
      }
      if(_this.area_id2){
        if(isAdd){
          _this.form.area_id = _this.area_id2;
        }else{
          _this.form2.area_id = _this.area_id2;
        }
        this.setMergerName(isAdd);
        return;
      }
      if(isAdd){
          _this.form.area_id = _this.area_id1;
        }else{
          _this.form2.area_id = _this.area_id1;
        }
      this.setMergerName(isAdd);
    },

    setMergerName(isAdd){
      let name = '';
      let listD = [this.areaList1,this.areaList2,this.areaList3,this.areaList4];
      for(let list of listD){
        for(let item of list){
          if(item.id == this.area_id1 || item.id == this.area_id2 || 
             item.id == this.area_id3 ||  item.id == this.area_id4){
            name += item.region_name;
          }
        }
      } 
      if(isAdd){
        this.form.mergerName = name; 
      }else{
        this.form2.mergerName = name; 
      }
    },


    save() {
      let _this = this;
      this.$refs['form'].validate((valid) => {
        if (!valid) {
            return;
        }

        let user = {
          phone: this.form.phone,
          name: this.form.name,
          password: this.form.password,
          area_id: this.form.area_id,
          mergerName: this.form.mergerName
        };

        this.$confirm('确认提交信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 判断添加还是更新
          userManagerService.addUser(user, res => {
            console.log(res);
            this.$message({
              type: 'success',
              message: '提交成功!'
            });
            this.handleClose();
            _this.$emit('clickName', true);
          });   
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
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
#user-system-edit /deep/ .el-input__inner {
  border: none !important;
  border-bottom: 1px solid #CCC !important;
  border-radius: 0;
}

</style>
