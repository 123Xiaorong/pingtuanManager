<template>
  <div class="roleManage">
    <div class="productPromotion" style="position:relative;top:-10px">
      <div class="roleSave">
        <el-input
          placeholder="请输入角色名称"
          v-model="input"
          clearable
          size="small"
          style="width:100%"
        ></el-input>
        <!-- <el-button plain>保存角色</el-button> -->
      </div>
      <el-checkbox
        :indeterminate="isIndeterminateProduct"
        v-model="checkAllProduct"
        @change="handleCheckAllChangeProduct"
        style="position:absolute;bottom:-60px;left:16px"
        >所有权限</el-checkbox
      >
      <div style="margin: 5px 0;"></div>
      <el-checkbox-group
        v-model="checkedProducts"
        @change="handleCheckedCitiesChangeProduct"
        class="checkBoxs"
      >
        <el-checkbox
          v-for="product in products"
          :label="product"
          :key="product"
          >{{ product }}</el-checkbox
        >
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
let myPower=0;
let productOptions = [
  "商品管理",
  "促销管理",
  "订单管理",
  "广告管理",
  "会员管理",
  "权限管理",
  "设置管理"
];
export default {
  components: {},
  props: {},
  data() {
    return {
      input: "",
      checkAllProduct: false,
      checkedProducts: [],
      products: productOptions,
      isIndeterminateProduct: true,
    };
  },
  methods: {
    handleCheckAllChangeProduct(val) {
      this.checkedProducts = val ? productOptions : [];
      this.isIndeterminateProduct = false;
      // console.log(val);
      if(val===true){
        myPower=1111111;        
      }else{
        myPower=0;
      }
      // console.log(myPower);
      sessionStorage.setItem("myPower",myPower);
      sessionStorage.setItem("myRole",this.$data.input);
    },
    handleCheckedCitiesChangeProduct(value) {
      myPower=0;
      for(let i=0;i<JSON.parse(sessionStorage.getItem("promotion")).length;i++){
        for(let j=0;j<this.$data.checkedProducts.length;j++){
          // console.log(String(JSON.parse(sessionStorage.getItem("promotion"))[i].title));
          // console.log(this.$data.checkedProducts[j]);
          // console.log(this.$data.checkedProducts[j]===String(JSON.parse(sessionStorage.getItem("promotion"))[i].title));
          if(String(JSON.parse(sessionStorage.getItem("promotion"))[i].title)===this.$data.checkedProducts[j]){
            // console.log(Number(JSON.parse(sessionStorage.getItem("promotion"))[i].num));
            myPower+=Number(JSON.parse(sessionStorage.getItem("promotion"))[i].num)
          }
          // console.log(this.$data.checkedProducts)
        }
      }
      console.log(myPower);
      sessionStorage.setItem("myPower",myPower);
      sessionStorage.setItem("myRole",this.$data.input);
      // console.log(value[0]);
      let checkedCount = value.length;
      this.checkAllProduct = checkedCount === this.products.length;
      this.isIndeterminateProduct =
        checkedCount > 0 && checkedCount < this.products.length;
    }
  }
};
</script>
<style scoped>
.roleManage {
  padding: 0 20px;
}
.roleManage > div {
  margin: 10px 0;
}
.el-checkbox {
  width: 100px;
}
.roleSave {
  margin-bottom: 10px;
}
.roleSave > div {
  width: 30%;
  margin: 10px 10px 0 0;
}
.checkBoxs > label {
  margin:5px 0 5px 16px;
}
</style>
