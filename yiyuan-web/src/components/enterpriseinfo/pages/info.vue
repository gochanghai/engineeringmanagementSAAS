<template>
  <div id="info">
    <div class="content" v-if="isToogle">
      <div class="information">
        <div class="form">
          <label>注册信息</label>
          <el-form label-width="120px" label-position="left" size="small" :model="infoList" style="flex: 1">
            <el-form-item label="企业名称" prop="name">
              <el-input v-model="infoList.name" clearable disabled></el-input>
            </el-form-item>
            <el-form-item label="企业信用代码" prop="credit_code">
              <el-input v-model="infoList.credit_code" clearable disabled></el-input>
            </el-form-item>
            <el-form-item label="法定代表人" prop="representative">
              <el-input v-model="infoList.representative" clearable disabled></el-input>
            </el-form-item>
            <el-form-item label="注册资本" prop="registered_capital">
              <el-input v-model="infoList.registered_capital" clearable disabled></el-input>
            </el-form-item>
            <el-form-item label="注册时间" prop="established_time">
              <el-input v-model="infoList.established_time" clearable disabled></el-input>
            </el-form-item>
            <el-form-item label="注册地址" prop="address">
              <el-input v-model="infoList.address" clearable disabled></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="form">
          <label>管理信息</label>
          <el-form label-width="120px" label-position="left" size="small" ref="form1" :model="form1" :rules="rules1" style="flex: 1">
            <el-form-item label="主要负责人" prop="principal">
              <el-input v-model="form1.principal" clearable></el-input>
            </el-form-item>
            <el-form-item label="职工人数" prop="worker_num">
              <el-input v-model="form1.worker_num" clearable></el-input>
            </el-form-item>
            <el-form-item label="安全管理人数" prop="manage_num">
              <el-input v-model="form1.manage_num" clearable></el-input>
            </el-form-item>
            <el-form-item label="安全管理人员" prop="safety_manager">
              <el-input v-model="form1.safety_manager" clearable></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="form1.tel_phone" clearable></el-input>
            </el-form-item>
            <el-form-item label="传真" prop="fax">
              <el-input v-model="form1.fax" clearable></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div style="border:1px solid #eee;margin-bottom: 24px;margin-top: 8px;"></div>
      <div class="information">
        <div class="form" style="width: 100%">
          <label>经营信息</label>
          <el-form label-width="120px" label-position="left" size="small" ref="form2" :model="form2" :rules="rules2" style="flex: 1">
            <el-form-item label="经营信息" prop="business_type">
              <el-checkbox-group v-model="form2.business_type" @change="handleCheckedChange">
                <el-checkbox v-for="item in cities" :label="item" :key="item">{{item}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="固定资产" prop="fixed_assets">
              <el-input v-model="form2.fixed_assets" clearable></el-input>
            </el-form-item>
            <el-form-item label="去年营业额" prop="last_year_turnover">
              <el-input v-model="form2.last_year_turnover" clearable></el-input>
            </el-form-item>
            <el-form-item label="建筑面积" prop="covered_area">
              <el-input v-model="form2.covered_area" clearable></el-input>
            </el-form-item>
            <el-form-item label="主要产品" prop="main_products">
              <el-input type="textarea" v-model="form2.main_products" :rows="4" clearable></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div style="display: flex;width: 280px;margin: 8px auto;">
        <el-button size="medium" class="close" @click="isToogle=false">取 消</el-button>
        <el-button class="edit" size="medium" @click="save">确 定</el-button>
      </div>
    </div>
    <div class="content" v-else>
      <div class="information">
        <div class="form">
          <label>注册信息</label>
          <el-form label-width="120px" label-position="left" size="small" :model="infoList" style="flex: 1">
            <el-form-item label="企业名称" prop="name">
              <span>{{infoList.name}}</span>
            </el-form-item>
            <el-form-item label="企业信用代码" prop="credit_code">
              <span>{{infoList.credit_code}}</span>
            </el-form-item>
            <el-form-item label="法定代表人" prop="representative">
              <span>{{infoList.representative}}</span>
            </el-form-item>
            <el-form-item label="注册资本" prop="registered_capital">
              <span>{{infoList.registered_capital}}万元</span>
            </el-form-item>
            <el-form-item label="注册时间" prop="established_time">
              <span>{{infoList.established_time}}</span>
            </el-form-item>
            <el-form-item label="注册地址" prop="address">
              <span>{{infoList.address}}</span>
            </el-form-item>
          </el-form>
        </div>
        <div class="form">
          <label>管理信息</label>
          <el-form label-width="120px" label-position="left" size="small" :model="infoList" style="flex: 1">
            <el-form-item label="主要负责人" prop="principal">
              <span>{{infoList.principal}}</span>
            </el-form-item>
            <el-form-item label="职工人数" prop="worker_num">
              <span>{{infoList.worker_num}}人</span>
            </el-form-item>
            <el-form-item label="安全管理人数" prop="manage_num">
              <span>{{infoList.safety_manager}}</span>
            </el-form-item>
            <el-form-item label="安全管理人员" prop="safety_manager">
              <span>{{infoList.manage_num}}</span>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
              <span>{{infoList.tel_phone}}</span>
            </el-form-item>
            <el-form-item label="传真" prop="fax">
              <span>{{infoList.fax}}</span>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div style="border:1px solid #eee;margin-bottom: 24px;margin-top: 8px;"></div>
      <div class="information">
        <div class="form" style="width: 100%">
          <label>经营信息</label>
          <el-form label-width="120px" label-position="left" size="small" :model="infoList" style="flex: 1">
            <el-form-item label="经营信息">
              <el-checkbox-group v-model="infoList.business_type">
                <el-checkbox v-for="item in cities" :label="item" :key="item" :disabled="true">{{item}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="固定资产">
              <span>{{infoList.fixed_assets}}万元</span>
            </el-form-item>
            <el-form-item label="去年营业额">
              <span>{{infoList.last_year_turnover}}万元</span>
            </el-form-item>
            <el-form-item label="建筑面积">
              <span>{{infoList.covered_area}}平方</span>
            </el-form-item>
            <el-form-item label="主要产品">
              <span>{{infoList.main_products}}</span>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div style="display: flex;width: 280px;margin: 8px auto;">
        <el-button class="edit" size="medium" @click="isToogle = true">编 辑</el-button>
      </div>
    </div>
    <div class="QR-code">
      <img :src="qrcodeUrl" width="106" height="102">
      <!-- <div class="qrcode" id="qrcode"></div> -->
      <span>扫一扫可以在手机上查看哦~</span>
    </div>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2';
const companyService = require('../../../service/companyService.js');
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (value === null) {
        callback(new Error('联系方式不能为空'));
      } else {
        // 正则表达式校验
        var reg=/^1[34578]\d{9}$/;
        if (!reg.test(value)) {
          callback(new Error('请输入正确的手机号'));
        }
        callback();
      }
    };
    var checknumber = (rule, value, callback) => {
      // 正则表达式校验
      var reg = /(^[\-0-9][0-9]*(.[0-9]+)?)$/;
      if(!reg.test(value)){
        callback(new Error('只能是数字'));
      }
      if (value < 0) {
        callback(new Error('数量不能小于0'));
      }
      callback(); 
    }
    return {
      infoList: {
        credit_code: '',
        name: '',
        address: '',
        phone: '',
        fax: '',
        representative: '',
        worker_num: '',
        manage_num: '',
        established_time: '',
        covered_area: '',
        principal: '',
        registered_capital: '',
        fixed_assets: '',
        last_year_turnover: '',
        main_products: "",
        safety_manager: "",
        tel_phone: '',
        business_type: ["有限空间", "粉尘涉爆",]
      },
      form1:{
        principal: '',
        worker_num: '',
        safety_manager: '',
        manage_num: "",
        tel_phone: '',
        fax: '',
      },
      form2:{
        covered_area: '',
        fixed_assets: '',
        last_year_turnover: '',
        main_products: "",
        business_type: []
      },
      cities: ["有限空间", "粉尘涉爆", "危险化学品", "涉氢", "锂电池", "特种设备", "其他"],
      isToogle: false,

      rules1: {
        worker_num: [
          { required: true, message: '职工人数不能为空', trigger: 'blur' },
          { validator: checknumber, trigger: 'blur' }
        ],
        manage_num: [
          { required: true, message: '安全管理人数不能为空', trigger: 'blur' },
          { validator: checknumber, trigger: 'blur' }
        ],
        safety_manager: [
          { required: true, message: '安全管理人数不能为空', trigger: 'blur' },
          { validator: checknumber, trigger: 'blur' }
        ],
        principal: [
          { required: true, message: '主要负责人不能为空', trigger: 'blur' }
        ],
      },
      rules2: {
        business_type: [
          { required: true, message: '经营信息不能为空', trigger: 'blur' }
        ],
        covered_area: [
          { required: true, message: '建筑面积不能为空', trigger: 'blur' },
          { validator: checknumber, trigger: 'blur' }
        ],
        fixed_assets: [
          { required: true, message: '固定资产不能为空', trigger: 'blur' },
          { validator: checknumber, trigger: 'blur' }
        ],
        last_year_turnover: [
          { required: true, message: '去年营业额不能为空', trigger: 'blur' },
          { validator: checknumber, trigger: 'blur' }
        ],
        main_products: [
          { required: true, message: '主要产品不能为空', trigger: 'blur' }
        ]
      },
      qrcodeUrl:'http://qr.liantu.com/api.php?text=http://www.aliyun.com',
    }
  },
  created() {
    var _this = this;
    this.getInfo();
  },

  methods: {
    edit() {
      this.isToogle = true;
    },

    cancel() {
      this.isToogle = false;
    },
    
    handleCheckedChange(value) {
      // let checkedCount = value.length;
      // this.infoList.business_type = value;
      // this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },

    /**
     * 生成二维码
     */
    qrcode() {
      let qrcode = new QRCode('qrcode', {
        width: 106,  
        height: 102,
        text: 'https://www.aliyun.com', // 二维码地址
        colorDark : "#000",
        colorLight : "#fff",
        image: ''
      })
      console.log(qrcode)
    },

    /**
     * 获取企业信息
     */
    getInfo() {
      let _this = this;      
      companyService.getCompanyInfo(res => {
        if (1 == res.code && null !=res.company ) {
          console.log(res);
          var str = res.company.business_type.substring(1,res.company.business_type.length-1);
          str = str.replace(/\"/g, "");  
          var strs= new Array();
          strs = str.split(",");
          _this.infoList = res.company;
          _this.infoList.business_type= strs;
          _this.form1.principal= res.company.principal;
          _this.form1.worker_num= res.company.worker_num;
          _this.form1.safety_manager= res.company.safety_manager;
          _this.form1.manage_num= res.company.manage_num;
          _this.form1.tel_phone= res.company.tel_phone;
          _this.form1.fax= res.company.fax;
          _this.form2.business_type= strs;
          _this.form2.covered_area= res.company.covered_area;
          _this.form2.fixed_assets= res.company.fixed_assets;
          _this.form2.last_year_turnover= res.company.last_year_turnover;
          _this.form2.main_products= res.company.main_products;   
          _this.form2.group_no= res.company.group_no;  
          _this.qrcodeUrl += '?credit_code=' + res.company.credit_code;        
          // _this.qrcode();
        }
      });      
    },

    /**
     * 保存数据
     */
    save(){
      let company = this.form2;
      company.principal = this.form1.principal;
      company.worker_num = this.form1.worker_num;
      company.safety_manager = this.form1.safety_manager;
      company.manage_num = this.form1.manage_num;
      company.tel_phone = this.form1.tel_phone;
      company.fax = this.form1.fax;
      this.$refs['form1'].validate((valid1) => {
        this.$refs['form2'].validate((valid2) => {
          if (!valid1 && !valid2) {
            return;
          }
          companyService.updateCompanyInfoById(company, res => {
            if (1 == res.code) {
              this.$message.success("数据保存成功");
              this.getInfo();
              this.isToogle = false;
            }
          })
        });
      });      
    }
  }
}

</script>
<style scoped>
#info {
  display: flex;
  height: calc(100% - 0px);
}

.information {
  display: flex;
  justify-content: space-between;
}

.form {
  width: 46%;
  display: flex;
}

.form>label {
  padding-right: 44px;
  line-height: 32px;
  font-size: 13px;
  color: #1B88F5;
}

.content {
  padding: 25px 22px 42px 32px;
  flex: 1;
  background-color: #fff;
}

.QR-code {
  margin-top: 20px;
  width: 260px;
  height: 135px;
  text-align: center;
}

.QR-code span {
  display: block;
  line-height: 25px;
  color: #aaa;
  font-size: 14px;
}
.qrcode{
 width: 106px;
 padding-left: 77px;
 padding-bottom: 10px;
}
.edit {
  display: block;
  margin: 0 auto;
  background-color: #007ED7;
  color: #fff;
}

.close {
  display: block;
  margin: 0 auto;
}

</style>
