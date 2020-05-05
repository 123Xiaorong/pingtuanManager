<template>
    <div style="color: #606266">
        <!--下拉菜单 搜索-->
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-submenu index="2" >
                <template slot="title" >{{aaaa}}</template>
                <el-menu-item @click="bbbb(3)" index="3">全部分类</el-menu-item>
                <el-menu-item @click="bbbb(0)" index="0">帮助中心</el-menu-item>
                <el-menu-item @click="bbbb(1)" index="1">文章资讯</el-menu-item>
                <el-menu-item @click="bbbb(2)" index="2">文章推送</el-menu-item>
            </el-submenu>
            <el-menu-item index="3" disabled>文章标题</el-menu-item>

            <el-menu-item index="4">
                <el-input
                        placeholder="请输入文章标题"
                        v-model="input"
                        size="small"
                        clearable>
                </el-input>
                <!--<el-input-->
                                         <!--placeholder="请输入内容"-->
                                        <!--v-model="input"-->
                                        <!--clearable>-->
                                         <!--</el-input>&nbsp;&nbsp;&nbsp;-->
                <el-button type="success" size="small"  @click="Ssuo()" style="margin-left: 20px">搜索</el-button>
            </el-menu-item>
        </el-menu>

       <!--表格 -->
        <template>
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        prop="bianhao"
                        label="编号"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="文章标题"
                        width="220">
                </el-table-column>
                <el-table-column
                        prop="fenlei"
                        label="分类名称"
                        width="180">
                </el-table-column>
                <el-table-column label="是否显示" width="140" prop="shows">
                    <template slot-scope="scope">
                        <el-switch
                                @change="changeSwitch(scope.row,scope.row.bianhao)"
                                v-model="scope.row.shows"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                :active-value="true"
                                :inactive-value="false">
                        </el-switch>
                    </template>
                </el-table-column>

                <!--<el-table-column-->
                        <!--prop="xianshi"-->
                        <!--label="是否显示"-->
                        <!--width="140">-->
                    <!--<el-tooltip :content="'Switch value: ' + value" placement="top">-->
                        <!--<el-switch-->
                                <!--v-model="value"-->
                                <!--active-color="#13ce66"-->
                                <!--inactive-color="#ff4949"-->
                                <!--active-value="1"-->
                                <!--inactive-value="0">-->
                        <!--</el-switch>-->
                    <!--</el-tooltip>-->
                <!--</el-table-column>-->
                <el-table-column
                        prop="date"
                        label="日期"
                        width="220">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <router-link to="/xiugai" active-class="active">
                        <el-button type="warning"
                                   icon="el-icon-edit"
                                size="small"
                                   title="修改"
                                @click="handleEdit(scope.row.bianhao)"></el-button>
                        </router-link>
                        <el-button style="margin-left: 10px"
                                icon="el-icon-delete"
                                size="small"
                                type="danger"
                                   title="删除"
                                @click="handleDelete(scope.row.bianhao)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>



        <!--分页-->


        <div class="block" style="text-align: center;margin-top: 10px">
            <span class="demonstration"></span>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[3,5,8]"
                    :page-size="3"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="yeye">
            </el-pagination>
        </div>








    </div>
</template>

