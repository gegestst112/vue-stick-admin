<script setup>
import PackageTable from "@/components/PackageTable";
import { ref } from "@vue/reactivity";

const theader = [
  { prop: "st", label: "学号", width: 80 },
  { prop: "name", label: "姓名", width: 150 },
  { prop: "age", label: "年龄", width: 150 },
  { prop: "sex", label: "性别", width: 100 },
  { prop: "score", label: "成绩", width: 100 },
  { prop: "group", label: "班级", width: 200},
  { prop: "remark", label: "备注" },
];
const tableData = ref([
  {
    name: "张三",
    st:'A0001',
    group:'一班',
    age: 18,
    sex: "男",
    score: 99,
    remark: '',
    disabled:true
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
]);

const modifyItem = (index,data) => {
  console.log(tableData.value[index],data)
  tableData.value[index].scoreEdit = !tableData.value[index].scoreEdit;
}
const deleteItem = (index,data) => {
  tableData.value.splice(index,1);
}

const tableOperate = [
  {
    fuc:modifyItem,
    callname: (index,data) => {
      let name = '';
      if(data[index].scoreEdit){
        name = '保存';
      }else{
        name = '修改';
      }
      return name;
    }
  },
  {
    name:'删除',
    fuc:deleteItem
  }
]

const cellStyle = (obj) => {
  let style = {};
  if(obj.columnIndex==3){
    if(obj.row.sex == '女'){
      style = {color:'pink'};
    }else{
      style = {color:'blue'};
    }
  }
  return style;
}

const sortCol = ['age','score'];
</script>

<template>
  <div class="main_container table_container table_normal">
    <package-table
      :theader="theader"
      :tableData="tableData"
      :sortCol="sortCol"
      :tableOperate="tableOperate"
      :cellStyle="cellStyle"
      :operateWidth="80">
    </package-table>
  </div>
</template>

<style scoped>
.select_show{
  padding:0 20px 20px;
}
</style>