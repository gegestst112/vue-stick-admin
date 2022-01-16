<script setup>
  import { ref } from 'vue';

  const offset = ref(0);  //偏移量
  const progress = ref(0);  //进度
  const text = ref('拖动滑块验证');
  const maxWidth = '300'; //最大宽度
  const barWidth = '60';  //滑块宽度
  const dragStatus = ref(false);  //滑动状态
  const verifyStatus = ref(false);  //验证状态
  let initOffset = 0; //初始偏移量
  const emit = defineEmits(['pass-verify']);  //定义通过事件

  //开始滑动
  const start = (event) => {
    if(verifyStatus.value)return;
    dragStatus.value = true;
    initOffset = event.clientX;
  }

  //结束滑动
  const end = () => {
    dragStatus.value = false;
    if(progress.value >= 100){
      verifyStatus.value = true;
      text.value = '验证成功';
      setTimeout(()=>{
        emit('pass-verify');
      },500);
    }else{
      offset.value = 0;
      progress.value = 0;
    }
  }

  //滑动滑块
  const drag = (event) => {
    if(dragStatus.value){
      if(event.clientX - initOffset <= 0){
        offset.value = 0;
      }else if(event.clientX - initOffset >= maxWidth - barWidth){
        offset.value = maxWidth - barWidth;
      }else{
        offset.value = event.clientX - initOffset;
      }
      progress.value = Math.ceil(offset.value/(maxWidth-barWidth)*100);
    } 
  }
</script>

<template>
  <div class="mask_layer" @mouseup="end" @mousemove="drag">
    <div class="slider_wrap" :style="{ width: maxWidth + 'px' }">
      <div class="slider_way" :style="{ 
        width: progress + '%',
        minWidth: barWidth + 'px',
        transition: dragStatus ? 'initial' : '.25s' }"></div>
      <div class="slider_bar"
        :style="{ 
          left: offset + 'px',
          width: barWidth + 'px',
          transition: dragStatus ? 'initial' : '.25s'
        }"
        @mousedown.prevent="start"
        >
        <transition name="fade" mode="out-in">
          <i v-if="verifyStatus" class="icon-wancheng iconfont" style="color:#39a330"></i>
          <i v-else class="icon-shuangjiantouyou iconfont"></i>
        </transition>
      </div>
      <div class="slider_text" :style="{ color: verifyStatus? '#fff': '#333' }">{{ text }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.slider_wrap{
  height:38px;line-height:38px;background:#aaa;text-align:center;
  border-radius:8px;position:relative;
  .slider_way{
    background:#39a330;height:100%;position:absolute;z-index:1;border-radius:8px;
  }
  .slider_text{
    position:relative;z-index:2;
  }
  .slider_bar{
    position:absolute;z-index:3;line-height:36px;background:#ccc;border:1px solid #aaa;
    border-radius:8px;cursor:pointer;height:38px;overflow:hidden;
  }
}
</style>