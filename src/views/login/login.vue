<template>
    <div class="Login" style="overflow: hidden;background-color: rgba(84,92,98,0.58);height: 100%;">
        <div class="formBor" style="background-color: white">
            <h2 style="color: rgb(96, 98, 102);font-size: 18px;margin-bottom: 10px">欢迎来到拼少少后台管理系统</h2>
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名：" style="margin-left: 45px;margin-top: 20px">
                    <el-input v-model="form.username" class="inputSize" clearable style="margin-left: -15%"
                    size="small" placeholder="请输入用户名"
                    ></el-input>
                </el-form-item>
                <el-form-item label="密码：" style="margin-left: 45px;">
                    <el-input v-model="form.password" class="inputSize" style="margin-left: -15%"
                              size="small" clearable type="password" placeholder="请输入密码"
                    ></el-input>
                </el-form-item>
                <el-form-item style="margin-left: -35px">
                    <el-button type="primary" @click="onSubmit" style="margin-right: 40px;width: 70%;margin-top: 20px">登录</el-button>
                    <!--<el-button>取消</el-button>-->
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>

  export default {
    name: "login",
    data() {
      return {
        form: {
          username: '',
          password: '',
        }
      }
    },
    created(){
      // this.$session.set("key",'test1111'); //存session
      // console.log(this.$session.get("key"))
    },
    methods: {
      onSubmit() {
        // console.log('submit!');
        // console.log(this.$data.form.username)
        // console.log(this.$data.form.password)
        // var RequsetUrl='http://172.16.14.10:8080';
        this.$axios({
          url:this.$host+"/groupmall/admin/adminLogin",
          // url:RequsetUrl+"/groupmall/admin/adminLogin",
          method:'post',
          headers:{"Content-Type":"application/x-www-form-urlendcoded"},
          access_token:this.token,
          // dataType:'JSONP',
          // crossDomain: true,
          params:{
            admin_name:this.$data.form.username,
            admin_pwd:this.$data.form.password
          }
        }).then(resp=>{
          console.log(resp.data)
          if(resp.data=="{status:false}"){
            this.$alert("登录失败！", "提示", {
              confirmButtonText: "确定",
              callback: action => {

              }
            });
          }else {
            // console.log(resp.data)
            // console.log(resp.data.split(",")[1].split(":")[1])
            // console.log(resp.data.split("adminId:")[1].split("}")[0]);
            // console.log(resp.data.split("adminId:")[1].split("}")[0])
            sessionStorage.setItem("myUserId",resp.data.split(",")[1].split(":")[1]);
            sessionStorage.setItem("myPromotion",resp.data.split(",")[2].split(":")[1].split("}")[0]);
            sessionStorage.setItem("myUserName",this.$data.form.username);
            this.$router.push("/")

          }
        })
      }
    }
  }
</script>

<style scoped>
    /*html{*/
        /*width: 100%;*/
        /*height: 100%;*/
        /*padding: 0;*/
        /*margin: 0;*/
    /*}*/
    /*body{*/
        /*width: 100%!important;*/
        /*height: 100%!important;*/
        /*padding: 0;*/
        /*margin: 0;*/
    /*}*/
    .Login{
        /*width: 100%!important;*/
        /*height: 100%!important;*/
        /*background-color: #545c62;*/
        /* style="background-image:url('../../assets/back1.jpg');background-size: cover" */
        /*background-image: url('../../assets/back11.jpg');*/
        /*background-size: cover;*/
    }
.formBor{
    width: 400px;
    height: 260px;
    border: 1px solid #ddd;
    text-align: center;
    padding-top:15px;
    /*margin-left: 50%;*/
    /*margin-top: 12%;*/
    margin: 12% auto;

}
    .inputSize{
        width: 70%;
    }
</style>