<script>
    // var fenL=["帮助中心","文章资讯","文章推送"]
    var id;
    export default {
        name: "Thearticlelists",
        data(){
            return{
              myNum:3,
                aaaa:"全部分类",
                input: '',
                tableData: [],
                value: true,
                yeye:100,

                currentPage: 1,
                pageSize:3,
                shows:'',
                Arr:[{num:0,title:"帮助中心"},
                  {num:1,title:"文章资讯"},
                  {num:2,title:"文章推送"},
                  {num:3,title:"全部分类"},
                ],
            }
        },

      created() {
        // console.log("测试获取优惠券列表接口");
        this.$axios.get(this.$host+"/groupmall/art/selectByPage",{params:{
          page:this.$data.currentPage,
            limit:this.$data.pageSize
        }
        })
          .then(response=>{
            this.$data.yeye=response.data.count;
            // console.log("获取优惠券列表");
            // console.log(response.data.count);
            console.log(response.data);
            // console.log(resp.data[0])
            // this.$data.tableData=resp.data;
            // console.log("ALL"+response.data);
            const resp = response.data
            for(var i=0;i<resp.data.length;i++){
              this.tableData.push({
                bianhao:resp.data[i].id,
                name:resp.data[i].articleTitle,
                fenlei:resp.data[i].article_kindsHPS[0].kindName,
                date:resp.data[i].time,
                shows:resp.data[i].shows
              })
            }
            // console.log(resp.data[0].shows)
            // console.log(this.$data.tableData[0].shows)
          }).catch(error=>{
            console.log(error)
        })

      },

        // 写函数的

        methods: {
          // switch开关
          changeSwitch(data,bianhao){

            // console.log(data.shows);
            // console.log(bianhao)
            this.$axios.post(this.$host+"/groupmall/art/shows",JSON.stringify({
              id:bianhao,
              shows:data.shows,
              }))
              .then(response=>{
                console.log(response.data)

              })
          },
          // 分类
          bbbb(num){
            console.log(num);
            this.$data.currentPage=1;
            this.$data.pageSize=3;
            // console.log(this.$data.Arr)
            for(let i=0;i<this.$data.Arr.length;i++){
              if(this.$data.Arr[i].num===num){
                // console.log(this.$data.Arr[i].num);
                this.$data.myNum=this.$data.Arr[i].num
                this.$data.aaaa=this.$data.Arr[i].title
                this.$axios.get(this.$host+"/groupmall/art/kindlist",{params:{
                    kind:this.$data.myNum,
                    page:this.$data.currentPage,
                    limit:this.$data.pageSize
                  }
                }).then(resp=>{
                  console.log("成功！！")
                    console.log(resp.data);
                    console.log(resp.data.data);
                  this.$data.yeye=resp.data.count;


                  this.$data.tableData=[];
                  for(var i=0;i<resp.data.data.length;i++){
                    this.tableData.push({
                      bianhao:resp.data.data[i].id,
                      name:resp.data.data[i].articleTitle,
                      fenlei:resp.data.data[i].article_kindsHPS[0].kindName,
                      date:resp.data.data[i].time,
                      shows:resp.data.data[i].shows
                    })

                  }
                  }

                )
              }
            }

          },
            handleSelect(){
                console.log()
            },
            activeIndex(){
                // console.log('111')
            },
            handleDelete(bianhao){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(()=>{
                  console.log(bianhao)
                  this.$axios.delete(this.$host+"/groupmall/art/delete",{params:{id:bianhao}})
                    .then(resp=>{

                      console.log(resp.data)
                    })
                  this.$router.go(0)
                })
              // id=event.currentTarget.parentElement.parentElement.parentElement.getElementsByTagName("td")[0].innerText

            },
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
              // this.$axios.get("http://172.16.14.95:8080/groupmall/art/selectByPage",{params:{
              //     page:this.$data.currentPage,
              //     limit:val
              //   }
              // })
              this.$axios.get(this.$host+"/groupmall/art/kindlist",{params:{
                  kind:this.$data.myNum,
                  page:this.$data.currentPage,
                  limit:val
                }
              })
                .then(resp=>{
                console.log(resp.data.data);
                this.$data.tableData=[];
                for(var i=0;i<resp.data.data.length;i++){
                  this.tableData.push({
                    bianhao:resp.data.data[i].id,
                    name:resp.data.data[i].articleTitle,
                    fenlei:resp.data.data[0].article_kindsHPS[0].kindName,
                    date:resp.data.data[i].time,
                    shows:resp.data.data[i].shows
                  })
                }
                }

              )

            },
            handleCurrentChange(val) {
              console.log(val)
                // console.log(`当前页: ${val}`);
              // this.$axios.get("http://172.16.14.95:8080/groupmall/art/selectByPage",{params:{
              //     page:val,
              //     limit:this.$data.pageSize
              //   }
              // })
              this.$axios.get(this.$host+"/groupmall/art/kindlist",{params:{
                  kind:this.$data.myNum,
                  page:val,
                  limit:this.$data.pageSize
                }
              })
                .then(resp=>{

                console.log(resp.data.data);
                this.$data.tableData=[];
                for(var i=0;i<resp.data.data.length;i++){
                  this.tableData.push({
                    bianhao:resp.data.data[i].id,
                    name:resp.data.data[i].articleTitle,
                    // fenlei:fenL[resp.data.data[i].kind],
                    fenlei:resp.data.data[i].article_kindsHPS[0].kindName,
                    date:resp.data.data[i].time,
                    shows:resp.data.data[i].shows
                  })
                }
                // this.$data.tableData=resp.data.data[0]
              })
            },

          Ssuo(){
            console.log(this.input)
            this.$axios.get(this.$host+"/groupmall/art/list",{params:{articleTitle:this.input}})
              .then(response=>{
                console.log(response.data.data)
                  this.tableData=[{
                    bianhao:response.data.data[0].id,
                    name:response.data.data[0].articleTitle,
                    fenlei:response.data.data[0].article_kindsHPS[0].kindName,
                    date:response.data.data[0].time,
                    shows:response.data.data[0].shows
                  }]

              })
          },
          handleEdit(bianhao){
            //   let changeId=event.currentTarget.parentElement.parentElement.parentElement.getElementsByTagName("td")[0].innerText
            //
            // // console.log(event.currentTarget.parentElement.parentElement.parentElement.getElementsByTagName("td")[0].innerText)
            // sessionStorage.setItem("changeId",changeId)
            console.log(bianhao)
            this.$store.commit('increment',bianhao);

          },


        }


    }
</script>

<style scoped>
    .t_liebiao{
        /*border: 1px solid rebeccapurple;*/
        font-size: 18px;
        margin:20px 0 0 30px;
    }
    .t_guanli{
        /*border: 1px solid red;*/
        font-size: 16px;
        margin:15px 0 0 30px;
    }
    .el-menu-demo{
        margin-left: 10px;
    }
    .caozuo{
        width: 30px;
    }
    .butt {
        height: 36px;
        width: 60px;
        border: 0px solid #42b983;
        background-color: #42b983;
        color: white;
        margin-top: 6px;
    }
    .el-menu--horizontal>.el-menu-item.is-active{
        border: 0px;
    }
</style>