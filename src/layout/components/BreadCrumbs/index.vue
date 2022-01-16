<script setup>
import { computed,onMounted,ref,watch } from "vue";
import store from "@/store";
import { useRoute, useRouter } from "vue-router";

const collapse = computed(() => store.state.setting.collapse);
const username = computed(() => store.state.user.userName);
const route = useRoute();
const router = useRouter();
const crumbs = ref([]);

const setCrumbs = () => {
  let matched = route.matched.filter(item => item.meta && item.meta.title)
  
  if(matched[0].meta.title == '首页'){
    matched.shift();
  }else{
    matched.unshift({ path: '/home', meta: { title: '首页' }});
  }
  
  crumbs.value = matched;
}

onMounted(() => {
  setCrumbs();
});

watch(route,()=>{
  setCrumbs();
})

const setCollapse = () => {
  store.dispatch('setting/setCollapse',!collapse.value)
}

const logout = () => {
  sessionStorage.removeItem('userName');
  sessionStorage.removeItem('menu');
  router.push('/login')
}

</script>

<template>
  <div class="bread_crumbs">
    <i class="menu_turn iconfont" :class="collapse?'icon-caidanshouqi':'icon-caidanzhankai'" @click="setCollapse"></i>

    <el-breadcrumb separator="/">
      <transition-group name="move">
        <el-breadcrumb-item v-for="(crumb,index) in crumbs" 
          :key="crumb.path"
          :to="index==crumbs.length-1?null:crumb.path"
          >
          {{crumb.meta.title}}
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>

    <div class="user_set">
      <el-dropdown trigger="click" size="small">
        <span>
          {{ username }}
          <i class="iconfont icon-xiajiantou"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">
              <i class="iconfont icon-tuichu"></i>
              退出
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style>
</style>