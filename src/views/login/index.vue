<script >
import { onMounted, ref, getCurrentInstance } from 'vue';
import { user } from '@/api';
import store from '@/store';
import { ElMessage } from 'element-plus';
import SliderVerify from '@/components/SliderVerify';
import mixin from './mixin';
import md5 from 'js-md5';
import { useRoute } from 'vue-router';

export default {
  mixins: [mixin],
  components: {
    SliderVerify
  },
  setup() {
    let redirect = null;
    const route = useRoute();
    //访问内部组件实例
    const _instance = getCurrentInstance();

    onMounted(() => {
      _instance.data.ruleForm.userName = 'admin';
      _instance.data.ruleForm.password = '111111';
      redirect = route.query.redirect || null;
    })

    //设置表单DOM元素
    const loginForm = ref(null);
    const verify = ref(false);

    //第三方登录
    const thirdList = [
      {
        name: 'wechat',
        title: '微信',
        url: '../../assets/images/common/wechat.png'
      },
      {
        name: 'qq',
        title: 'QQ',
        url: '../../assets/images/common/wechat.png'
      },
      {
        name: 'weibo',
        title: '微博',
        url: '../../assets/images/common/wechat.png'
      },
      {
        name: 'alipay',
        title: '支付宝',
        url: '../../assets/images/common/wechat.png'
      }
    ]

    //登录
    const handLogin = () => {
      const loginData = {
        ..._instance.data.ruleForm
      }
      loginForm.value.validate((valid) => {
        if (valid) {
          _instance.data.loading = true;
          loginData.password = md5(loginData.password);
          user.login(loginData).then(res => {
            if (res.code == 200) {
              user.getInfo().then(info => {
                verify.value = true;
                store.dispatch('user/setName', info.data.nickname);
                sessionStorage.userName = info.data.nickname;
              }).finally(() => {
                _instance.data.loading = false;
              });
            }
          }).catch(error => {
            _instance.data.loading = false;
          })
        }
      })
    }

    // 通过验证
    const passVerify = () => {
      verify.value = false;
      _instance.ctx.goPage(redirect);
    }

    const thirdLogin = (title) => {
      let first = _instance.appContext.config.globalProperties.$translate('common.thirdTips');
      let last = _instance.appContext.config.globalProperties.$translate('common.login')
      ElMessage.info(`${first} ${title} ${last}`)
    }

    //获取图片路径
    const getImageUrls = (name) => {
      return new URL(`/src/assets/images/common/${name}.png`, import.meta.url).href
    }

    return {
      thirdLogin,
      thirdList,
      loginForm,
      verify,
      handLogin,
      passVerify,
      getImageUrls
    }
  }
}

</script>

<template>
  <div class="login_wrap">
    <div class="login_container">
      <h2 class="login_title">{{$translate('common.userlogin')}}</h2>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" label-width="100px">
        <el-form-item :label="$translate('common.userName')" prop="userName">
          <el-input v-model="ruleForm.userName" autocomplete="on" placeholder="手机/邮箱/账号"></el-input>
        </el-form-item>
        <el-form-item :label="$translate('common.password')" prop="password">
          <el-input show-password v-model="ruleForm.password" autocomplete="on" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handLogin" :loading="loading">{{$translate('common.login')}}</el-button>
          <div class="other">
            <router-link to="/register">{{$translate('common.register')}}</router-link> |
            <router-link to="/retrieve">{{$translate('common.rePassword')}}</router-link>
          </div>
        </el-form-item>
      </el-form>
      <div class="third">
        <a
          href
          @click.prevent="thirdLogin(item.title)"
          :title="item.title + '登录'"
          v-for="item in thirdList"
          :key="item.name"
        >
          <!-- <img :src="`/src/assets/images/common/${item.name}.png`" :alt="item.title" /> -->
          <img :src="getImageUrls(item.name)" :alt="item.title" />
        </a>
      </div>
    </div>
  </div>
  <transition name="fade">
    <slider-verify v-if="verify" @passVerify="passVerify"></slider-verify>
  </transition>
</template>

<style lang="scss">
@import "./login.scss";
</style>