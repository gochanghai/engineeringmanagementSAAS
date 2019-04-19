<template>
  <div id="registration">
    <div class="content">
      <span class="back" @click="$router.back()">
        <i class="el-icon-arrow-left"></i>
        返回登录
      </span>
      <div class="form" style="margin-top: 16px;">
        <label>企业注册</label>
        <el-form
          label-width="125px"
          label-position="left"
          size="mini"
          :model="form"
          :rules="rules"
          ref="form"
          status-icon
          style="flex: 1;margin-top: 20px;"
        >
          <el-form-item label="企业名称" prop="name">
            <el-input v-model="form.name" clearable placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="企业证件号码" prop="code">
            <div style="display: flex;">
              <el-select
                v-model="form.code_type"
                placeholder="请选择"
                style="margin-right: 5px;"
                disabled
              >
                <el-option
                  v-for="(item, index) in companyCodeType"
                  :key="index"
                  :label="item"
                  :value="item"
                />
              </el-select>
              <el-input v-model="form.code" clearable placeholder="请输入"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="企业证件地址" prop="region_address">
            <el-input v-model="form.region_address" clearable placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="所属区域" prop="area_id">
            <div style="display: flex;">
              <el-select v-model="form.address1" placeholder="省" style="margin-right: 5px;">
                <el-option
                  v-for="(item, index) in addressList1"
                  :key="index"
                  :label="item.region_name"
                  :value="item.id"
                />
              </el-select>
              <el-select v-model="form.address2" placeholder="市" style="margin-right: 5px;">
                <el-option
                  v-for="(item, index) in addressList2"
                  :key="index"
                  :label="item.region_name"
                  :value="item.id"
                />
              </el-select>
              <el-select v-model="form.address3" placeholder="区" style="margin-right: 5px;">
                <el-option
                  v-for="(item, index) in addressList3"
                  :key="index"
                  :label="item.region_name"
                  :value="item.id"
                />
              </el-select>
            </div>
            <el-select
              v-model="form.address4"
              placeholder="街道"
              style="width:124px;margin-top: 10px;"
            >
              <el-option
                v-for="(item, index) in addressList4"
                :key="index"
                :label="item.region_name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="法定代表人姓名" prop="representative">
            <el-input v-model="form.representative" clearable placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="法定代表人证件" prop="id_card">
            <div style="display: flex;">
              <el-select v-model="form.idcard_type" placeholder="请选择" style="margin-right: 5px;">
                <el-option
                  v-for="(item, index) in userCodeType"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
              <el-input v-model="form.id_card" clearable placeholder="请输入"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="法定人手机号" prop="phone">
            <el-input v-model="form.phone" clearable placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="登录密码" prop="password">
            <el-input type="password" v-model="form.password" clearable placeholder="请输入6-20个字母、数字、下划线"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input type="password" v-model="form.password2" clearable placeholder="请输入6-20个字母、数字、下划线"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="form" style="margin-top: 15px;">
        <label>经办人信息</label>
        <el-form
          label-width="110px"
          label-position="left"
          size="mini"
          :model="form2"
          :rules="rules2"
          ref="form2"
          status-icon
          style="flex: 1;margin-top: 20px;"
        >
          <el-form-item label="经办人姓名" prop="agent_name">
            <el-input v-model="form2.agent_name" clearable placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="经办人证件" prop="agent_idcard">
            <div style="display: flex;">
              <el-select
                v-model="form2.agent_idcard_type"
                placeholder="请选择"
                style="margin-right: 5px;"
              >
                <el-option
                  v-for="(item, index) in userCodeType"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
              <el-input v-model="form2.agent_idcard" clearable placeholder="请输入"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="图形验证码" prop="checkCode">
            <div style="display: flex;">
              <el-input v-model="form2.checkCode" clearable placeholder="请输入"></el-input>
              <div id="checkCode" class="code" @click="createCode(6)"></div>
              <el-button type="text" size="small" @click="createCode(6)">看不清楚, 换一张</el-button>
            </div>
          </el-form-item>
          <el-form-item label="经办人手机号" prop="agent_phone">
            <el-input v-model="form2.agent_phone" clearable placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-button class="edit" size="medium" @click="save">完 成</el-button>
    </div>
  </div>
