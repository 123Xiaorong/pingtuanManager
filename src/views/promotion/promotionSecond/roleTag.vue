<template>
  <div class="roleTag">
    <el-tag
      :key="tag"
      v-for="tag in dynamicTags"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >
      {{ tag }}
    </el-tag>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: ""
    };
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      console.log(tag);
      let roles=JSON.parse(sessionStorage.getItem("promotion"))
      for(let i=0;i<roles.length;i++){
        if(roles[i].title===tag){
          roles.splice(i,1);
          console.log(roles);
          sessionStorage.setItem("promotion",JSON.stringify(roles));
        }
      }
    }
  },
  created(){
    // console.log(JSON.parse(sessionStorage.getItem("promotion")));
    for(let i=0;i<JSON.parse(sessionStorage.getItem("promotion")).length;i++){
      this.$data.dynamicTags.push(JSON.parse(sessionStorage.getItem("promotion"))[i].title);
    }
  },
};
</script>
<style scoped>
/* .el-tag + .el-tag {
  margin-left: 10px;
} */
.roleTag>span{
    width: 90px;
    margin: 5px 20px;
}
</style>
