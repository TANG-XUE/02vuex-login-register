<template>
    <div class="OldUser">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>大龄用户</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="_id" label="用户id"></el-table-column>
          <el-table-column prop="username" label="用户名"></el-table-column>
          <el-table-column prop="password" label="密码"></el-table-column>
          <el-table-column prop="age" label="年龄"></el-table-column>
        </el-table>
      </el-card>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "OldUser",
        data() {
            return {
              tableData:[]
            }
        },
        components: {},
        created() {
          this.tableData = this.oldUser
        },
        computed:{
          ...mapGetters(['oldUser'])
        }
    }

</script>

<style scoped>

</style>
