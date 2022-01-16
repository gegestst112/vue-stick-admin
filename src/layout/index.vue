<script setup>
import { SideBar,BreadCrumbs,TagList } from './components'
import store from '@/store'

if(sessionStorage.menu){
  store.dispatch('menu/setSide',  JSON.parse(sessionStorage.menu));
  store.dispatch('user/setName', sessionStorage.userName);
}

</script>

<template>
  <div class="layout_wrap">
    <side-bar></side-bar>
    <div class="layout_main">
      <bread-crumbs></bread-crumbs>
      <tag-list></tag-list>
      <div class="layout_container">
        <router-view v-slot="{ Component }">
          <transition mode="out-in" name="fade">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<style>

</style>