</template>
<script>
const registerCompanyService = require("../../service/registerCompanyService.js");
const areaService = require("../../service/areaService.js");
export default {
  data() {
    var checkName = (rule, value, callback) => {
      if (value === null) {
        callback(new Error("企业名称不能为空"));
      } else {
        // 正则表达式校验
        // var reg = /^[\dA-Z]{18}$/;
        if (1) {
          registerCompanyService.checkCompanyName(value, res => {
            if (2 == res.code) {
              callback(new Error("企业名称已被使用"));
            } else {
              callback();
            }
          });
        }
        // callback();
      }
    };
    var checkCreditCode = (rule, value, callback) => {
      if (value === null) {
        callback(new Error("统一社会信用代码不能为空"));
      } else {
        // 正则表达式校验
        var reg = /^[\dA-Z]{18}$/;
        if (!reg.test(value)) {
          callback(new Error("请输入正确统一社会信用代码"));
        } else {
          registerCompanyService.checkCreditCode(value, res => {
            if (2 == res.code) {
              callback(new Error("此代码已被使用"));
            } else {
              callback();
            }
          });
        }
        // callback();
      }
    };
    var checkidcard = (rule, value, callback) => {
      if (value === null) {
        callback(new Error("证件号不能为空"));
      } else {
        // 正则表达式校验
        // 身份证
        var reg1 = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
        var reg2 = /^[a-zA-Z0-9]{5,21}$/; //港澳通行证
        var reg3 = /^[a-zA-Z0-9]{3,21}$/; //护照
        if (!reg1.test(value)) {
          callback(new Error("证件号不能不正确"));
        }
        if (!reg2.test(value)) {
          callback(new Error("证件号不能不正确"));
        }
        if (!reg3.test(value)) {
          callback(new Error("证件号不能不正确"));
        }
        callback();
      }
    };
    var checkPhone1 = (rule, value, callback) => {
      if (value === null) {
        callback(new Error("手机号不能为空"));
      } else {
        // 正则表达式校验
        var reg = /^1[34578]\d{9}$/;
        if (!reg.test(value)) {
          callback(new Error("请输入正确的手机号"));
        } else {
          registerCompanyService.checkPhone(value, res => {
            if (2 == res.code) {
              callback(new Error("此号码已被使用"));
            } else {
              callback();
            }
          });
        }
        // callback();
      }
    };
    var checkPhone2 = (rule, value, callback) => {
      if (value === null) {
        callback(new Error("手机号不能为空"));
      } else {
        // 正则表达式校验
        var reg = /^1[34578]\d{9}$/;
        if (!reg.test(value)) {
          callback(new Error("请输入正确的手机号"));
        }
        callback();
      }
    };
    var checkCode = (rule, value, callback) => {
      if (value != this.code) {
        callback(new Error("验证码不正确"));
      } else {
        callback();
      }
    };    
    var checkPassword = (rule, value, callback) => {
      var reg = /^(\w){6,20}$/; 
      if (!reg.test(value)) {
        callback(new Error('请输入6-20个字母、数字、下划线'));
      } else {
        callback();
      }
    };
    var checkPassword2 = (rule, value, callback) => {
      var reg = /^(\w){6,20}$/; 
      if (!reg.test(value)) {        
        callback(new Error('请输入6-20个字母、数字、下划线'));
      }else{
        if (value != this.form.password) {
          callback(new Error('确认密码和登录密码不一致'));
        } else {        
          callback();
        }        
      }      
    };
    return {
      companyCodeType: ["统一社会信用代码", "港澳通行证", "护照"],
      userCodeType: ["二代居民身份证", "港澳通行证", "护照"],
      addressList1: [],
      addressList2: [],
      addressList3: [],
      addressList4: [],
      code: "",
      form: {
        name: "",
        code: "",
        code_type: "统一社会信用代码",
        region_address: "",
        address: "",
        address1: "",
        address2: "",
        address3: "",
        address4: "",
        idcard_type: "",
        id_card: "",
        representative: "",
        phone: "",
        password: "",
        password2: "",
        userID: null,
        area_id: null
      },
      form2: {
        agent_name: "",
        agent_idcard: "",
        agent_idcard_type: "",
        agent_phone: "",
        checkCode: ""
      },
      rules: {
        code_type: [
          { required: true, message: '证件类型不能为空', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '企业信用代码不能为空', trigger: 'blur' },
          { validator: checkCreditCode, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '企业名称不能为空', trigger: 'blur' },
          { validator: checkName, trigger: 'blur' }
        ],
        region_address: [
          { required: true, message: '注册地址不能为空', trigger: 'blur' }
        ],
        area_id: [
          { required: true, message: '所属区域不能为空', trigger: 'blur' }
        ],
        address2: [
          { required: true, message: '所属区域不能为空', trigger: 'blur' }
        ],
        address3: [
          { required: true, message: '所属区域不能为空', trigger: 'blur' }
        ],
        idcard_type: [
          { required: true, message: '证件类型不能为空', trigger: 'blur' }
        ],
        id_card: [
          { required: true, message: '证件号不能为空', trigger: 'blur' },
          { validator: checkidcard, trigger: 'blur' }
        ],
        representative: [
          { required: true, message: '法定代表人不能为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: checkPhone1, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '登录密码不能为空', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          { validator: checkPassword2, trigger: 'blur' }
        ], 
      },
      rules2: {
        agent_name: [
          { required: true, message: "经办人姓名不能为空", trigger: "blur" }
        ],
        agent_idcard: [
          { required: true, message: "经办人证件号不能为空", trigger: "blur" },
          { validator: checkidcard, trigger: "blur" }
        ],
        agent_idcard_type: [
          { required: true, message: "证件类型不能为空", trigger: "blur" }
        ],
        agent_phone: [
          { required: true, message: "经办人手机号不能为空", trigger: "blur" },
          { validator: checkPhone2, trigger: "blur" }
        ],
        checkCode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { validator: checkCode, trigger: "blur" }
        ]
      }
    };
  },

  created() {
    let _this = this;
    registerCompanyService.registBerfor(res => {
      console.log(res);      
    });
    setTimeout(function() {
      _this.getAddressList1();
      _this.createCode(6);
    }, 1000);
  },

  watch: {
    "form.address1": function(value) {
      this.form.address2 = "";
      this.form.address3 = "";
      this.form.address4 = "";
      let fid = null;
      this.getAddressList2(value);
      this.addressList3 = [];
      this.addressList4 = [];
      this.setAreaId();
    },
    "form.address2": function(value) {
      this.form.address3 = "";
      this.form.address4 = "";
      let fid = null;
      this.getAddressList3(value);
      this.setAreaId();
    },
    "form.address3": function(value) {
      this.getAddressList4(value);
      this.setAreaId();
    },
    "form.address4": function(value) {
      this.setAreaId();
    }
  },

  methods: {
    //生成验证码的方法
    createCode(length) {
      var code = "";
      var codeLength = parseInt(length); //验证码的长度
      var checkCode = document.getElementById("checkCode");
      // 所有候选组成验证码的字符，当然也可以用中文的
      var codeChars = new Array(
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      );
      //循环组成验证码的字符串
      for (var i = 0; i < codeLength; i++) {
        //获取随机验证码下标
        var charNum = Math.floor(Math.random() * 62);
        //组合成指定字符验证码
        code += codeChars[charNum];
      }
      // console.log(code);
      if (checkCode) {
        //为验证码区域添加样式名
        checkCode.className = "code";
        //将生成验证码赋值到显示区
        checkCode.innerHTML = code;
      }
      this.code = code;
    },

    /**
     * 获取省份信息
     */
    getAddressList1() {
      areaService.getProvinceList(res => {
        console.log(res);
        if (-1 === res.code) {
          this.$router.go(0);
        }
        this.addressList1 = res.list;
      });
    },

    /**
     * 获取城市信息
     */
    getAddressList2(fid) {
      areaService.getChildAreasList(fid, res => {
        console.log(res);
        this.addressList2 = res.list;
      });
    },

    /**
     * 获取县区信息
     */
    getAddressList3(fid) {
      areaService.getChildAreasList(fid, res => {
        console.log(res);
        this.addressList3 = res.list;
      });
    },

    /**
     * 获取街道信息
     */
    getAddressList4(fid) {
      areaService.getChildAreasList(fid, res => {
        console.log(res);
        this.addressList4 = res.list;
      });
    },

    /**
     * 获取临近区域ID
     */
    setAreaId() {
      let _this = this;
      if (_this.form.address4) {
        _this.form.area_id = _this.form.address4;
        return;
      }
      if (_this.form.address3) {
        _this.form.area_id = _this.form.address3;
        return;
      }
      if (_this.form.address2) {
        _this.form.area_id = _this.form.address2;
        return;
      }
      _this.form.area_id = _this.form.address1;
    },

    /**
     * 注册按钮处理函数
     */
    save() {
      let _this = this;
      this.$refs["form"].validate(valid1 => {
        this.$refs["form2"].validate(valid2 => {
          if (!valid1 && !valid2) {
            return;
          }
          let company = this.form;
          company.agent_name = this.form2.agent_name;
          company.agent_idcard = this.form2.agent_idcard;
          company.agent_idcard_type = this.form2.agent_idcard_type;
          company.agent_phone = this.form2.agent_phone;
          // 保存数据
          registerCompanyService.registration(company, res => {
            console.log(res);
            this.$message.success("注册成功");
            setTimeout(function() {
              _this.$refs["form"].resetFields();
              _this.$refs["form2"].resetFields();
              _this.backLogin();
            }, 1000);
          });
          console.log(company);
        });
      });
    },
    /**
     * 返回登录
     */
    backLogin() {
      this.$router.back(-1);
    }
  }
};
</script>
<style scoped>
#registration {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #f2f4f6;
  overflow: auto;
}

