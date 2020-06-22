<template>
    <div class="login">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <h3><i class="el-icon-star-off"></i>vuex练习用户名</h3>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginForm('ruleForm')">提交</el-button>
          <el-button @click="registerForm('ruleForm')">注册</el-button>
        </el-form-item>
      </el-form>
     </div>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      loginForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //登录
            this.$axios.post("/api/login",{
              username : this.ruleForm.username,
              password : this.ruleForm.password
            }).then((res)=>{
              if(res.data.error){  //如果返回1 则用户存在 登录失败
                this.$message.error('该用户不存在，请先注册！');//element-ui的消息列表插件
                return;
              }
              this.$message({
                message:'恭喜你，登录成功',
                type:"success"
              })
              this.$router.push({
                path:'/admin'
              })
              this.$store.commit('saveLoginUser',this.ruleForm.username)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      registerForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //注册
            this.$axios.post("/api/register",{
              username : this.ruleForm.username,
              password : this.ruleForm.password
            }).then((res)=>{
              if(res.data.error){  //如果返回1 则用户不存在 失败
                this.$message.error('用户名已存在，注册失败！');//element-ui的消息列表插件
                return;
              }
              this.$message({
                message:'恭喜你，注册成功，去登录吧！',
                type:"success"
              })
            })
          } else {

            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
  .login{
    position: fixed;
    left: 0;
    right:0;
    top: 0;
    bottom: 0;
    width: 500px;
    height: 250px;
    padding:20px 30px 40px 0;
    margin: auto;
    box-shadow: 0 0 10px 0 blue;
  }
  .login h3{
    border-radio:4px;
    margin:20px;
    text-align: center;
    font-size:28px;
  }
</style>
