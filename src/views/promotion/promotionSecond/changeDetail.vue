<template>
  <div class="managerDetail">
    <el-form ref="form1" :model="form1" label-width="100px">
      <el-form-item label="管理员姓名">
        <el-input
          v-model="form1.name1"
          style="width:80%"
          size="small"
          @focus="stopInter"
        ></el-input>
      </el-form-item>
      <el-form-item label="管理员密码">
        <el-input
          v-model="form1.password1"
          style="width:80%"
          size="small"
          show-password
          @focus="stopInter"
        ></el-input>
      </el-form-item>
      <el-form-item label="管理员电话">
        <el-input
          v-model="form1.telphone1"
          style="width:80%"
          size="small"
          @focus="stopInter"
        ></el-input>
      </el-form-item>
      <el-form-item label="管理员角色">
        <el-select
          v-model="form1.role1"
          placeholder="请选择管理员角色"
          size="small"
          style="width:80%"
          @focus="stopInter"
        >
          <!-- <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option> -->
          <el-option
            v-for="item in promotionArray"
            :key="item.key"
            :label="item.title"
            :value="item.num"
          ></el-option>
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
  props: {
    isDisabled: false
  },
  data() {
    return {
      promotionArray: [],
      form1: {
        name1: "",
        password1: "",
        telphone1: "",
        role1: ""
        // region: "",
        // date1: "",
        // date2: "",
        // delivery: false,
        // type: [],
        // resource: "",
        // desc: ""
      }
    };
  },
  created() {
    (() => {
      setInterval(() => {
        this.$data.promotionArray = JSON.parse(
          sessionStorage.getItem("promotion")
        );
      }, 0);
    })();
    (() => {
      setInterval(() => {
        if (sessionStorage.getItem("isChange") === "false") {
          for (
            let i = 0;
            i < JSON.parse(sessionStorage.getItem("allData")).length;
            i++
          ) {
            if (
              String(JSON.parse(sessionStorage.getItem("allData"))[i].adminId) ===
              String(sessionStorage.getItem("targetId2"))
            ) {
              // console.log("change" + "========");
              // console.log(JSON.parse(sessionStorage.getItem("allData"))[i]);
              this.$data.form1.name1 = JSON.parse(
                sessionStorage.getItem("allData")
              )[i].adminName;
              this.$data.form1.password1 = JSON.parse(
                sessionStorage.getItem("allData")
              )[i].adminPwd;
              this.$data.form1.telphone1 = JSON.parse(
                sessionStorage.getItem("allData")
              )[i].adminTel;
              this.$data.form1.role1 = JSON.parse(
                sessionStorage.getItem("allData")
              )[i].adminAuth;
              // console.log(this.$data.form1.name1);
            }
          }
          // sessionStorage.setItem("targetId2", "0");
        }
      }, 0);
    })(); //监听父组件点击数据行？
    (() => {
      setInterval(() => {
        // console.log(sessionStorage.getItem("changeDetail")==="true");
        if (sessionStorage.getItem("changeDetail") === "true") {
          // console.log("aaaa");
          // console.log(this.$data.form1.name1);
          // console.log(this.$data.form1.telphone1);
          // console.log(this.$data.form1.password1);
          // console.log(this.$data.form1.role1);
          console.log(sessionStorage.getItem("targetId2"));
          this.$axios({
            method: "post",
            // url: "http://localhost:9808/changeData.do",
            url:this.$host+"/groupmall/admin/modifyAdmin",
            headers: {
              "Content-Type": "application/json" //设置请求头请求格式为JSON
              // access_token: this.token //设置token 其中K名要和后端协调好
            },
            data: JSON.stringify({
              adminName: this.$data.form1.name1,
              adminTel: this.$data.form1.telphone1,
              adminPwd: this.$data.form1.password1,
              adminAuth: this.$data.form1.role1,
              adminId: sessionStorage.getItem("targetId2")
            })
          }).then(response => {
            // console.log(response)
            sessionStorage.setItem("updateList",true);
            // this.$axios
            //   .post("http://localhost:9808/initData.do")
            this.$axios.get(this.$host+"/groupmall/admin/selectAllAdmin")
              .then(response => {
                console.log(response.data);
                sessionStorage.setItem(
                  "allData",
                  JSON.stringify(response.data)
                );
                this.$data.num = response.data.length;
                this.$data.tableData = [];
                this.$data.currentPage = 1;
                for (let i = 0; i < this.$data.pageSize; i++) {
                  this.$data.tableData.push(response.data[i]);
                }
                // console.log(this.$data.tableData)
                this.$data.managerData=response.data;
                // console.log(this.$data.managerData)
              })
              .catch(error => {
                console.log(error);
              }); //获取信息总数
          });
          sessionStorage.setItem("changeDetail", "false");
        }
      }, 0);
    })(); //监听父组件点击提交
  },
  methods: {
    stopInter(){
      // console.log("aaaa");
      sessionStorage.setItem("isChange",true);
    }
  }
};
</script>
<style scoped></style>
