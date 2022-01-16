import { createApp, ref } from 'vue'
import App from './App'
import router from './router/index'
import store from './store/index'
import axios from './axios/index'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
// import locale from 'element-plus/es/locale/lang/zh-cn' //element官方设置中文方法，element-plus（^1.0.2-beta.48）版本无效

//解决element-plus无法显示中文问题
import zhLocale from 'element-plus/lib/locale/lang/zh-cn'
ElementPlus.useLang = (app, ref, locale) => {
  const template = (str, option) => {
    if (!str || !option) return str
    return str.replace(/\{(\w+)\}/g, (_, key) => {
      return option[key]
    })
  }

  // 注入全局属性,子组件都能通过inject获取
  app.provide('ElLocaleInjection', {
    lang: ref(locale.name),
    locale: ref(locale),
    t: (...args) => {
      const [path, option] = args
      let value
      const array = path.split('.')
      let current = locale
      for (let i = 0, j = array.length; i < j; i++) {
        const property = array[i]
        value = current[property]
        if (i === j - 1) return template(value, option)
        if (!value) return ''
        current = value
      }
    },
  })
}

//使用模拟数据
import './mock/index'

// 引入公共样式
import './assets/style/common.scss'

//引入多语言插件
import { i18n, language }  from './assets/i18n'
import setting from './setting'

const app = createApp(App)
//设置 elementplus 中文
ElementPlus.useLang(app, ref, zhLocale)

app.config.globalProperties.axios = axios;
app.use(i18n,language[setting.language])
  //  .use(ElementPlus, {
  //     locale
  //   })
  .use(ElementPlus)
  .use(router)
  .use(store).mount('#app')
