<script setup>
import Sortable from 'sortablejs'
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

  const props = defineProps({
    // 表头数据
    theader: {
      type: Array,
      default() {
        return []
      }
    },
    // 表格数据
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    //最大高度
    maxHeight: {
      type: Number,
      default() {
        return 600
      }
    },
    //固定列
    fixCol: {
      type: Array,
      default() {
        return []
      }
    },
    sortCol: {
      type: Array,
      default() {
        return []
      }
    },
    //序号
    serial: {
      type: Boolean,
      default() {
        return false
      }
    },
    //条纹
    stripe: {
      type: Boolean,
      default() {
        return true
      }
    },
    //允许拖拽
    tow: {
      type: Boolean,
      default() {
        return false
      }
    },
    //边框
    border: {
      type: Boolean,
      default() {
        return false
      }
    },
    //合计
    summary: {
      type: Boolean,
      default() {
        return false
      }
    },
    // 显示分页
    showPage: {
      type: Boolean,
      default() {
        return false
      }
    },
    //多选框
    multiple: {
      type: Boolean,
      default() {
        return false
      }
    },
    // 分页当前页
    currentPage: {
      type: Number,
      default() {
        return 1
      }
    },
    //每页数量
    pageSize:{
      type:Number,
      default(){
        return 10;
      }
    },
    //总数量
    pagtTotal:{
      type:Number,
      default(){
        return 28;
      }
    },
    // 显示操作按钮
    tableOperate: {
      type: Array,
      default() {
        return []
      }
    },
    //操作列宽
    operateWidth:{
      type: Number,
      default() {
        return 70
      }
    },
    //单元格颜色
    cellStyle:{
      type:Function,
      default(){
        return function(){return{}}
      }
    }
  });
  const emit = defineEmits(['handleSizeChange','handleCurrentChange']);

  //生成序号
  const setSerial = (index) => {
    return (props.currentPage - 1) * props.pageSize + (index + 1);
  }

  // 修改显示数量
  const handleSizeChange = (size) => {
    emit('handleSizeChange',size);
  }

  // 修改当前页
  const handleCurrentChange = (index) => {
    emit('handleCurrentChange',index);
  }

  //表格操作
  const operation = (index,data,fuc) => {
    fuc(index,data)
  }

  const drag = () => {
    const tbody = document.querySelector('.el-table__body-wrapper tbody')
    Sortable.create(tbody, {
      onEnd(evt) {
        emit('drag',evt);
      }
    })
  }

  onMounted(()=>{
    console.log(112,props.tow)
    if(props.tow){
      drag();
    }
  })

</script>

<template>
  <div class="pack_table_wrap">
    <el-table
      style="width: 100%"
      :max-height="maxHeight"
      :data="tableData"
      :stripe="stripe"
      :border="border"
      :cell-style="cellStyle"
      :show-summary="summary"
    >
      <el-table-column
        v-if="multiple"
        type="selection"
        width="60" />

      <el-table-column
        v-if="serial"
        type="index"
        label="序号"
        width="60" 
        :index="setSerial"/>

      <template v-for="(item,index) in theader">
        <el-table-column
          v-if="!item.children"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :fixed="fixCol.indexOf(item.prop)!=-1"
          :sortable="sortCol.indexOf(item.prop)!=-1"
        >
          <template #default="scope">
            <span v-if="scope.row[item.prop+'Edit']">
              <el-input size="mini" v-model="scope.row[item.prop]"></el-input>
            </span>
            <span v-else>
              {{ scope.row[item.prop] }}
            </span>
          </template>
        </el-table-column>
      </template>

      <el-table-column
        v-if="tableOperate.length>0"
        fixed="right"
        label="操作"
        :width="tableOperate.length*operateWidth"
        align="center"
      >
        <template #default="scope">
          <span class="button_span" 
            v-for="(item,index) in tableOperate"
            :key="index">
            <el-button plain size="mini" type="primary"
              @click.prevent="operation(scope.$index, tableData,item.fuc)"
              :disabled="tableData[scope.$index].disabled"
            >
              {{item.name||item.callname(scope.$index, tableData)}}
            </el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="showPage"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20]"
      :page-size="pageSize"
      layout="sizes, prev, pager, next,total"
      :total="pagtTotal"
      style="text-align:center;padding:20px 0;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<style lang="scss" scoped>
.button_span+.button_span{
  margin-left:10px;
}
</style>

