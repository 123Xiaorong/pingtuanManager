<template>
    <div style="color: #626066;margin-top: 10px">
        <el-form style="width: 50%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="文章名称" prop="name">
                <el-input v-model="ruleForm.name" size="small"></el-input>
            </el-form-item>
            <el-form-item label="文章分类" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择文章分类" size="small">
                    <el-option label="帮助中心" value="0"></el-option>
                    <el-option label="文章资讯" value="1"></el-option>
                    <el-option label="文章推送" value="2"></el-option>
                </el-select>
            </el-form-item>
            <!--<el-form-item label="是否显示" required>-->
                <!--<template >-->
                    <!--<el-radio-group v-model="radio">-->
                        <!--<el-radio  label="1">是</el-radio>-->
                        <!--<el-radio  label="0">否</el-radio>-->
                    <!--</el-radio-group>-->

                <!--</template>-->
            <!--</el-form-item>-->
            <el-form-item label="关键字" prop="delivery">
                <el-input v-model="ruleForm.delivery" size="small"></el-input>
            </el-form-item>
            <el-form-item label="网页描述" prop="type">
                <el-input v-model="ruleForm.type" size="small"></el-input>
            </el-form-item>
            <el-form-item label="跳转链接" prop="resource">
                <el-input v-model="ruleForm.resource" size="small"></el-input>

            </el-form-item>
            <!--<el-form-item label="图片上传" >-->
                <!--<div style="width: 100px;height: 100px ;border:1px solid red;float: left"></div>-->
                <!--<el-upload style="float: left"-->
                        <!--action="#"-->
                        <!--list-type="picture-card"-->
                        <!--:auto-upload="false">-->
                    <!--<i slot="default" class="el-icon-plus"></i>-->
                    <!--<div slot="file" slot-scope="{file}">-->
                        <!--<img-->
                                <!--class="el-upload-list__item-thumbnail"-->
                                <!--:src="file.url" alt=""-->
                        <!--&gt;-->
                        <!--<span class="el-upload-list__item-actions">-->
        <!--<span-->
                <!--class="el-upload-list__item-preview"-->
                <!--@click="handlePictureCardPreview(file)"-->
        <!--&gt;-->
          <!--<i class="el-icon-zoom-in"></i>-->
        <!--</span>-->
        <!--<span-->
                <!--v-if="!disabled"-->
                <!--class="el-upload-list__item-delete"-->
                <!--@click="handleDownload(file)"-->
        <!--&gt;-->
          <!--<i class="el-icon-download"></i>-->
        <!--</span>-->
        <!--<span-->
                <!--v-if="!disabled"-->
                <!--class="el-upload-list__item-delete"-->
                <!--@click="handleRemove(file)"-->
        <!--&gt;-->
          <!--<i class="el-icon-delete"></i>-->
        <!--</span>-->
      <!--</span>-->
                    <!--</div>-->
                <!--</el-upload>-->
                <!--<el-dialog :visible.sync="dialogVisible">-->
                    <!--<img width="100%" :src="dialogImageUrl" alt="">-->
                <!--</el-dialog>-->



            <!--</el-form-item>-->
            <el-form-item label="文章内容" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc" ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">修改</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>


<script>
    var Src;
    var Srcs;
    export default {
        data() {
            return {
                ruleForm: {
                    name: '',
                    region: '',
                    delivery: "",
                    type: "",
                    resource: '',
                    desc: '',
                },
                rules: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],

                    type: [
                        { required: true, message: '请输入网页描述', trigger: 'change' }
                    ],
                    resource: [
                        {  message: '请填写跳转链接', trigger: 'change',required: true }
                    ],
                    desc: [
                        {  message: '请填写文章内容', trigger: 'blur',required: true  }
                    ]
                },
                radio: '0',
                dialogImageUrl: '',
                dialogVisible: false,
                disabled: false
            };
        },
        created(){
          let hao=this.$store.state.biaohao;
          console.log('biaohao',this.$store.state.biaohao);
          // console.log(111)
          // console.log(this.$route.query.id);
          console.log(sessionStorage.getItem("changeId"))
          console.log(hao)
          console.log("测试获取优惠券列表接口");
          this.$axios.get(this.$host+"/groupmall/art/changeid",{params:{id:hao}})
            .then(response=>{
                console.log(response.data.data)
              console.log(response.data.data[0].shows)
              // console.log(this.$data.radio)
              if(response.data.data[0].shows===true){
                this.$data.radio='1';
                console.log(this.$data.radio)
              }
              if(response.data.data[0].shows===false){
                this.$data.radio='0';
              }
              console.log(this.$data.radio)

              this.ruleForm={
                name:response.data.data[0].articleTitle,
                region:response.data.data[0].article_kindsHPS[0].kindName,
                // radio:response.data.data[0].kind,
                delivery:response.data.data[0].keyword,
                type:response.data.data[0].siteDesc,
                resource:response.data.data[0].toUrl,
                dialogImageUrl:response.data.data[0].bigPicture,
                desc:response.data.data[0].content,
              }

            })


        },
        methods: {
            submitForm() {
              this.$confirm('此操作将修改该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
              }).then(()=>{
                let id=this.$store.state.biaohao;
                console.log(id)
                // console.log(this.ruleForm.name)
                // console.log(this.ruleForm.region==="帮助中心"?0:(this.ruleForm.region==="文章资讯"?1:2))
                console.log(this.ruleForm.region)
                // console.log(this.ruleForm.region==="帮助中心")
                console.log( typeof this.radio)
                // console.log(this.ruleForm.delivery)
                // console.log(this.ruleForm.type)
                // console.log(this.ruleForm.resource)
                // // console.log(this.ruleForm.resource)
                // console.log(this.ruleForm.desc)
                // this.$axios.post('http://172.16.14.95:8080/groupmall/art/change',
                //   JSON.stringify({id:id,
                //     articleTitle:this.ruleForm.name,
                //     kindName:this.ruleForm.region,
                //     kind:this.radio,
                //     keyword:this.ruleForm.delivery,
                //     siteDesc:this.ruleForm.type,
                //     toUrl:this.ruleForm.resource,
                //     content:this.ruleForm.desc
                //   })
                // ).then(response=>{
                //   console.log(response)
                // })



                this.$axios.post(this.$host+"/groupmall/art/change",

                  JSON.stringify({
                    id: id,
                    articleTitle: this.ruleForm.name,
                    kind: this.ruleForm.region,
                    shows: this.radio="0"?false:"",
                    keyword: this.ruleForm.delivery,
                    siteDesc: this.ruleForm.type,
                    toUrl: this.ruleForm.resource,
                    content: this.ruleForm.desc
                  })

                ).then(response=>{
                  console.log(response.data)
                  this.$router.push({path:'/adr/article'})
                })
              })





            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleRemove(file) {
                console.log(file);

            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleDownload(file) {
                // console.log(file.url);
                Src=file.url;
                console.log(Src)
            },

        }
    }
</script>

<style scoped>
    .t_wenZ{
        border: 1px solid red;
        width: 100%;
        height: 50px;
    }
</style>