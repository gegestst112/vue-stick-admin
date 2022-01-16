<script >
import { ref, getCurrentInstance } from "vue";
import { user } from "@/api";
import store from "@/store";
import mixin from "./mixin";
import md5 from "js-md5";

export default {
  mixins: [mixin],
  setup() {
    //访问内部组件实例
    const _instance = getCurrentInstance();

    //设置表单DOM元素
    const regForm = ref(null);

    //注册
    const handReg = () => {
      const regData = {
        ..._instance.data.ruleForm,
      };

      regForm.value.validate((valid) => {
        if (valid) {
          _instance.data.loading = true;
          regData.password = md5(regData.password);
          user
            .register(regData)
            .then((res) => {
              if (res.code == 200) {
                store.dispatch("user/setName", res.data.nickname);
                sessionStorage.userName = res.data.nickname;
                _instance.ctx.goPage();
              }
            })
            .finally(() => {
              _instance.data.loading = false;
            });
        }
      });
    };

    return {
      regForm,
      handReg,
    };
  },
};
</script>

<template>
  <div class="login_wrap">
    <div class="login_container reg_container">
      <h2 class="login_title">注册账号</h2>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="regForm" label-width="100px">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="ruleForm.userName" autocomplete="on" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="ruleForm.phone" autocomplete="on" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" autocomplete="on" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input show-password v-model="ruleForm.password" autocomplete="on" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            show-password
            v-model="ruleForm.checkPass"
            autocomplete="on"
            placeholder="请确认密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handReg" :loading="loading">注册</el-button>
          <div class="other">
            已有账号？
            <router-link to="/login">去登录</router-link>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss">
@import "./login.scss";
</style>