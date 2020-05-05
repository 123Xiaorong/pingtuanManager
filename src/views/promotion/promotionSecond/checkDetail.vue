<template>
  <div class="managerDetail">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="管理员姓名">
        <el-input
          v-model="form.name"
          disabled
          style="width:80%"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item label="管理员密码">
        <el-input
          v-model="form.password"
          disabled
          style="width:80%"
          size="small"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="管理员电话">
        <el-input
          v-model="form.telphone"
          disabled
          style="width:80%"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item label="管理员角色">
        <el-select
          v-model="form.role"
          disabled
          placeholder="请选择管理员角色"
          size="small"
          style="width:80%"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      form: {
        name: "",
        password: "",
        telphone: "",
        role: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  },
  created() {
    // let targetId=sessionStorage.getItem("targetId");
    // this.$axios.get("http://172.16.14.10:8080/groupmall/admin/selectAllAdmin");
    (() => {
      setInterval(() => {
        // console.log(typeof sessionStorage.getItem("targetId"));
        // if (Number(sessionStorage.getItem("targetId")) !== Number("0")) {
          // console.log(sessionStorage.getItem("targetId"));
          // console.log(JSON.parse(sessionStorage.getItem("allData")));
          for (
            let i = 0;
            i < JSON.parse(sessionStorage.getItem("allData")).length;
            i++
          ) {
            if (
              String(JSON.parse(sessionStorage.getItem("allData"))[i].adminId) ===
              String(sessionStorage.getItem("targetId"))
            ) {
              // console.log("check"+"========");
              // console.log(JSON.parse(sessionStorage.getItem("allData"))[i]);
              // console.log(typeof JSON.parse(sessionStorage.getItem("allData"))[i].username);
              this.$data.form.name = JSON.parse(
                sessionStorage.getItem("allData")
              )[i].adminName;
              this.$data.form.password = JSON.parse(
                sessionStorage.getItem("allData")
              )[i].adminPwd;
              this.$data.form.telphone = JSON.parse(
                sessionStorage.getItem("allData")
              )[i].adminTel;
              this.$data.form.role = JSON.parse(
                sessionStorage.getItem("allData")
              )[i].adminAuth;
              // console.log(this.$data.form.role);
            }
          }
          // sessionStorage.setItem("targetId", "0");
        // }
      }, 0);
    })();
  }
};
</script>
<style scoped></style>
