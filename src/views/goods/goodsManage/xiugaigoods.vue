<template>
    <div class='goodsAdd' style="color: #626066;font-size: 14px">
        <div>
            <div class="Row">
                <div>
                    <span class="TitleB" style="font-size: 14px">商品名称：</span>
                    <el-input
                            placeholder="请输入内容"
                            v-model="productData.proName"
                            clearable
                            class="inputSize"
                            size="small"
                    >
                    </el-input>
                </div>
                <div>
                    <span class="TitleB" style="font-size: 14px">商品编号：</span>
                    <el-input
                            placeholder="请输入内容"
                            v-model="productData.cardId"
                            clearable
                            class="inputSize"
                            size="small"
                    >
                    </el-input>
                </div>
                <div>
                    <span class="TitleB" style="font-size: 14px">商品简介：</span>
                    <el-input
                            class="inputSize"
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4 }"
                            placeholder="请输入内容"
                            v-model="productData.intro"
                            size="small"
                    >
                    </el-input>
                </div>
                <div class="clearB">
                    <span class="TitleB" style="font-size: 14px">团长佣金：</span>
                    <el-input
                            class="inputSize"
                            placeholder="请输入内容"
                            v-model="productData.brokerage"
                            clearable
                            size="small"
                    >
                    </el-input>
                </div>
                <div>
                    <span class="TitleB" style="font-size: 14px">限购数量：</span>
                    <el-input
                            class="inputSize" type="number"
                            placeholder="请输入内容"
                            v-model="productData.maxNum"
                            clearable
                            size="small"
                    >
                    </el-input>
                    <span class="Decri" style="font-size: 14px">&nbsp;&nbsp;&nbsp;0为不限购</span>
                </div>
                <div>
                    <span class="TitleB" style="font-size: 14px">商品价格：</span>
                    <el-input
                            class="inputSize" type="number"
                            placeholder="请输入内容"
                            v-model="productData.price"
                            clearable
                            size="small"
                    >
                    </el-input>
                </div>
                <div>
                    <div class="TitleB" style="font-size: 14px">拼团价格：</div>
                    <div class="floatL paddL">
                        团购人数:
                        <el-input style="width: 150px;"
                                  placeholder="请输入内容" type="number"
                                  v-model="tuangou.groupNum"
                                  clearable
                                  size="small"
                        >
                        </el-input>
                    </div>
                    <div class="floatL paddL">
                        <span style="font-size: 14px">价格:</span>
                        <el-input style="width: 150px;" type="number"
                                  placeholder="请输入内容"
                                  v-model="tuangou.groupPrice"
                                  clearable
                                  size="small"
                        >
                        </el-input>
                    </div>
                </div>
                <div class="clearB">
                    <div class="TitleB" style="font-size: 14px">市场价格：</div>
                    <el-input
                            class="inputSize" type="number"
                            placeholder="请输入内容"
                            v-model="productData.marketPrice"
                            clearable
                            size="small"
                    >
                    </el-input>
                </div>
                <div class="clearB">
                    <div class="TitleB">商品重量：</div>
                    <el-input
                            class="inputSize" type="number"
                            placeholder="请输入内容"
                            v-model="productData.weight"
                            clearable
                            size="small"
                    >
                    </el-input>
                    <span class="Decri">&nbsp;&nbsp;&nbsp;千克</span>
                </div>
                <div>
                    <div class="TitleB">商品库存：</div>
                    <el-input
                            class="inputSize" type="number"
                            placeholder="请输入内容"
                            v-model="productData.proStore"
                            clearable
                            size="small"
                    >
                    </el-input>
                    <span class="Decri">&nbsp;&nbsp;&nbsp;库存在商品存在货品时为不可编辑状态，库存数值取决于其货品数量</span>
                </div>
                <div>
                    <div class="TitleB">库存警告：</div>
                    <el-input
                            class="inputSize" type="number"
                            placeholder="请输入内容"
                            v-model="productData.minStore"
                            clearable
                            size="small"
                    >
                    </el-input>
                </div>
                <div>
                    <div class="TitleB">免运费：</div>
                    <el-radio-group v-model="productData.nonePostage" @change="danxuanchange">
                        <el-radio :label="true">是</el-radio>
                        <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                </div>
                <div>
                    <div class="TitleB">商家备注：</div>
                    <el-input
                            class="inputSize"
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4 }"
                            placeholder="请输入内容"
                            v-model="productData.note"
                            size="small"
                    >
                    </el-input>
                    <span class="Decri">&nbsp;&nbsp;&nbsp;仅供商家自己看到的信息</span>
                </div>
                <div>
                    <div class="TitleB">商品详情：</div>
                    <el-input
                            class="inputSize"
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4 }"
                            placeholder="请输入内容"
                            v-model="productData.description"
                            size="small"
                    >
                    </el-input>
                    <span class="Decri">&nbsp;&nbsp;&nbsp;仅供商家自己看到的信息</span>
                </div>
                <div>
                    <el-button type="primary" @click="submitP">提交</el-button>
                    <el-button @click="Back">返回</el-button>
                </div>
            </div>
        </div>
        <!-- </el-tab-pane> -->
    </div>
