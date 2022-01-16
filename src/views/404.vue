<template>
    <h1>404 错误：页面没找到</h1>
    <div class="link">
      <a href="javascript:(void);" @click="goBack">返回上一页</a>
      <router-link to="/">回到首页</router-link>
    </div>
</template>

<script>
import { reactive,ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter();
    const goBack = () => {
        router.back();
    }
    return {
      goBack
    }
  }
}
</script>

<style scoped>
h1{text-align:center;margin-top:100px;}
.link{text-align:center;margin-top:30px;}
.link a{margin:0 10px;text-decoration:none;color:#166cdd;}
</style>
