<template>
    <div>
        <el-table
                :data="tableData"
                style="width: 100%;margin-top: 5px">
            <el-table-column
                    prop="name"
                    label="广告名称"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="ulr"
                    label="广告图片"
                    width="130">
            </el-table-column>
            <el-table-column
                    prop="weizhi"
                    label="广告位置"
                    width="160">
            </el-table-column>
            <el-table-column
                    prop="date1"
                    label="开始时间"
                    width="140">
            </el-table-column>
            <el-table-column
                    prop="date2"
                    label="结束时间"
                    width="140">
            </el-table-column>
            <el-table-column
                    prop="ID"
                    label="排序"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="  "
                    label="启用"
                    width="80">
                <el-tooltip :content="'Switch value: ' + value" placement="top">
                    <el-switch
                            v-model="value"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-value="100"
                            inactive-value="0">
                    </el-switch>
                </el-tooltip>
            </el-table-column>
            <el-table-column  label="操作">
                <template slot-scope="scope">
                    <router-link to="/Gamend" active-class="active">
                    <el-button type="warning"
                            size="small"
                            @click="handleEdit(scope.$index, scope.row)"
                    title="修改" icon="el-icon-edit"
                    ></el-button></router-link>
                    <el-button style="margin-left: 10px"
                            size="small"
                            type="danger"
                               icon="el-icon-delete"
                               title="删除"
                            @click="handleDelete(scope.$index, scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block" style="text-align: center">
            <span class="demonstration"></span>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
            </el-pagination>
        </div>
    </div>

    </template>


<script>
    export default {
        name: "advertising",
        data(){
            return{
                tableData:[{
                    name:"龙阳",
                    ulr:"./assets/1.jpg",
                    weizhi:"就是这种",
                    date1:"2017-08-11",
                    date2:"2017-08-11",
                    ID:1,
                },{
                    name:"阳",
                    ulr:111,
                    weizhi:"就是这种",
                    date1:"2017-08-11",
                    date2:"2017-08-11",
                    ID:1,
                }],
                value: '100',

                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4

            };

        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            handleDelete(){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
        }
    }
</script>

<style scoped>

</style>