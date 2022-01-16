<script >
import { ref, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import mixin from "./mixin";

export default {
  mixins: [mixin],
  setup() {
    //访问内部组件实例
    const _instance = getCurrentInstance();

    //设置表单DOM元素
    const vaForm = ref(null);

    const step = ref(1);

    //下一步
    const next = () => {
      vaForm.value.validate((valid) => {
        if (valid) {
          step.value++;
        }
      });
    };

    const router = useRouter();

    //跳转登录页
    const goLogin = () => {
      router.push("/login");
    };

    return {
      step,
      vaForm,
      next,
      goLogin,
    };
  },
};
</script>

<template>
  <div class="login_wrap">
    <div class="login_container ret_container">
      <h2 class="login_title">找回密码</h2>

      <el-steps :active="step" align-center>
        <el-step title="填写手机号"></el-step>
        <el-step title="设置新密码"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="vaForm"
        label-width="100px"
      >
        <el-form-item v-if="step == 1" label="手机号" prop="phone">
          <el-input
            v-model="ruleForm.phone"
            autocomplete="on"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="step == 2" label="密码" prop="password">
          <el-input
            show-password
            v-model="ruleForm.password"
            autocomplete="on"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="step == 2" label="确认密码" prop="checkPass">
          <el-input
            show-password
            v-model="ruleForm.checkPass"
            autocomplete="on"
            placeholder="请确认密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-if="step == 2" @click="step--"
            >上一步</el-button
          >
          <el-button type="primary" v-if="step < 3" @click="next"
            >下一步</el-button
          >
        </el-form-item>
      </el-form>
      <div class="third">
        <el-button type="primary" v-if="step == 3" @click="goLogin"
          >完成</el-button
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "./login.scss";
</style>