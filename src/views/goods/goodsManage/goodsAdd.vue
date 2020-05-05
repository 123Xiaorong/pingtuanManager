<template>
    <div class='goodsAdd' style="color: #626066;font-size: 14px">
        <div>
            <div class="Row">
                <div>
                    <span class="TitleB" style="font-size: 14px">商品名称：</span>
                    <el-input
                            placeholder="请输入内容"
                            v-model="productData.pro_name"
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
                            v-model="productData.card_id"
                            clearable
                            class="inputSize"
                            size="small"
                    >
                    </el-input>
                </div>
                <div>
                    <span class="TitleB" style="font-size: 14px">商品分类：</span>
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
                <div>
                    <div class="TitleB" style="font-size: 14px">商品标签：</div>
                    <div class="floatL">
                        <el-checkbox-group v-model="productData.productTag" @change="tagchange">
                            <el-checkbox v-for="item in tags"
                                         :key="item.tagId"
                                         :label="item.tagId">{{item.tagName}}
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>
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
                            v-model="productData.max_num"
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
                                  v-model="tuangou.pernum"
                                  clearable
                                  size="small"
                        >
                        </el-input>
                    </div>
                    <div class="floatL paddL">
                        <span style="font-size: 14px">价格:</span>
                        <el-input style="width: 150px;" type="number"
                                  placeholder="请输入内容"
                                  v-model="tuangou.price"
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
                            v-model="productData.market_price"
                            clearable
                            size="small"
                    >
                    </el-input>
                </div>
                <form action="http://172.16.14.94:8080/groupmall/power/product/addImg" method="post" target="stop"
                      enctype="multipart/form-data" id="shangpinPic1">
                    <div class="clearB">
                        <div class="TitleB" style="font-size: 14px">商品图片：</div>
                        <div class="floatL">
                            <input type="file" name="proImg" multiple="multiple">
                        </div>
                    </div>
                    <div class="clearB">
                        <div class="TitleB">拼团图片：</div>
                        <div class="floatL">
                            <input type="file" name="groupImg" multiple="multiple">
                        </div>
                    </div>
                    <div class="clearB">
                        <div class="TitleB">商品相册：</div>
                        <div class="floatL">
                            <input type="file" name="gallery" multiple="multiple">
                            <el-input style="width: 150px;display: none"
                                      placeholder="请输入内容"
                                      v-model="proId"
                                      size="small" name="proId"
                            >
                            </el-input>
                        </div>
                    </div>
                </form>
                <iframe  name="stop" style="display:none;"></iframe>
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
                            v-model="productData.pro_store"
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
                            v-model="productData.min_store"
                            clearable
                            size="small"
                    >
                    </el-input>
                </div>
                <div>
                    <div class="TitleB">加入推荐：</div>
                    <el-checkbox-group v-model="productData.tuijian" @change="tuijianchange">
                        <el-checkbox label="精品"></el-checkbox>
                        <el-checkbox label="新品"></el-checkbox>
                        <el-checkbox label="热销"></el-checkbox>
                    </el-checkbox-group>
                </div>
                <div>
                    <div class="TitleB">免运费：</div>
                    <el-radio-group v-model="productData.none_postage" @change="danxuanchange">
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
    components: {},
    props: {},
    data() {
      return {
        productData: {
          pro_id:'',
          pro_name: "",
          card_id: "",
          intro: "",
          brokerage: "",
          max_num: "",
          Price: "",
          market_price: "",
          weight: "",
          pro_store: "",
          min_store: "",
          none_postage: "",
          note: "",
          productTag: [],
          tuijian: [],
          description:'',
        },
        tuangou: {
          pernum: "",
          price: ""
        },
        goodsSort: [],
        tags: [],
        proId:'',
      };
    },
    methods: {
      Back(){
        this.$router.go(-1)
      },
      SelectionChange(e) {
        this.productData.category_id = e;
        console.log(this.productData.category_id);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview1(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      tagchange(item) {
        this.productData.productTag = item;
        console.log(this.productData.productTag);
      },
      submitP() {
        this.$axios({
          method: 'post',
          url:  this.$host+'/groupmall/power/product/addProduct',
          headers: { "Content-Type": "application/x-www-form-urlendcoded" },
          access_token: this.token,
          params:{
            proId:this.proId,proName:this.productData.pro_name,
            cardId:this.productData.card_id,categoryId:this.productData.category_id,
            intro:this.productData.intro,brokerage:this.productData.brokerage,
            maxNum:this.productData.max_num,price:this.productData.price,
            marketPrice:this.productData.market_price,weight:this.productData.weight,
            proStore:this.productData.pro_store,minStore:this.productData.min_store,
            nonePostage:this.productData.none_postage,note:this.productData.note,
            description:this.productData.description,proTags:this.productData.productTag,
            proRates:this.productData.tuijian,groupNum:this.tuangou.pernum,groupPrice:this.tuangou.price
          }
        }).then((resp) => {
          console.log(resp);
          // console.log(this.productData.pro_id);
        });
        var shangchuan1 = document.getElementById("shangpinPic1");
        setTimeout(()=>{
            shangchuan1.submit()
        },3000);
          this.$message({
            message:'添加成功',
            type:'success'
          });
        setTimeout(()=>{
          this.$router.push({path:'/goodsmanage'})
        },5000);

      }
    },
    // addPic(options){
    //     var that = this;
    //     // 获取文件对象
    //     let file = options.file;
    //     console.log(file);
    //     //判断图片类型
    //     //
    //     if (
    //       file.type == "image/jpeg" ||
    //       file.type == "image/png" ||
    //       file.type == "image/jpg"
    //     ) {
    //       var isJPG = true;
    //     } else {
    //       isJPG = false;
    //     }
    //     // 判断图片大小
    //     const isLt2M = file.size / 1024 / 1024 < 2;
    //     if (!isJPG) {
    //       that.$message.error("上传产品图片只能是 JPG/PNG/JPEG 格式!");
    //     }
    //     if (!isLt2M) {
    //       that.$message.error("上传产品图片大小不能超过 2MB!");
    //     }
    //     // 创建一个HTML5的FileReader对象
    //     var reader = new FileReader();
    //     if (file) {
    //       // reader.readAsDataURL(file);
    //       that.productData.pro_img.push(file);
    //     }
    //     //文件读取加载时
    //     // reader.onload = e => {
    //     //   let base64Str = reader.result;
    //     //   that.productData.pro_img.push(base64Str);
    //     //   console.log(that.productData.pro_img);
    //     // };
    // },}
    created() {
      this.$axios({
        method: "post",
        url:  this.$host+"/groupmall/power/product/getCate",
        headers: { "Content-Type": "application/x-www-form-urlendcoded" },
        access_token: this.token
      }).then((resp) => {
        // console.log(resp.data.cateList);
        this.goodsSort = resp.data.cateList;
        // console.log(this.goodsSort);
      });
      this.$axios({
        method: "post",
        url:  this.$host+"/groupmall/power/tags/selectByPage",
        headers: { "Content-Type": "application/x-www-form-urlendcoded" },
        access_token: this.token,
        params: { page: 1, limit: 10 }
      }).then((resp) => {
        this.tags = resp.data.data;
        // console.log(this.tags);
      });
      this.$axios({
        method: 'post',
        url:  this.$host+'/groupmall/power/product/getProId',
        headers: { "Content-Type": "application/x-www-form-urlendcoded" },
        access_token: this.token,
      }).then((resp) => {
        console.log(resp);
        this.productData.pro_id= resp.data.proId;
        this.proId= resp.data.proId;
        console.log(this.productData.pro_id);
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