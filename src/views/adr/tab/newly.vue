<template>
    <div style="color: #606266">
        <el-form style="width: 50%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="文章名称" prop="name">
                <el-input v-model="ruleForm.name" size="small"></el-input>
            </el-form-item>
            <!--<el-form-item label="活动时间" required>-->
                <!--<el-col :span="11">-->
                    <!--<el-form-item prop="date2">-->
                        <!--<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date2" style="width: 100%;"></el-date-picker>-->
                    <!--</el-form-item>-->
                <!--</el-col>-->
                <!--<el-col class="line" :span="2">-</el-col>-->
            <!--</el-form-item>-->

            <el-form-item label="文章分类" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择文章分类" size="small">
                    <el-option label="帮助中心" value="0"></el-option>
                    <el-option label="文章资讯" value="1"></el-option>
                    <el-option label="文章推送" value="2"></el-option>
                </el-select>
            </el-form-item>


            <!--<el-form-item label="是否显示" required>-->
                <!--<template>-->
                    <!--<el-radio v-model="radio" label="1">是</el-radio>-->
                    <!--<el-radio v-model="radio" label="0">否</el-radio>-->
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
            <!--<el-form-item label="图片上传">-->
                <!--<el-upload-->
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
                <!--<router-link to="/adr/article">-->
                <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
                <!--</router-link>-->
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
        methods: {
            // submitForm(formName) {
            //     this.$refs[formName].validate((valid) => {
            //       console.log(valid)
            //         if (valid) {
            //           console.log("111")
            //             alert('submit!');
            //           this.$router.push({ path:'/adr/article'})
            //         } else {
            //             console.log('error submit!!');
            //             return false;
            //         }
            //     });
            //
            //
            // },
            resetForm(formName) {
                this.$refs[formName].resetFields();

            },
            handleRemove(file) {
                console.log(file);
                console.log(file.current)
              file.url=""
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
            submitForm(formName){
              {
                console.log(this.ruleForm.name)
                console.log(this.ruleForm.region)
                console.log(this.radio)
                console.log(this.ruleForm.delivery)
                console.log(this.ruleForm.type)
                console.log(this.ruleForm.resource)
                console.log(Src)
                console.log(this. ruleForm.desc)
              }


              this.$axios.post(this.$host+'/groupmall/art/add',
                JSON.stringify({articleTitle:this.$data.ruleForm.name,
                                kind:this.$data.ruleForm.region,
                                shows:this.$data.radio="0"?false:" ",
                                keyword:this.$data.ruleForm.delivery,
                                siteDesc:this.$data.ruleForm.type,
                                toUrl:this.$data.ruleForm.resource,
                                // bigPicture:Src.split('/')[3],
                                content:this.$data.ruleForm.desc,
                                // time:this.$data.ruleForm.date2,
                })
              ).then(response=>{
                const resp = response.data;
                if(resp.status==1){
                  this.$alert('添加成功', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                      this.$router.push({path:'/adr/article'})
                      // this.$message({
                      //   type: 'info',
                      //   message: `action: ${ action }`
                      // });
                    }
                  });
                  // alert('添加成功')
                  // this.$message({
                  //   message: '添加成功',
                  //   type: 'success'
                  // })

                }
              })

            }
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