.content {
  margin-top: 15px;
  position: absolute;
  left: 50%;
  margin-left: -275px;
  width: 550px;
}

.form {
  background: #fff;
  padding: 20px;
}

.form label {
  color: #007ed7;
}

.back {
  display: block;
  width: 90px;
  margin-left: 26px;
  padding: 2px 2px 2px 0px;
  text-align: center;
  font-size: 13px;
  color: #1b88f5;
  border: 1px solid;
  border-radius: 5px;
}

.back:hover {
  cursor: pointer;
  background-color: #007ed7;
  border: 1px solid #007ed7;
  color: #fff;
  transition: all 0.4s ease;
}

.edit {
  display: block;
  margin: 0 auto;
  margin-top: 28px;
  background-color: #007ed7;
  color: #fff;
}
</style>
<style>
#registration /deep/ .el-input__inner {
  border: none !important;
  border-bottom: 1px solid #ccc !important;
  border-radius: 0;
}

.code {
  padding: 0 4px;
  margin-left: 5px;
  margin-right: 6px;
  width: 86px;
  height: 26px;
  font-family: Arial;
  font-style: italic;
  color: blue;
  font-size: 15px;
  border: 0;
  padding: 2px 0px;
  letter-spacing: 3px;
  font-weight: bolder;
  float: left;
  cursor: pointer;
  line-height: 36px;
  text-align: center;
  vertical-align: middle;
  background-color: #cac8c8;
}

.code img {
  width: 100%;
  height: 100%;
}
</style>
