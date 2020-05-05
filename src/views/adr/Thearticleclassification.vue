<template>
    <div style="color: #606266">
        <!--<div>-->
        <!--&lt;!&ndash;<table class="t_fenlei">文章分类</table>&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="t_guali">文章分类管理</div>&ndash;&gt;-->
        <!--</div>-->

            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        prop="ID"
                        label="ID"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="系统名称"
                        width="220">
                </el-table-column>
                <el-table-column
                        label="分类名称"
                        width="220">

                   <input style="width: 120px;height: 20px;outline: none;
                   color:#606266;border: .5px solid #d2d2d2;border-radius: 3px;padding: 5px 10px" placeholder="请输入关键词"
                          v-model="value">
                </el-table-column>

                <el-table-column
                        prop="date"
                        label="分类关键词"
                        width="220">
                    <input style="color:#606266;width: 140px;height: 20px;outline: none;border: .5px solid #d2d2d2;border-radius: 3px;padding: 5px 10px" placeholder="请输入关键词"
                           v-model="values">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="warning"
                                size="small"
                                   icon="el-icon-edit"
                                @click="handleEdit(scope.row.ID,scope.row.name)" title="修改"></el-button>
                    </template>
                </el-table-column>
            </el-table>
    </div>
</template>

<script>
    export default {
        name: "Thearticleclassification",
        data() {
            return {
                tableData:[],
              value:'',
              values:'',
            }
        },
        methods: {
            handleEdit(id,name) {
                this.$confirm('确认修改内容, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                  console.log( typeof this.value)
                  console.log( typeof this.values)
                  console.log(typeof parseInt(id))
                  console.log(name)
                  //
                  // this.$axios.post("http://172.16.14.95:8080/groupmall/art/changeKinds",
                  //   JSON.stringify({
                  //     id:parseInt(id),
                  //     kindName:this.value,
                  //     kindIntroduce:this.values
                  //   })
                  //
                  // ).then(response=>{
                  //   console.log(response.data)
                  // })
                  this.$axios.post(this.$host+"/groupmall/art/changeKinds",JSON.stringify({
                      kindName:this.value,
                      kindIntroduce:this.values,
                    id:id}))
                    .then(response=>{
                      console.log(response)

                    })

                  this.$router.go(0)
                })
            },

        },
      created() {
        console.log("测试获取优惠券列表接口");
        this.$axios.get(this.$host+"/groupmall/art/selectKinds",{params:{
          }
        })
          .then(response=>{
            // console.log(response.data.data[0].id);
            for(var i=0;i<response.data.data.length;i++){
              this.tableData.push({
                ID:response.data.data[i].id,
                name:response.data.data[i].systemName

              })
            }

          })

      },
    }
</script>

<style scoped>
    ::-webkit-input-placeholder { /* WebKit browsers */
        color: #999;
        /*font-size: 16px;*/
    }

    ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #999;
        /*font-size: 16px;*/
    }

    .t_fenlei{
        /*border: 1px solid red;*/
        margin: 20px 0 0 20px;
        font-size: 20px;
    }
    .t_guali{
        /*border: 1px solid red;*/
        margin: 10px 0 0 20px;
        font-size: 18px;
    }
    select{
        width: 100px;
        height: 30px;
        border: 0px;
    }

</style>