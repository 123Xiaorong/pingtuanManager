<template>
  <div class="tab1">
    <div class="Row">
      <span>输入评论内容:&nbsp;&nbsp;&nbsp;</span>
      <el-input class="inputSize" placeholder="请输入内容" v-model="input" clearable></el-input>
      &nbsp;&nbsp;
      <el-button type="success">搜索</el-button>
    </div>
    <div>
      <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="ID" width="120"></el-table-column>
        <el-table-column prop="username" label="用户名称" width="120"></el-table-column>
        <el-table-column label="评论内容" max-width="200" fit>
          <template slot-scope="scope">
            评论内容：{{ scope.row.remarkText}}
            <br />
            评论商品：{{scope.row.remarkGoods}}
          </template>
        </el-table-column>
        <el-table-column prop="remarkTime" label="评论时间" width="120"></el-table-column>
        <el-table-column label="推荐" width="120">
          <el-switch v-model="tableData.value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-table-column>
        <el-table-column label="状态" width="120">
          <el-switch v-model="tableData.status" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="success" size="small">查看</el-button>
            <el-button type="warning" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="Row">
      <div class="block fenye">
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400"
        ></el-pagination>
      </div>
      <el-select v-model="value4" clearable placeholder="请选择">
        <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
        ></el-option>
      </el-select>
      <el-button type="success">确认</el-button>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        tableData:[
          {
            id:3,
            username:'不知道先生',
            remarkText:'这个水果真心不错，很划算，很甜，下次还会买.......',
            remarkGoods:'新疆哈密瓜',
            remarkTime:'2017-09-08 15:07:54',
            value1:true,
            status:true,
        },
          {
            id:3,
            username:'不知道先生',
            remarkText:'这个水果真心不错，很划算，很甜，下次还会买.......',
            remarkGoods:'新疆哈密瓜',
            remarkTime:'2017-09-08 15:07:54',
            value1:true,
            status:true,
          },
          {
            id:2,
            username:'不知道先生',
            remarkText:'这个水果真心不错，很划算，很甜，下次还会买.......',
            remarkGoods:'新疆哈密瓜',
            remarkTime:'2017-09-08 15:07:54',
            value1:true,
            status:true,
          }
        ],
        options: [{
          value: '选项1',
          label: '允许显示'
        }, {
          value: '选项2',
          label: '禁止显示'
        }, {
          value: '选项3',
          label: '删除评论'
        }],
        value4: '',
        currentPage1: 1,
    };
  },

  components: {},

  methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
  }
};
</script>

<style scoped>
#app{
        margin-left: 20px;
    }
    .sub_nav{
        padding: 10px 20px;
    }
    .fenye{
        text-align: center;
    }
    .Row{
        padding: 10px 0;
    }
    .inputSize{
        width: 40%;
    }
</style>