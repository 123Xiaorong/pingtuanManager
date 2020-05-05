<template>
  <div class="cardAdd">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="关键字" class="cardAddInput">
        <el-input v-model="form.name" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="对应商品" class="cardAddInput">
        <el-input v-model="form.name" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="卡券名称" class="cardAddInput">
        <el-input v-model="form.name" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="卡号前缀" class="cardAddInput">
        <el-input v-model="form.name" style="width:300px"></el-input>
        <span style="color: #606266;font-size: 13px;margin-left: 5px">数字或者字母，字母可自动转成大写(可不填)</span>
      </el-form-item>
      <el-form-item label="卡券状态" style="clear:both">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="卡号长度" class="cardAddInput">
        <el-input v-model="form.name" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="卡号密码" class="cardAddInput">
        <el-input v-model="form.name" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="生成数量" class="cardAddInput">
        <el-input v-model="form.name" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="卡券面值" class="cardAddInput">
        <el-input v-model="form.name" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="有效日期">
        <div class="block">
          <el-date-picker
            v-model="value2"
            type="daterange"
            align="center"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="生成数量" class="cardAddInput" style="width:50%">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" @click="onSubmit">立即添加</el-button>
        <el-button>取消</el-button>
      </el-form-item>
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
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value1: "",
      value2: ""
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>
<style scoped>
.cardAddInput{
    float: left;
}
</style>
