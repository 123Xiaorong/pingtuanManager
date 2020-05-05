<template>
  <el-form ref="shangdianForm" :rules="rules" :model="shangdianForm" label-width="120px" style="width:50%">
    <el-form-item label="商店名称" prop="storeName" >
      <el-input v-model="shangdianForm.storeName" placeholder="请输入商店名称" size="small"></el-input>
    </el-form-item>
    <el-form-item label="商店标题" prop="storeTitle">
      <el-input v-model="shangdianForm.storeTitle" placeholder="请输入商店标题" size="small"></el-input>
    </el-form-item>
    <el-form-item label="商店描述" prop="storeScricpt">
      <el-input v-model="shangdianForm.storeScricpt" placeholder="请输入商店描述" size="small"></el-input>
    </el-form-item>
    <el-form-item label="商店关键字" prop="storeKeyword">
      <el-input v-model="shangdianForm.storeKeyword" placeholder="请输入商店关键字" size="small"></el-input>
    </el-form-item>
    <el-form-item label="详细地址" prop="xiangxiAdd">
      <el-input v-model="shangdianForm.xiangxiAdd" placeholder="请输入详细地址" size="small"></el-input>
    </el-form-item>
    <!-- <el-form-item label="客服类型" prop="storeServicetype">
      <el-radio-group v-model="shangdianForm.storeServicetype">
        <el-radio v-model="radio" label="QQ客服"></el-radio>
        <el-radio v-model="radio" label="第三方客服"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="客服链接" prop="kefuLink">
      <el-input v-model="shangdianForm.kefuLink" placeholder="QQ客服请填写QQ号码" size="small"></el-input>
    </el-form-item>
    <el-form-item label="客服电话" prop="kefuPhone">
      <el-input v-model="shangdianForm.kefuPhone" placeholder="请输入客服电话" size="small"></el-input>
    </el-form-item> -->
    <!-- <el-form-item label="暂时关闭商店" prop="radioClose">
      <el-radio-group v-model="shangdianForm.radioClose">
        <el-radio v-model="radioClose" label="否"></el-radio>
        <el-radio v-model="radioClose" label="是"></el-radio>
      </el-radio-group>
    </el-form-item> -->
    <el-form-item label="关闭商店原因">
      <el-input type="textarea" v-model="shangdianForm.storeClosedreason" size="small"></el-input>
    </el-form-item>
    <el-form-item label="成团时间">
      <el-col :span="8">
        <el-date-picker
                size="small"
          type="date"
          placeholder="选择日期"
          v-model="shangdianForm.storeBeteamtime"
          
        ></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="申请退款时间">
      <el-col :span="8">
        <el-date-picker
                size="small"
          type="date"
          placeholder="选择日期"
          v-model="shangdianForm.storeBackpaytime"
          
        ></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('shangdianForm')">确定</el-button>
      <el-button @click="resetForm('shangdianForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import setupApi from '../../../api/shangdiansetup'

const kefuTypeOptions = [
  {type: "1",name:'QQ客服'},
  {type: "2",name:'第三方客服'}
]
export default {
  
  data() {
    return {
        radio: "QQ客服",
        radioClose: "否",
      shangdianForm: {},
      rules: {
        storeName: [{ required: true, message: "请输入商店名称", trigger: "blur" }],
        storeTitle: [{ required: true, message: "请输入商店标题", trigger: "blur" }]
      }
    };
  },

  methods: {
    onSubmit(formName) {
      // console.log("submit!");
      this.$refs[formName].validate(valid=>{
        if(valid){
          setupApi.add(this.shangdianForm).then(response=>{
            const resp = response.data;
            console.log(response.data)
            if(resp){
              this.$alert('添加成功', '提示', {
                confirmButtonText: '确定',
                callback: action => {

                }
              });
            }
          })
        }else {
          return false
        }
      })
    },
    resetForm(formName){
        this.$refs[formName].resetFields()
    }
  },
  filters: {
    //fliters中的this指向的不是vue实例,所以不能将数据定义在data,无法直接获取data数据
    payTypeFilter(type) {
      //全局payTypeOptions,返回一个满足条件的对象 find():查找一条满足条件的数据
      const payObj = payTypeOptions.find(obj => obj.type === type);
      //非空返回类型名称
      return payObj ? payObj.name : null;
    }
  }
};
</script>
