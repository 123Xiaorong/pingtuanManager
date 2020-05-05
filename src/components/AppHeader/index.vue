<template>
  <div class="header">
    <a href="/">
      <img class="logo" src="@/assets/logo.png" width="25px" alt />
      <span class="company">拼少少商城管理系统</span>
    </a>
    <!--<span style="position: relative;left: 70%">-->
      <!--<span style="color:white; margin-right:20px;font-size: 14px">您好:&nbsp;{{myName}}</span>-->
    <!--&lt;!&ndash;<a href="#">设置&nbsp;&nbsp;</a>&ndash;&gt;-->
    <!--&lt;!&ndash;<a href="#">&nbsp;&nbsp;更新站点缓存&nbsp;&nbsp;</a>&ndash;&gt;-->
    <!--</span>-->
      <el-dropdown>
        <span class="el-dropdown-link">
          您好:&nbsp;{{myName}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-edit" command="a">修改密码</el-dropdown-item>
          <el-dropdown-item icon="el-icon-s-fold" command="b" @click.native="Exit()">退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myName:'AdminAdmin'
    };
  },

  components: {},
  created(){
    // console.log(sessionStorage.getItem("myUserName"));
    this.$data.myName=sessionStorage.getItem("myUserName");
  },
  methods: {
    Exit(){
      // console.log(11);
      sessionStorage.setItem("myUserId",'');
      sessionStorage.setItem("myUserName",'');
      sessionStorage.setItem("myPromotion",'');
      this.$router.push("/login")
    }
  }
};
</script>

<style scoped>
.logo {
  vertical-align: middle;
  padding: 0 10px 0 40px;
  /* background-color: red; */
}
.company {
  position: absolute;
  color: white;
}

.el-dropdown {
  float: right;
  margin-right: 40px;
}
.el-dropdown-link {
  color: white;
  cursor: pointer;
}
a {
  text-decoration: none;
  color: white;
}
</style>