</template>

<script>
  export default {
    name:'xiugaigoods',
    props: {},
    data() {
      return {
        productData: {
          proId:'',
          proName: "",
          cardId: "",
          intro: "",
          brokerage: "",
          maxNum: "",
          Price: "",
          marketPrice: "",
          weight: "",
          proStore: "",
          minStore: "",
          nonePostage: "",
          note: "",
          description:'',
        },
        tuangou: {
          groupNum: "",
          groupPrice: ""
        },
        goodsSort: [],
        tags: [],
        proId:'',
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      submitP() {
        this.$axios({
          method: 'post',
          url: this.$host+ '/groupmall/power/product/updatePro',
          headers: { "Content-Type": "application/x-www-form-urlendcoded"},
          access_token: this.token,
          params:{
            proId:this.productData.proId,proName:this.productData.proName,
            cardId:this.productData.cardId,categoryId:this.productData.categoryId,
            intro:this.productData.intro,brokerage:this.productData.brokerage,
            maxNum:this.productData.maxNum,price:this.productData.price,
            marketPrice:this.productData.marketPrice,weight:this.productData.weight,
            proStore:this.productData.proStore,minStore:this.productData.minStore,
            nonePostage:this.productData.nonePostage,note:this.productData.note,
            description:this.productData.description,
           groupNum:this.tuangou.groupNum,groupPrice:this.tuangou.groupPrice
          }
        }).then((resp) => {
          console.log(resp);
          if(resp.data.groupAffect==true&&resp.data.productAffect==true){
            this.$message({
              message:'修改成功',
              type:'success'
            });
          }
        });
        setTimeout(()=>{
          this.$router.push({path:'/goodsmanage'})
        },3000);

      },
      Back(){
        this.$router.go(-1)
      }
    },
    created() {
      this.proId=this.$route.query.row.proId;
      // console.log(this.productData.proId);
      // this.$axios({
      //   method: "post",
      //   url: this.$host+"groupmall/power/product/getCate",
      //   headers: { "Content-Type": "application/x-www-form-urlendcoded" },
      //   access_token: this.token
      // }).then((resp) => {
      //   // console.log(resp.data.cateList);
      //   this.goodsSort = resp.data.cateList;
      //   // console.log(this.goodsSort);
      // });
      // this.$axios({
      //   method: "post",
      //   url:  this.$host+"groupmall/power/tags/selectByPage",
      //   headers: { "Content-Type": "application/x-www-form-urlendcoded" },
      //   access_token: this.token,
      //   params: { page: 1, limit: 10 }
      // }).then((resp) => {
      //   this.tags = resp.data.data;
      //   console.log(this.tags);
      // });
      this.$axios({
        method: "post",
        url:  this.$host+"/groupmall/power/product/selectOne",
        headers: { "Content-Type": "application/x-www-form-urlendcoded" },
        access_token: this.token,
        params: {proId:this.proId}
      }).then((resp) => {
        console.log(resp.data);
        this.productData=resp.data.product;
        this.tuangou=resp.data.group;
        console.log(this.productData);
      });

    }
  };
</script>
<style scoped>
    .goodsAdd {
        padding: 5px;
    }

    .Row > div ,.Row>form>div{
        padding: 10px 0;
    }

    .inputSize {
        width: 40%;
    }

    .floatL {
        float: left;
    }

    .paddL {
        width: 300px;
        padding-right: 10px;
        padding-bottom: 10px;
    }

    .clearB {
        clear: both;
    }

    .TitleB {
        width: 75px;
        padding-right: 10px;
        float: left;
        color: #606266;
    }

    .Decri {
        font-size: 14px;
    }
</style>