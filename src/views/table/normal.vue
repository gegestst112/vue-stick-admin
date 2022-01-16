<script setup>
import PackageTable from "@/components/PackageTable";
import { reactive, ref } from "@vue/reactivity";

const theader = [
  { prop: "st", label: "学号", width: 80 },
  { prop: "name", label: "姓名", width: 150 },
  { prop: "age", label: "年龄", width: 150 },
  { prop: "sex", label: "性别", width: 100 },
  { prop: "score", label: "成绩", width: 100 },
  { prop: "group", label: "班级", width: 200},
  { prop: "remark", label: "备注" },
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
  serial:{
    label:'序号',
    value:false
  },
  pages:{
    label:'分页',
    value:false
  },
  stripe:{
    label:'条纹',
    value:true
  },
  border:{
    label:'边框',
    value:false
  },
  multiple:{
    label:'多选',
    value:false
  },
  summary:{
    label:'合计',
    value:false
  }
})

const currentPage = ref(1);

const handleSizeChange = (size) => {
  
}

const handleCurrentChange = (page) => {
  currentPage.value = page;
}
</script>

<template>
  <div class="main_container table_container table_normal">
    <div class="select_show">
      选择配置：
      <el-checkbox
        v-for="show in showList" :key="show.label"
        v-model="show.value" :label="show.label"></el-checkbox>
    </div>
    <package-table
      :theader="theader"
      :tableData="tableData"
      :multiple="showList.multiple.value"
      :serial="showList.serial.value"
      :stripe="showList.stripe.value"
      :border="showList.border.value"
      :showPage="showList.pages.value"
      :summary="showList.summary.value"
      :currentPage="currentPage"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange">
    </package-table>
  </div>
</template>

<style scoped>
.select_show{
  padding:0 20px 20px;
}
</style>