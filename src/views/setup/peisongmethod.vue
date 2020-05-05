<template>
   <div>
       <el-button style="margin-top:10px;margin-bottom: 5px" type="primary" @click="handleAdd"
       icon="el-icon-plus"
       >新增</el-button>
    <el-table :data="peisongData" style="width: 100%;">
      <el-table-column show-overflow-tooltip prop="modeofdistributionId" label="ID" width="180"></el-table-column>
      <el-table-column prop="modeofdistributionName" label="名称" width="280"></el-table-column>
      <el-table-column prop="modeofdistributionValue" label="值" ></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small" type="warning" @click="handleEdit(scope.row.id)"
          icon="el-icon-edit"
                     title="修改"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

   <!-- 新增 -->
    <el-dialog title="新增配送" :visible.sync="dialogFormVisible" width="500px">
      <el-form
        :rules="rules"
        ref="peisongForm"
        label-width="100px"
        label-position="right"
        style="width:400px"
        :model="peisong"
      >
      <!-- <el-form-item label="ID" prop="modeofdistributionId">
          <el-input v-model="peisong.modeofdistributionId" size="small"></el-input>
        </el-form-item> -->
        <el-form-item label="名称" prop="modeofdistributionName">
          <el-input v-model="peisong.modeofdistributionName" size="small"></el-input>
        </el-form-item>
        <el-form-item label="值" prop="modeofdistributionValue">
          <el-input v-model="peisong.modeofdistributionValue" size="small"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addData('peisongForm')">确 定</el-button>
      </div>
    </el-dialog>
   </div>
</template>

<script>
import methodApi from '../../api/peisongmethod'
export default {
  data () {
    return {
      peisongData: [],
      peisong: {
        // modeofdistributionId: '',
        modeofdistributionName: '',
        modeofdistributionValue: ''
      },
      rules: {
        modeofdistributionName: [
          { required: true, message: "名称不能为空", trigger: "blur" }
        ],
        modeofdistributionValue: [
          { required: true, message: "值不能为空", trigger: "blur" }
        ]
      },
      dialogFormVisible: false
    }
  },

  components: {},

  created(){
    this.fetchData()
  },
  methods: {

    fetchData(){
    //   methodApi.getList().then(response=>{
    //     const resp = response.data
    //     console.log(resp)
    //   })
    this.$axios
        .get(
          this.$host+"/groupmall/setting/modeOfDistributionSet"
        )
        .then(response => {
          console.log(response.data);
          const resp = response.data;
          for (var i = 0; i < resp.length; i++) {
            this.peisongData.push({
              modeofdistributionId: resp[i].modeofdistributionId,
              modeofdistributionName: resp[i].modeofdistributionName,
              modeofdistributionValue: resp[i].modeofdistributionValue,
            });
          }
        });
    },

    handleAdd() {
      // this.pojo = {}
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        //this.$nextTick()它是一个异步事件，当渲染结束之后，它的回调函数才会被执行
        //弹出窗口打开后，需要加载DOM，就需要花费一点时间，我们就应该等待它加载完DOM之后，再进行调用resetFields方法，重置表单和清除样式
        this.$refs["peisongForm"].resetFields();
      });
    },
    handleEdit(id) {
      console.log("编辑", id);
    },
    addData(formName){
      
      // this.$axios.post("http://172.16.14.127:8080/")
      this.$refs[formName].validate(valid =>{
        if(valid){
          methodApi.add(this.peisong).then(response=>{
            const resp = response.data
            console.log(resp)
            if(resp){
              //新增成功
              console.log('新增成功')
              this.$alert('新增成功','新增提示信息', {
                confirmButtonText:'确定'
              })
              // this.fetchData()
              //关闭窗口
              this.dialogFormVisible = false
            }
          })
        }else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
</style>