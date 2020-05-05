<template>
    <el-form style="width: 50%;color: #606266;margin-top: 10px" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="广告名称" prop="name">
            <el-input v-model="ruleForm.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="广告位置" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择广告位置" size="small">
                <el-option label="首页轮播广告位[640*300]" value="shouye"></el-option>
                <el-option label="热榜顶部广告位[640*300]" value="rebang"></el-option>
                <el-option label="积分商城顶部广告位[640*300]" value="jifen"></el-option>
            </el-select>
        </el-form-item>


        <el-form-item label="开始时间" required>
            <el-col :span="11">
                <el-form-item prop="date1">
                    <el-date-picker size="small" type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-col>
            <!--<el-col class="line" :span="2">-</el-col>-->
        </el-form-item>

        <el-form-item label="结束时间" required>
            <el-col :span="11">
                <el-form-item prop="date2">
                    <el-date-picker size="small" type="date" placeholder="选择日期" v-model="ruleForm.date2" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-col>
            <!--<el-col class="line" :span="2">-</el-col>-->
        </el-form-item>


        <el-form-item label="广告链接" prop="delivery">
            <el-input v-model="ruleForm.delivery" size="small"></el-input>
        </el-form-item>



        <el-form-item label="广告图片" prop="resource">
            <el-upload
                    action="#"
                    list-type="picture-card"
                    :auto-upload="false">
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{file}">
                    <img
                            class="el-upload-list__item-thumbnail"
                            :src="file.url" alt=""
                    >
                    <span class="el-upload-list__item-actions">
        <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
        >
          <i class="el-icon-download"></i>
        </span>
        <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
                </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </el-form-item>


        <el-form-item label="是否开启" prop="desc">
            <template>
                <el-radio v-model="radio" label="1">开启</el-radio>
                <el-radio v-model="radio" label="0">关闭s</el-radio>
            </template>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "Newadvertising",
        data() {
            return {
                ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: '',
                    // resource: '',
                    // desc: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    date1: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    date2: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    type: [
                        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                    ],
                    resource: [
                        { required: true, message: '请选择活动资源', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写活动形式', trigger: 'blur' }
                    ],
                    delivery: [
                        { required: true, message: '请填写广告链接'}
                    ]
                },
                dialogImageUrl: '',
                dialogVisible: false,
                disabled: false,
                radio: '1'
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
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
                console.log(file);
            }

        }
    }
</script>

<style scoped>

</style>