<template>
  <div>
    <el-button type="primary" @click="handleGetUser">获取自己的信息</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { apiWhoami } from '@/api/home';
export default defineComponent({
  setup() {
    // 获取当前用户信息
    const handleGetUser = () => {
      apiWhoami().then(res => {
        console.log(res);
      }).catch(err => {
        console.error(err);
      });
    };

    return {
      handleGetUser
    }
  }
})
</script>

<style>

</style>