<template>
  <div class='goodsList'>
          <div style="margin-top: 10px">
            <div>
              <span style="font-size: 14px">商品名称：</span>
              <el-input
                placeholder="请输入内容"
                v-model="product_name"
                clearable
                size="small"
                class="searchinput"
                style="margin-right: 20px;"
              >
              </el-input>
              <span style="font-size: 14px">商品货号：</span>
              <el-input
                placeholder="请输入内容"
                v-model="product_id"
                clearable
                size="small"
                class="searchinput"
                style="margin-right: 20px;"
              >
              </el-input>
              <span style="font-size: 14px">商品分类：</span>
              <el-select size="small" v-model="goodsSort.cateId" placeholder="请选择" @change="SelectionChange"
                         style="width:150px;margin-right: 20px">
                <el-option
                  v-for="item in goodsSort"
                  :key="item.cateId"
                  :label="item.cateName"
                  :value="item.cateId"
                  :disabled="item.disabled"
                >
                </el-option>
              </el-select>
              <el-button type="success" size="small" @click="Search">搜索</el-button>
            </div>
            <div>
              <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column
                        prop="proId"
                        width="100"
                        label="ID"    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="proName"
                  width="230"
                  label="商品名称"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="price" label="价格" width="100">
                </el-table-column>
                <el-table-column label="上架" width="100">
                  <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.ifShow" @change="shangjiachange(scope.row)"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                    </el-switch>
                  </template>

                </el-table-column>
                <el-table-column prop="proStore" label="数量" width="110">
                </el-table-column>
                <el-table-column prop="proLeft" label="剩余数量" width="110">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <router-link :to="{path:'/xiugaigoods',query:{row:scope.row}}">
                      <el-button title="修改"
                                            type="warning"
                                            size="small" class="el-icon-edit"
                    ></el-button>
                    </router-link>
                    <el-button type="info" size="small" class="el-icon-delete-solid" title="回收"
                    style="margin-left: 10px" @click="recyclegoods(scope.row)"></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="fenyeborder">
              <div class="block fenye" style="text-align: center">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="page"
                  :page-sizes="[3,5, 10]"
                  :page-size="5"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="count"
                >
                </el-pagination>
              </div>
            </div>
          </div>
        <!-- </el-tab-pane> -->
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
      idDispaly:false,
        tableData: [],
      multipleSelection: [],
      productData:{
        pro_name:'',
        card_id:'',
      },
      goodsSort: [],
      checkList: "",
      page:1,
      limit:5,
      count:'',
      product_name:'',
      product_id:'',
      goodsCateId:'',
      multiArr:[],
    }
  },
  methods:{
    handleSizeChange(val) {
      this.limit=val;
      // console.log(this);
      this.getAllPro(this.page,this.limit,this.product_name,this.product_id,this.goodsCateId);
    },
    handleCurrentChange(val) {
      this.page=val;
      // console.log(this);
      this.getAllPro(this.page,this.limit,this.product_name,this.product_id,this.goodsCateId)
    },
    handleSelectionChange(val) {
      this.multipleSelection=val;
      this.multiArr=[];
      for(var i=0;i<this.multipleSelection.length;i++){
        this.multiArr.push(this.multipleSelection[i].proId);
      }
      console.log(this.multiArr);
      this.$emit('func',this.multiArr);
    },
    getAllPro(a,b,c,d,e){
      this.$axios({
        method:'post',
        url: this.$host+'/groupmall/power/product/selectByPage',
        headers:{"Content-Type":"application/x-www-form-urlendcoded"},
        access_token:this.token,
        params:{page:a,limit:b,proName:c,cardId:d,cateId:e}
      }).then((resp)=>{
        // console.log(resp.data);
        this.tableData=resp.data.data;
        this.count=resp.data.count;
      });
    },
    SelectionChange(e){
      this.goodsCateId=e;
    },
    Search(){
      this.getAllPro(this.page,this.limit,this.product_name,this.product_id,this.goodsCateId);
    },
    shangjiachange(e){
      console.log(e.ifShow);
      this.$axios({
        method:'post',
        url: this.$host+'/groupmall/power/product/setShow',
        headers:{"Content-Type":"application/x-www-form-urlendcoded"},
        access_token:this.token,
        params:{proId:e.proId}
      }).then((resp)=>{
        // console.log(resp.data);
        this.tableData=resp.data.data;
        this.count=resp.data.count;
      });
    },
    recyclegoods(e){
      this.$axios({
        method:'post',
        url: this.$host+'/groupmall/power/product/deleteOne',
        headers:{"Content-Type":"application/x-www-form-urlendcoded"},
        access_token:this.token,
        params:{proId:e.proId}
      }).then((resp)=>{
        console.log(resp)
      });
      this.$router.go(0);
    }
  },

  created(){
    // console.log(this.$data.page);
    this.$axios({
      method:'post',
      url: this.$host+'/groupmall/power/product/selectByPage',
      headers:{"Content-Type":"application/x-www-form-urlendcoded"},
      access_token:this.token,
      params:{page:this.$data.page,limit:this.$data.limit}
    }).then((resp)=>{
      // console.log(resp.data);
      this.tableData=resp.data.data;
      this.count=resp.data.count;
      // console.log(this.tableData);
    });
    this.$axios({
      method:'post',
      url: this.$host+'/groupmall/power/product/getCate',
      headers:{"Content-Type":"application/x-www-form-urlendcoded"},
      access_token:this.token,
    }).then((resp)=>{
      // console.log(resp.data.cateList);
      this.goodsSort=resp.data.cateList;
      // console.log(this.goodsSort);
    });
    // this.$axios.post("http://172.16.14.94:8080/groupmall/power/product/selectByPage",{param:{page:1,limit:5}}).then(
    //   (resp)=>{
    //     console.log('请求成功的回调函数');
    //     console.log(resp);
    //
    //   })

  }
}
</script>
<style scoped>
.goodsList{
    padding: 5px;
}
.searchinput {
  width: 150px;
}
.Row > div {
  padding: 10px 0;
}
.inputSize {
  width: 40%;
}
.fenyeborder {
  margin-top: 10px;
}
.floatL {
  float: left;
}
.paddL {
  width: 150px;
  padding-right: 10px;
}
.clearB {
  clear: both;
}
.TitleB {
  width: 100px;
  float: left;
}
</style>