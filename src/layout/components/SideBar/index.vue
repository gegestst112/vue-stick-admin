<script setup>
import { computed } from "vue";
import store from "@/store";
import Item from "./Item";

const title = computed(() => store.state.setting.title);
const menus = computed(() => store.state.menu.side);
const pathname = computed(() => store.state.menu.pathname);
const collapse = computed(() => store.state.setting.collapse);

</script>

<template>
  <div class="side_bar" :class="{side_collapse:collapse}">
    <div class="side_top">
      <img src="@/assets/logo.png" alt="logo" />
      <transition name="fade">
        <span v-if="!collapse">{{ title }}</span>
      </transition>
    </div>
    <el-scrollbar class="side_main">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#2c3e50"
        class="side_nav"
        :default-active="pathname"
        text-color="#f0f8fe"
        :router="true"
        :collapse="collapse"
      >
        <item :menus="menus"></item>
      </el-menu>
    </el-scrollbar>
    <div class="side_bottom" :title="title">
      @ 
      <transition name="fade">
        <span v-if="!collapse">{{ title }}</span>
      </transition>
    </div>
  </div>
</template>

<style>
</style>