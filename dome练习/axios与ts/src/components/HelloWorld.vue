<template>
  <h1>{{ msg }}</h1>
  <button @click="handleClick">点击</button>
</template>

<script setup lang="ts">
import { apiLogin } from './../api/user'
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)

const { handleClick } = (function() {
  const handleClick = () => {
    console.log('点击ii');
    apiLogin({
      loginId: 'xgg',
      loginIdPwd: '123456'
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.error(err);
      
    })
  };

  return {
    handleClick
  }
})();

</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
