<template>
  <div class="cardList">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="卡券名称" style="width:30%">
        <el-input v-model="form.name" size="small"></el-input>
      </el-form-item>
      <el-form-item label="卡券编号" style="width:30%">
        <el-input v-model="form.ID" size="small"></el-input>
      </el-form-item>
      <el-form-item label="卡券批次" style="width:30%">
        <el-select v-model="form.batch" size="small" placeholder="请选择卡券批次">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="卡券状态" style="width:300px">
        <el-select v-model="form.status" size="small" placeholder="请选择卡券状态">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否使用" style="width:300px">
        <el-select v-model="form.isUse" size="small" placeholder="请选择卡券使用状态">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="onSubmit" size="small">搜索</el-button>
        <el-button size="small">取消</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData"  ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange" style="width: 100%;text-align: center">
      <el-table-column width="60" type="selection"></el-table-column>
      <el-table-column fixed prop="date" label="卡券编号" width="100">
      </el-table-column>
      <el-table-column prop="name" label="卡券名称" width="120">
      </el-table-column>
      <el-table-column prop="province" label="卡券批次" width="120">
      </el-table-column>
      <el-table-column prop="city" label="发卡时间" width="120">
      </el-table-column>
      <el-table-column prop="address" label="商品名称" width="300">
      </el-table-column>
      <el-table-column prop="zip" label="卡券状态" width="120">
      </el-table-column>
      <el-table-column prop="zip" label="是否使用" width="120">
      </el-table-column>
      <el-table-column prop="zip" label="有效日期" width="120">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="success"
            size="small"
            icon="el-icon-view"
            title="查看"
          >

          </el-button>
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="warning"
            size="small"
            icon="el-icon-edit"
            title="修改"
          >

          </el-button>
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="danger"
            size="small"
            icon="el-icon-delete"
            title="删除"
          >
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="block" style="text-align:center;margin-top:10px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </div>
    <!--<div style="margin-top: 20px">-->
      <!--<el-button type="primary">激活</el-button>-->
      <!--<el-button>取消激活</el-button>-->
      <!--<el-button type="warning">修改</el-button>-->
    <!--</div>-->
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      tableData: [
        {
          date: "2016-05-06",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ],
      multipleSelection: [],
      form: {
        name: "",
        ID: "",
        batch: "",
        status: "",
        isUse: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>
<style scoped>
form > div {
  float: left;
}
</style>
