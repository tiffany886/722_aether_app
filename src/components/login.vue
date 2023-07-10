<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
        <img src="../assets/user_pic.jpg" alt="" />
      </div>
      <!-- 表单区域 -->
      <!-- model用于数据绑定所有的表单的对象 -->
      <el-form
        label-width="0px"
        class="login_form"
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            prefix-icon="iconfont icon-user"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            type="password"
            prefix-icon="iconfont icon-password"
            v-model="loginForm.password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AetherAppLogin",

  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456",
      },
      // 验证密码是否合法
      loginFormRules: {
        username: [
          {
            required: true,
            message: "请输入登录名称",
            trigger: "blur",
          },
          {
            min: 2,
            max: 10,
            message: "长度在2-10之间",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            min: 1,
            max: 6,
            message: "长度在1-6之间",
            trigger: "blur",
          },
        ],
      },
    };
  },

  mounted() {},

  methods: {
    resetLoginForm() {
      // 组件实例
      console.log(this);
      // 通过组件可以找到ref获取到引用对象
      // 调用elementui的方法进行重置
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      // 表单登录之前的预验证
      // 返回的是promise则可以用await和async进行异步封装
      this.$refs.loginFormRef.validate(async (valid) => {
        // 是一个布尔值 用来表示是否通过了前面的校验
        // console.log(valid);//true
        // 返回false表示没有通过验证 则直接返回即可
        if (!valid) return;
        // 通过验证 则发送登录请求 将返回的数据结构给res
        const { data: res } = await this.$http.post("login", this.loginForm);
        console.log(res);
        // 判断状态码 
        if(res.meta.status!==200) return this.$message.error("登录失败！！")
        this.$message.success("登录成功！！")
        // 1. 将登录成功的token，保存到客户端的sessionStorage中
        //     1. 项目中除了登录之外的接口，都要在登录之后才能访问
        //     2. token只在当前网站打开期间生效，所以将token保存在sessionStorage中
        // 2. 通过编程式导航跳转到后台主页，路由地址式/home
        window.sessionStorage.setItem("token",res.data.token);
        this.$router.push("/home");
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  //   background-color: #f38888;
  background-color: #264a6b;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  .avatar_box {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    transform: translateY(-50%);
    /* overflow: hidden; */
    border-radius: 50%;
    border: 1px solid #eee;
    box-shadow: 0 0 10px #ddd;
    padding: 10px;
    background-color: #fff;
    img {
      border-radius: 50%;
      width: 100%;
    }
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.login_form {
  padding: 0 20px;
}
</style>
