<template>
  <div class="managerAdd" style="color: #606266">
    <el-form
      ref="ruleForm"
      :rules="rules"
      :model="ruleForm"
      label-width="100px"
    >
      <el-form-item label="管理员姓名" prop="name">
        <el-input v-model="ruleForm.name" size="small"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="tel">
        <el-input v-model="ruleForm.tel" size="small"></el-input>
      </el-form-item>
      <el-form-item label="登录密码" prop="password">
        <el-input
          v-model="ruleForm.password"
          size="small"
          type="password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="surePassword">
        <el-input
          type="password"
          v-model="ruleForm.surePassword"
          size="small"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="管理员角色" prop="promotion">
        <el-select
          v-model="ruleForm.promotion"
          placeholder="请选择角色"
          size="small"
        >
          <!-- <el-option label="权限一" value="shanghai"></el-option>
          <el-option label="权限二" value="beijing"></el-option> -->
          <el-option
            v-for="item in promotionArray"
            :key="item.key"
            :label="item.title"
            :value="item.num"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          style="margin-left:10px"
          size="mini"
          @click="manageRole"
          >添加角色</el-button
        >
        <el-button
          type="primary"
          style="margin-left:10px"
          size="mini"
          @click="deleteRole"
          >删除角色</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >添加</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- <ourButton/> -->
  </div>
</template>

<script>
import roleManage from "../promotionSecond/roleManage";
import roleTag from "../promotionSecond/roleTag";
import ourButton from "../../../components/button";
export default {
  components: {
    ourButton: ourButton,
    roleManage: roleManage,
    roleTag: roleTag
  },
  props: {},
  data() {
    return {
      promotionArray: [],
      ruleForm: {
        name: "",
        tel: "",
        password: "",
        surePassword: "",
        promotion: ""
        // delivery: false,
        // type: [],
        // resource: "",
        // desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入管理员姓名", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" }
        ],
        tel: [{ required: true, message: "请输入电话", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        surePassword: [
          { required: true, message: "请输入确认密码", trigger: "blur" }
        ],
        promotion: [
          { required: true, message: "请选择管理角色", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.$data.promotionArray = JSON.parse(sessionStorage.getItem("promotion"));
    (() => {
      // console.log("aaaa");
      setInterval(() => {
        // console.log("bbbb");
        // if (sessionStorage.getItem("promotionUpdate") !== "3") {
        // console.log("cccc");
        this.$data.promotionArray = JSON.parse(
          sessionStorage.getItem("promotion")
        );
        //   console.log(sessionStorage.getItem("promotionUpdate"));
        // }
      }, 0);
    })();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!');
          if (
            this.$data.ruleForm.password === this.$data.ruleForm.surePassword
          ) {
            // console.log(typeof this.$data.ruleForm.name);
            // console.log(typeof this.$data.ruleForm.surePassword);
            // console.log(typeof this.$data.ruleForm.tel);
            console.log(this.$data.ruleForm.promotion);
            this.$axios({
              method: "post",
              url: this.$host+"/groupmall/admin/addAdmin",
              // url: "http://localhost:9808/addData.do",
              headers: {
                "Content-Type": "application/json" //设置请求头请求格式为JSON
                // access_token: this.token //设置token 其中K名要和后端协调好
              },
              data: JSON.stringify({
                adminName: this.$data.ruleForm.name,
                adminPwd: this.$data.ruleForm.surePassword,
                adminTel: this.$data.ruleForm.tel,
                adminAuth: this.$data.ruleForm.promotion
              })
            }).then(response => {
              // this.$axios
              //   .post("http://localhost:9808/initData.do")
              this.$axios
                .get(this.$host+"/groupmall/admin/selectAllAdmin")
                .then(response => {
                  console.log(response.data);
                  sessionStorage.setItem(
                    "allData",
                    JSON.stringify(response.data)
                  );
                  this.$data.num = response.data.length;
                  this.$data.tableData = [];
                  for (let i = 0; i < this.$data.pageSize; i++) {
                    this.$data.tableData.push(response.data[i]);
                  }
                  // console.log(this.$data.tableData)
                  // this.$data.managerData=response.data;
                  // console.log(this.$data.managerData)
                })
                .catch(error => {
                  console.log(error);
                }); //获取信息总数
            });
          } else {
            this.$alert("两次密码输入不一致，请核对后再试!", "温馨提示", {
              confirmButtonText: "确定",
              callback: action => {
                // this.$message({
                //   // type: "info",
                //   // message: `action: ${action}`
                // });
              }
            });
          }
        } else {
          return false;
        }
      });
      sessionStorage.setItem("updateList",true);
      this.resetForm("ruleForm");
      this.$router.push({ path: "/manager" });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    manageRole() {
      const h = this.$createElement;
      this.$msgbox({
        title: "添加角色",
        // message: h("p", null, [
        //   h("span", null, "内容可以是 "),
        //   h("i", { style: "color: teal" }, "VNode")
        // ]),
        message: h("roleManage", null),
        showCancelButton: true,
        confirmButtonText: "保存",
        cancelButtonText: "取消"
        // beforeClose: (action, instance, done) => {
        //   if (action === "confirm") {
        //     instance.confirmButtonLoading = true;
        //     instance.confirmButtonText = "执行中...";
        //     setTimeout(() => {
        //       done();
        //       setTimeout(() => {
        //         instance.confirmButtonLoading = false;
        //       }, 300);
        //     }, 3000);
        //   } else {
        //     done();
        //   }
        // }
      })
        .then(action => {
          if (
            sessionStorage.getItem("myPower") === "" ||
            sessionStorage.getItem("myRole") === ""
          ) {
          } else {
            let roles = JSON.parse(sessionStorage.getItem("promotion"));
            console.log(roles);
            let newRole = {
              num: sessionStorage.getItem("myPower"),
              title: sessionStorage.getItem("myRole")
            };
            roles.push(newRole);
            console.log(roles);
            sessionStorage.setItem("promotion", JSON.stringify(roles));
            // sessionStorage.setItem("promotionUpdate", "0");
            // console.log(sessionStorage.getItem("myPower"));
            // console.log(sessionStorage.getItem("myRole"));
            sessionStorage.setItem("myPower", "");
            sessionStorage.setItem("myRole", "");
          }
        })
        .catch(cancel => {
          console.log(cancel);
        });
    },
    deleteRole() {
      const h = this.$createElement;
      this.$msgbox({
        title: "删除角色",
        // message: h("p", null, [
        //   h("span", null, "内容可以是 "),
        //   h("i", { style: "color: teal" }, "VNode")
        // ]),
        message: h("roleTag", null),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
        // beforeClose: (action, instance, done) => {
        //   if (action === "confirm") {
        //     instance.confirmButtonLoading = true;
        //     instance.confirmButtonText = "执行中...";
        //     setTimeout(() => {
        //       done();
        //       setTimeout(() => {
        //         instance.confirmButtonLoading = false;
        //       }, 300);
        //     }, 3000);
        //   } else {
        //     done();
        //   }
        // }
      })
        .then(action => {
          // this.$message({
          //   type: "info",
          //   message: "action: " + action
          // });
          console.log(action);
        })
        .catch(cancel => {
          console.log(cancel);
        });
    }
  }
};
</script>
<style scoped>
.managerAdd {
  padding-top: 20px;
  width: 50%;
}
</style>
