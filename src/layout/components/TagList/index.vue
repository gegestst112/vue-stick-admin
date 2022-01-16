<script setup>
import { computed, onMounted, ref, watch } from "vue";
import store from "@/store";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const activeName = ref("");
const scrollContainer = ref(null);
const menu = computed(() => store.state.menu.side);
const tagList = computed(() => store.state.menu.notes);

const fixTag = (routes) => {
  routes.forEach((e) => {
    if (e.meta.fixed) {
      store.dispatch("menu/addNotes", e);
    }
    if (e.children) {
      fixTag(e.children);
    }
  });
};

const toPage = (tag) => {
  router.push({ name: tag.name });
};

const addTag = () => {
  activeName.value = route.name;
  if (activeName.value) {
    store.dispatch("menu/addNotes", route);
  }
};

const removeTag = (tag) => {
  if (tag.name == activeName.value) {
    let prevTag = null;
    for (const [i, e] of tagList.value.entries()) {
      if (e.name == tag.name) {
        prevTag = tagList.value[i - 1];
        break;
      }
    }
    prevTag && toPage(prevTag);
  }
  store.dispatch("menu/delNotes", tag);
};

//鼠标中键响应滚动条
const handleScroll = (e) => {
  const eventDelta = e.wheelDelta || -e.deltaY * 40;
  scrollContainer.value.setScrollLeft(
    scrollContainer.value.wrap.scrollLeft + eventDelta / 4
  );
  scrollContainer.value.update(); // 当前使用的 element-plus（^1.0.2-beta.48） 有时不自动更新滚动条状态
};

onMounted(() => {
  fixTag(menu.value);
  addTag();
});

watch(route, () => {
  addTag();
  scrollContainer.value.update(); // 当前使用的 element-plus（^1.0.2-beta.48） 有时不自动更新滚动条状态
});
</script>

<template>
  <div class="tag_list">
    <el-scrollbar
      ref="scrollContainer"
      style="height: auto"
      @wheel.prevent="handleScroll"
    >
    <transition-group name="move">
      <el-tag
        v-for="tag in tagList"
        :key="tag.path"
        size="small"
        @close="removeTag(tag)"
        @click="toPage(tag)"
        :effect="tag.name == activeName ? 'dark' : 'plain'"
        :closable="!tag.meta.fixed"
      >
        {{ tag.meta.title }}
      </el-tag>
      </transition-group>
    </el-scrollbar>
  </div>
</template>

<style>
</style>