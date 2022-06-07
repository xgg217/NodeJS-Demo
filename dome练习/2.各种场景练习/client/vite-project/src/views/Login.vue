<template>
  <div>
    <el-button  type="primary" @click="handleLogin">登录</el-button>
    <el-button type="danger" @click="handleLoginOut">登出</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { apiLogin, apiLoginOut } from '@/api/login'
import { ElMessage } from 'element-plus'
export default defineComponent({
  setup() {

    // 登录
    const handleLogin = () => {
      apiLogin('xgg', '123456').then(res => {
        console.log(res);
        ElMessage.success({
          message: '登录成功',
          type: 'success'
        });

      }).catch(err => {
        console.error(err);
      })
    };

    // 登出
    const handleLoginOut = () => {
      apiLoginOut().then(res => {

      }).catch(err => {
        console.error(err);
      })
    };

    return {
      handleLogin,
      handleLoginOut
    }


  }
})
</script>

<style>

</style>