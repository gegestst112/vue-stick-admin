<script setup>
import PackageTable from "@/components/PackageTable";
import { reactive, ref } from "@vue/reactivity";

const theader = [
  { prop: "st", label: "学号", width: 80 },
  { prop: "name", label: "姓名", width: 300 },
  { prop: "age", label: "年龄", width: 350 },
  { prop: "sex", label: "性别", width: 300 },
  { prop: "score", label: "成绩", width: 300 },
  { prop: "group", label: "班级", width: 300},
  { prop: "remark", label: "备注", width: 600 },
];
const tableData = [
  {
    name: "张三",
    st:'A0001',
    group:'一班',
    age: 18,
    sex: "男",
    score: 99,
    remark: ''
  },
  {
    name: "李四",
    st:'A0002',
    group:'三班',
    age: 19,
    sex: "女",
    score: 100,
    remark: ''
  },
  {
    name: "王五",
    st:'A0003',
    group:'一班',
    age: 18,
    sex: "男",
    score: 89,
    remark: ''
  },
  {
    name: "赵六",
    st:'A0004',
    group:'二班',
    age: 10,
    sex: "男",
    score: 98,
    remark: ''
  },
  {
    name: "孙七",
    st:'A0005',
    group:'二班',
    age: 20,
    sex: "女",
    score: 79,
    remark: ''
  },
  {
    name: "周八",
    st:'A0006',
    group:'三班',
    age: 17,
    sex: "男",
    score: 69,
    remark: ''
  },
  {
    name: "吴九",
    st:'A0007',
    group:'三班',
    age: 19,
    sex: "女",
    score: 99,
    remark: ''
  },
  {
    name: "郑十",
    st:'A0008',
    group:'一班',
    age: 18,
    sex: "男",
    score: 88,
    remark: '复核'
  }
];

const showList = reactive({
  fixrow:{
    label:'固定表头',
    value:false
  },
  fixcol:{
    label:'固定首列',
    value:false
  }
});

const fixCol = ref([]);
const maxHeight = ref(3000);

const changeCheck = (item) => {
  if(item.label == '固定表头'){
    if(item.value){
      maxHeight.value = 300;
    }else{
      maxHeight.value = 3000;
    }
  }
  if(item.label == '固定首列'){
    if(item.value){
      fixCol.value.push('st');
    }else{
      fixCol.value.length = 0;
    }
  }
}
</script>

<template>
  <div class="main_container table_container table_normal">
    <div class="select_show">
      选择配置：
      <el-checkbox
        v-for="show in showList" :key="show.label"
        v-model="show.value" :label="show.label"
        @change="changeCheck(show)"
        ></el-checkbox>
    </div>
    <package-table
      :theader="theader"
      :tableData="tableData"
      :maxHeight="maxHeight"
      :fixCol="fixCol">
    </package-table>
  </div>
</template>

<style scoped>
.select_show{
  padding:0 20px 20px;
}
</style>