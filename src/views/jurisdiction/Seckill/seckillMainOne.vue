<template>
    <div>
        <div class="couponTable">
            <el-table :data="tableData"  ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange" style="width: 100%;text-align: center">
                <el-table-column width="60" type="selection"></el-table-column>
                <el-table-column label="ID" width="40" prop="couponId">
                    <template slot-scope="scope">
                        <span>{{ scope.row.seckillId}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="商品名称">
                    <template slot-scope="scope">
                        <span>{{scope.row.goodName}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="活动时间" width="370">
                    <template slot-scope="scope">
                        <span>{{scope.row.seckillTime}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="已秒" width="60">
                    <template slot-scope="scope">
                        <span>{{scope.row.seckillNum}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="状态" width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.seckillState}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-row>
                            <router-link to="/seckillEdit" active-class="active" style="margin-right: 10px">
                                <el-button  type="warning" size="small" icon="el-icon-edit" title="修改"></el-button>
                            </router-link>
                            <el-button  type="danger" size="small" icon="el-icon-delete" title="删除"></el-button>
                        </el-row>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--分页-->
        <div class="paging">
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage4"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="1000">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "seckillMainOne",
    data() {
      return {
        tableData: [
          {
            seckillId: '1',
            goodName: '2019122401',
            seckillTime: '2019-12-24 09:00:00 2019-12-24 09:00:00',
            seckillNum:'20',
            seckillState:'进行中'
          },
          {
            seckillId: '1',
            goodName: '2019122401',
            seckillTime: '2019-12-24 09:00:00 2019-12-24 09:00:00',
            seckillNum:'20',
            seckillState:'进行中',
          },
          {
            seckillId: '1',
            goodName: '2019122401',
            seckillTime: '2019-12-24 09:00:00 2019-12-24 09:00:00',
            seckillNum:'20',
            seckillState:'进行中',
          },
          {
            seckillId: '1',
            goodName: '2019122401',
            seckillTime: '2019-12-24 09:00:00 2019-12-24 09:00:00',
            seckillNum:'20',
            seckillState:'进行中',
          },
        ],
        multipleSelection: []
      }
    },
  };
</script>

<style scoped>
    .paging{
        /*border: 1px solid red;*/
        text-align: center;
    }
    .paging>div{
        margin: 8px 0px;
    }
</style>